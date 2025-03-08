const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  if (!this.isNew) this.PasswordChangedAt = Date.now() - 1000;
  next();
});

adminSchema.methods.CorrectPassword = async function (
  CandiatePassword,
  UserPassword
) {
  return await bcrypt.compare(CandiatePassword, UserPassword);
};

adminSchema.methods.PasswordChangedAfter = function (JWTTimestamp) {
  if (this.PasswordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // Compare password change timestamp with JWT issue timestamp (iat)
    return JWTTimestamp < changedTimestamp; // Returns true if password was changed after token was issued
  }

  // False means the password was not changed after the JWT was issued
  return false;
};

adminSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const Admin = mongoose.model("Admin", adminSchema);

// await Admin.create({
//   email: "admin@example.com",
//   password: "password123",
// })

module.exports = Admin;
