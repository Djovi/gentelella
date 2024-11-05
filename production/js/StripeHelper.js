//<script src="https://js.stripe.com/v3/"></script>
const stripe = Stripe('YOUR_PUBLISHABLE_KEY');
const elements = stripe.elements();
const cardElement = elements.create('card', {
  style: {
    base: {
      fontSize: '16px',
      color: '#323232',
    },
  },
});
//<div id="card-element"></div>
cardElement.mount('#card-element');
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { paymentMethod, error } = await stripe.createPaymentMethod(
    'card',
    cardElement
  );

  if (error) {
    // Display error to the user
  } else {
    // Send paymentMethod.id to your server for processing
  }
});
