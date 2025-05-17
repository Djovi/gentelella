  const url = "https://instantapi.ai/api/retrieve/";
 const scriptURL = 'https://script.google.com/macros/s/AKfycbwF1-gT8u9TWWBtjgs-xiWpbEOACfKyB8v3C16GZkhymD6JsBu5OZq3kcS2ES9asmhD/exec'
                     
/*const stripe1 = require('stripe')('pk_live_fgMxvyvoSrhEGCMCNixTpD7R');605875e6fbb004b383463ec4a49ee011;

// Function to create a product in Stripe
async function createProduct(name, description, image) {
    const product = await stripe1.products.create({
        name: name,
        description: description,
        images: [image],
    });
    return product.id;
}

// Function to create a price for the product
async function createPrice(productId, amount) {
    const price = await stripe1.prices.create({
        product: productId,
        unit_amount: amount,
        currency: 'usd',
    });
    return price.id;
}

// Function to create a payment link
async function createPaymentLink(priceId) {
    const paymentLink = await stripe1.paymentLinks.create({
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
  // Using Fetch API to get exchange rates from Open Exchange Rates
/*const apiKey2 = '605875e6fbb004b383463ec4a49ee011';
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey2}`;
function seeIndollars(){
fetch(url)
  .then(response => response.json())
  .then(data => {
    const rates = data.rates;
    const usdRate = rates['USD'];
    const eurToUsd = rates['EUR'] * usdRate;
    const nairaToUsd=rates['EUR'] * usdRate;
    console.log(`1 EUR = ${eurToUsd} USD`);
    return eu
  })
  .catch(error => console.error('Error fetching exchange rates:', error));   
}*/
   
 const mdata = {
 // "webpage_url": "https://tg.coinafrique.com/profil/c4c18891-6b02-4cf2-881c-6de09703ec3f?page=2",
  //"webpage_url": "https://tg.coinafrique.com/",
   "api_method_name": "getProductsList",
   "api_response_structure": "{\"Items\":[{\"name\":\"<the full title of the item, including any hashtags and emojis>\",\"price\":\"<the defined price of the item>\",\"author\":\"<the publisher of the item>\",\"item_url\":\"<the absolute URL to the item details>\",\"item_image\":\"<the absolute URL to the item image>\"}]}",
  
  "webpage_url": "https://www.amazon.com/Schneider-Electric-HOM120PDFC-Homeline-Single-Pole/dp/B07TW6LKJZ/ref=sr_1_5?crid=GO5AGC9SDDB7&dib=eyJ2IjoiMSJ9.uE4deo7r5VmfAYy0VaoW5gZ-srtMCvhZPBYVlq8YKWUPWVIIM4exQQ0LpVlh4XthMBWh4WCIOYbrI4pXeyS44NYRuAl9wuMj_KlZe6GTmrSeUUuSM8ITD4af3PLZz4jEI4-izPm_70FLSvoN57VxbWx_qW7UFr8RbF2ih0Zo49o1hs69ZI6sDGje2R56pczekwEah2t2qky1y3H6TceejUWrxHRTNBM2ljjtmUNsNvU.sCn4ekKGnzaVXB6k-c1nidwTJUXgOsbXWhnxD0LG8F8&dib_tag=se&keywords=Schneider+Electric&psr=EY17&qid=1730050709&s=todays-deals&sprefix=schneider+electric+%2Ctodays-deals%2C740&sr=1-5-catcorr",
  // "api_method_name": "getProductInformation",
  // "api_response_structure": "{\"product_name\":\"\",\"product_description\":\"\",\"product_use_cases\":\"\",\"copyright_company_name\":\"\",\"tax_registration_number\":\"\"}",
  "api_key":"apify_api_oS1ZBz12eaILvCxRPCmcDcth7EQC5b4t79dn"// "B8NqKWUbYPpI16QA"
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
 function getQueryParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                name: params.get('listings'),
            };
        }
