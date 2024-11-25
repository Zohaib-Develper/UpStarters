const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [8, "Password length must be graetor than 8"],
    select: false,
  },

  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address."],
  },
  PasswordChangedAt: Date,
});

userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  if (!this.isNew) this.PasswordChangedAt = Date.now() - 1000;
  next();
});

userScheme.methods.CorrectPassword = async function (
  CandiatePassword,
  UserPassword
) {
  return await bcrypt.compare(CandiatePassword, UserPassword);
};

userScheme.methods.PasswordChangedAfter = function (JWTTimestamp) {
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

userScheme.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model("User", userScheme);

module.exports = User;
