//pk_live_fgMxvyvoSrhEGCMCNixTpD7R
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js
// server.js
const express = require('express');
const stripe = require('stripe')('pk_live_fgMxvyvoSrhEGCMCNixTpD7R'); // Replace with your Stripe secret key

const app = express();
app.use(express.json());

// Endpoint to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
    const { name, price, image } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: name,
                        images: [image]
                    },
                    unit_amount: price
                },
                quantity: 1
            }],
            mode: 'payment',
            success_url: 'https://yourdomain.com/success', // Replace with your success URL
            cancel_url: 'https://yourdomain.com/cancel' // Replace with your cancel URL
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require('stripe')('sk_test_...');
const express = require('express');
const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_39ed95c0f9a7efecd567b9450b2adc01727944494590bbfe22be5a28833a0ed7";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));
