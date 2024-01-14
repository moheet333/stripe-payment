const { StatusCodes } = require("http-status-codes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;
  const calculateOrderAmount = () => {
    // check the total_amount and shipping_fee with the database and purchase items
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res
    .status(StatusCodes.OK)
    .json({ clientSecret: paymentIntent.client_secret });
};

module.exports = {
  stripeController,
};
