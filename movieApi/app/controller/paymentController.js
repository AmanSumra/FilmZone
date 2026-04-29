const Razorpay = require("razorpay")
const crypto = require("crypto")

exports.instance = new Razorpay({
    key_id: "rzp_test_SdJk4EX7ugHfEA",
    key_secret: "mFcuJ6JwqAGXc3R6JAaBlfs4",
});

exports.checkout = async(req, res, ) => {
    const amount = Number(req.body.amount);
    console.log(amount)
    const options = {
        amount: amount,
        currency: "INR",
    };

    const order = await this.instance.orders.create(options);
    res.status(200).json({
        success: true,
        order,
    });

};