const mproducts = getQueryParams();
mdata.webpage_url=mproducts.name;
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
              const zparams = new URLSearchParams(window.location.search);
               let parsedPrice;
        try {
            parsedPrice = parseFloat(product.price.replace('$', '').replace('₦', '').trim()) * 100;
            if (isNaN(parsedPrice)) {product.price=  250;
                throw new Error('Price is not a valid number');
            }
        } catch (error) {
            console.error(`Failed to parse price for product ${product.name}:`, error);
           product.price=  250; // Default to 0 or any other fallback value
        }
                     if (zparams.get('origin') == "usd") {
  link.href = `details_uri.html?origin=usd&name=${encodeURIComponent(product.name)}&price=${encodeURIComponent( parseFloat(product.price.replace('$', '')) * 100)}&image_url=${encodeURIComponent(product.item_image)}`;      
} else { 
                       
       link.href = `details_uri.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent( parseFloat(product.price.replace('₦', '')) * 100)}&image_url=${encodeURIComponent(product.item_image)}`;
                        
}
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
                price.id = `price_${product.name}`; 
             if (zparams.get('origin') == "usd") {
    price.textContent = '$ ' + ((parseFloat(product.price.replace('$', '')) * 100)) + (((parseFloat(product.price.replace('$', '')) * 100)) * 0.30).toFixed(2);
} else {
    price.textContent = 'CFA ' +( (((parseFloat(product.price.replace('₦', '')) * 100)) + (((parseFloat(product.price.replace('₦', '')) * 100)) * 0.40)) * 4.1).toFixed(2);
}
                productItem.appendChild(img);
                productItem.appendChild(name);
                productItem.appendChild(price);
                 container.appendChild(link);
                
            });
        }

