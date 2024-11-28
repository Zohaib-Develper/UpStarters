const catchAsync = require("./../utils/catchAsync");

const stripe = require("stripe")(
  "sk_test_51PvBFe05I4IB0TZI0gEY5A22KTbrs7wZT4DpaODbxoaRj9peAtn4RC2dtqyLpFXpatQyTk0IY2awnJYpuyTibv3m00IpRlPwCE"
);
const { v4: uuidv4 } = require("uuid");

exports.HandlePayments = catchAsync(async (req, res, next) => {
  const { token, project } = req.body;
  const idempotencyKey = uuidv4();

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });
  try {
    const result = await stripe.charges.create(
      {
        amount: project.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: project.name,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
          },
        },
      },
      { idempotencyKey }
    );
  } catch (err) {
    console.log("Error in payment: ", err);
  }
  next();
});
