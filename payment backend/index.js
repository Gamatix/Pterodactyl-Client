require('dotenv').config();

const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// PayPal environment and client setup for live environment
let environment = new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
let client = new paypal.core.PayPalHttpClient(environment);

app.post('/order', async (req, res) => {
    try {
        const { amount } = req.body; // Assumes amount is passed in the request body
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD', // Currency set to USD
                    value: amount
                }
            }]
        });

        const order = await client.execute(request);
        if (!order) return res.status(500).send('Some error occurred');

        res.json(order.result);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.post('/order/validate', async (req, res) => {
    const { orderID } = req.body;

    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        const capture = await client.execute(request);
        if (capture.result.status === 'COMPLETED') {
            res.json({
                msg: "success",
                orderId: orderID,
                captureId: capture.result.purchase_units[0].payments.captures[0].id
            });
        } else {
            res.status(400).json({ msg: "Transaction is not legit!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
