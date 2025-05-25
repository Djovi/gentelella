const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure you set this in your Netlify environment variables

exports.handler = async (event, context) => {
    const { name, price, image } = JSON.parse(event.body);

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
            success_url: 'https://app.rechainglobal.com/success',
            cancel_url: 'https://app.rechainglobal.com/cancel'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ id: session.id })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
