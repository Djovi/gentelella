  const url = "https://instantapi.ai/api/retrieve/";
 const scriptURL = 'https://script.google.com/macros/s/AKfycbwfm-_YYzfVko4RZjmEQuXgxQrRv1TtadgRihnNrZX0dnTJimNZtaPZVQf2Adl3T4ZF/exec'
                     
/*const stripe = require('stripe')('your-stripe-secret-key');

// Function to create a product in Stripe
async function createProduct(name, description, image) {
    const product = await stripe.products.create({
        name: name,
        description: description,
        images: [image],
    });
    return product.id;
}

// Function to create a price for the product
async function createPrice(productId, amount) {
    const price = await stripe.prices.create({
        product: productId,
        unit_amount: amount,
        currency: 'usd',
    });
    return price.id;
}

// Function to create a payment link
async function createPaymentLink(priceId) {
    const paymentLink = await stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
    });
    return paymentLink.url;
}

// Example usage
(async () => {
    const productId = await createProduct('Product Name', 'Product Description', 'https://via.placeholder.com/150');
    const priceId = await createPrice(productId, 2000); // Amount in cents
    const paymentLink = await createPaymentLink(priceId);
    console.log('Payment Link:', paymentLink);
})();**/
     
     
   
 const mdata = {
 // "webpage_url": "https://tg.coinafrique.com/profil/c4c18891-6b02-4cf2-881c-6de09703ec3f?page=2",
  "webpage_url": "https://tg.coinafrique.com/",
   "api_method_name": "getProductsList",
   "api_response_structure": "{\"Items\":[{\"name\":\"<the full title of the item, including any hashtags and emojis>\",\"price\":\"<the defined price of the item>\",\"author\":\"<the publisher of the item>\",\"item_url\":\"<the absolute URL to the item details>\",\"item_image\":\"<the absolute URL to the item image>\"}]}",
  
  // "webpage_url": "https://www.amazon.com/Schneider-Electric-HOM120PDFC-Homeline-Single-Pole/dp/B07TW6LKJZ/ref=sr_1_5?crid=GO5AGC9SDDB7&dib=eyJ2IjoiMSJ9.uE4deo7r5VmfAYy0VaoW5gZ-srtMCvhZPBYVlq8YKWUPWVIIM4exQQ0LpVlh4XthMBWh4WCIOYbrI4pXeyS44NYRuAl9wuMj_KlZe6GTmrSeUUuSM8ITD4af3PLZz4jEI4-izPm_70FLSvoN57VxbWx_qW7UFr8RbF2ih0Zo49o1hs69ZI6sDGje2R56pczekwEah2t2qky1y3H6TceejUWrxHRTNBM2ljjtmUNsNvU.sCn4ekKGnzaVXB6k-c1nidwTJUXgOsbXWhnxD0LG8F8&dib_tag=se&keywords=Schneider+Electric&psr=EY17&qid=1730050709&s=todays-deals&sprefix=schneider+electric+%2Ctodays-deals%2C740&sr=1-5-catcorr",
  // "api_method_name": "getProductInformation",
  // "api_response_structure": "{\"product_name\":\"\",\"product_description\":\"\",\"product_use_cases\":\"\",\"copyright_company_name\":\"\",\"tax_registration_number\":\"\"}",
  "api_key": "free_joel@rechainglobal.com"
 };

// Display a loading message while waiting for the API response
document.getElementById("responseContainer").innerHTML = '<span class="loading">Loading<span class="cursor">|</span></span>';
//const data = {
 //      title: "Location boutique - Kodjoviakope",
 //     price: "120 000",
 //     author: "Samuel",
//       product_url: "https://tg.coinafrique.com/annonce/bureaux-et-commerces/location-boutique-kodjoviakope-4924416", 
//      item_image: "https://images.coinafrique.com/thumb_4924416_uploaded_image1_1725345786.jpg"
//};


// Function to fetch data and display it in the responseContainer div
const responseContainer = document.getElementById("responseContainer"); // Get the element once

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(mdata)
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    return response.json(); // Parse response as JSON
})
.then(dataFromFirstFetch => {
    // Now send the data to your Apps Script
     // responseContainer.textContent = JSON.stringify(dataFromFirstFetch, null, 2);
   
     // Call the render function with data
        renderProducts(dataFromFirstFetch);
 
}); 
 function renderProducts(products) {
            const container = document.getElementById('productContainer');
            products.Items.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                 const link = document.createElement('a');
        link.href = `details_uri.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image_url=${encodeURIComponent(product.item_image)}`;
        link.appendChild(productItem);
                const img = document.createElement('img');
                img.src = product.item_image;
                
        // Add error handling for image loading
        img.onerror = () => {
            img.src = product.item_image; // Fallback image URL
            console.error(`Failed to load image: ${product.item_image}`);
        };
                const name = document.createElement('div');
                name.className = 'name';
                name.textContent = product.name;
                
                const price = document.createElement('div');
                price.className = 'price';
                price.textContent = product.price;
                
                productItem.appendChild(img);
                productItem.appendChild(name);
                productItem.appendChild(price);
                 container.appendChild(link);
                
            });
        }

    
 /**fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(mdata)
})
.then(response => response.json())
.then(data => {

   fetch(scriptURL, { 
    method: 'POST',
    
     body:  JSON.stringify(data)
   } )
      .then(response => {
  if (response.ok) {
    return response.json(); // Parse JSON only on successful response
  } else {
    throw new Error(`Error: ${response.statusText}`); // Handle non-200 status codes
  }
}).then(data => {

    console.log(data);
    // Replace loading message with JSON data in a readable format
    document.getElementById("responseContainer").textContent = JSON.stringify(data, null, 2);
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById("responseContainer").textContent = `Error: ${error.message}`;
});
    console.log(data);
    // Replace loading message with JSON data in a readable format
    document.getElementById("responseContainer").textContent = JSON.stringify(data, null, 2);
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById("responseContainer").textContent = `Error: ${error.message}`;
}); **/
 