// 1. Place your static JSON data in a variable
const staticProductData = {
    "service_motd": "**** This test provides a limited example data extraction only. You can sign up to completely customize what data it extracts: https://web.instantapi.ai/ ****",
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Square D by Schneider Electric HOM120PDFC Homeline Plug-On Neutral 20 Amp Single-Pole Dual Function (CAFCI and GFCI) Circuit Breaker, (Pack of 4)",
    "image": [
        "https://m.media-amazon.com/images/I/41u2CjtkyOL.jpg"
    ],
    "description": "Square D by Schneider Electric HOM120PDFC Homeline Plug-On Neutral 20 Amp Single-Pole Dual Function (CAFCI and GFCI) Circuit Breaker, (Pack of 4). This circuit breaker combines both CAFCI and GFCI protection in a single device, designed for use in Homeline load centers and CSED devices. Plug-On Neutral design for easier installation.",
    "sku": "HOM120PDFC",
    "mpn": "HOM120PDFC",
    "brand": {
        "@type": "Brand",
        "name": "Square D",
        "url": "https://www.amazon.com/Square-D/b/ref=bl_dp_s_web_121871334011?ie=UTF8&node=121871334011&field-lbr_brands_browse-bin=Square+D"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Schneider Electric"
    },
    "gtin12": "880765242187",
    "offers": {
        "@type": "Offer",
        "url": "https://www.amazon.com/Schneider-Electric-HOM120PDFC-Homeline-Single-Pole/dp/B07TW6LKJZ",
        "priceCurrency": "USD",
        "price": "220.00",
        "priceValidUntil": "2025-05-27",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
            "@type": "Organization",
            "name": "Automation Controller"
        },
        "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0.03",
                "currency": "USD"
            },
            "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "US",
                "postalCode": "10001"
            },
            "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 0,
                    "maxValue": 2,
                    "unitCode": "d"
                },
                "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 6,
                    "maxValue": 10,
                    "unitCode": "d"
                }
            }
        },
        "returnPolicy": {
            "@type": "MerchantReturnPolicy",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
        }
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.4",
        "reviewCount": 94,
        "bestRating": "5",
        "worstRating": "1"
    },
    "review": [
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "James G"
            },
            "datePublished": "2024-12-25",
            "reviewBody": "Perfect for my home line panel and application. Great quality square d breaker!"
        },
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Dennis"
            },
            "datePublished": "2024-10-29",
            "reviewBody": "Used on home panel. Easy Install. Used 20 of them so I saved about $150.00"
        },
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Amazon Customer"
            },
            "datePublished": "2024-08-15",
            "reviewBody": "homeline breakers work well"
        },
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "1",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "RScott Hart"
            },
            "datePublished": "2024-11-04",
            "reviewBody": "No where in the product details does it say the breakers would be used. Well 2 of the 4 breakers were used and removed more than once. Completely unacceptable for the high price that was charged.",
            "image": [
                "https://m.media-amazon.com/images/I/71bfQdJKQeL._SY88.jpg",
                "https://m.media-amazon.com/images/I/71c4D0Lc9bL._SY88.jpg"
            ]
        }
    ],
    "category": [
        "Tools & Home Improvement",
        "Electrical",
        "Breakers, Load Centers & Fuses",
        "Circuit Breakers",
        "Ground Fault Circuit Interrupters"
    ],
    "isAccessoryOrSparePartFor": [
        {
            "@type": "Product",
            "name": "Square D Homeline Load Centers"
        }
    ],
    "productID": "B07TW6LKJZ",
    "itemCondition": "https://schema.org/NewCondition",
    "releaseDate": "2019-07-01",
    "dateFirstAvailable": "2019-07-01",
    "model": "HOM120PDFC",
    "color": "As shown in image",
    "weight": {
        "@type": "QuantitativeValue",
        "value": 2.8,
        "unitCode": "LBR"
    },
    "size": "Pack of 4",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Current Rating",
            "value": "20 Amps"
        },
        {
            "@type": "PropertyValue",
            "name": "Circuit Breaker Type",
            "value": "GFCI"
        },
        {
            "@type": "PropertyValue",
            "name": "Number Of Poles",
            "value": "1"
        },
        {
            "@type": "PropertyValue",
            "name": "UPC",
            "value": "880765242187"
        },
        {
            "@type": "PropertyValue",
            "name": "Package Dimensions",
            "value": "8.46 x 5.59 x 5.39 inches"
        }
    ],
    "isSimilarTo": [
        {
            "@type": "Product",
            "name": "Square D - HOM115PDFC Homeline Plug-On Neutral 15 Amp Single-Pole Dual Function (CAFCI and GFCI) Circuit Breaker",
            "url": "https://www.amazon.com/Square-Schneider-Electric-HOM115PDFC-Single-Pole/dp/B00NOHVCQM"
        },
        {
            "@type": "Product",
            "name": "Square D by Schneider Electric HOM120PCAFIC Homeline Plug-On Neutral 20 Amp Single-Pole CAFCI Circuit Breaker",
            "url": "https://www.amazon.com/Square-Schneider-Electric-HOM120PCAFIC-Single-Pole/dp/B07GL2QFHH"
        }
    ],
    "audience": {
        "@type": "Audience",
        "audienceType": "Homeowners, Electricians, Contractors"
    },
    "award": [
        "#38 in Ground Fault Circuit Interrupters (Amazon Best Sellers Rank)"
    ],
    "isConsumableFor": [],
    "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
    },
    "sustainability": {
        "@type": "PropertyValue",
        "name": "ClimatePartner certified",
        "value": "Carbon emissions from the lifecycle of this product were measured, reduced and offset. Certification Number 97MDRL"
    },
    "mainEntityOfPage": "https://www.amazon.com/Schneider-Electric-HOM120PDFC-Homeline-Single-Pole/dp/B07TW6LKJZ"
};

// 2. Replace dynamic fetch or API response with the static data
// Example: Instead of fetch(...).then(data => renderProducts(data));
// Just call:
renderProducts(staticProductData);

// 3. Make sure your renderProducts function can accept this data structure
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
 
