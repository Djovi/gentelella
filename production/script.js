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
      //  renderProducts(dataFromFirstFetch);
 
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
// script.js

// 1. Place your static JSON in a variable
const staticProductData = const staticProductData = [
    {
        "@type": "Product",
        "name": "Square D HomeLine 30 amps Surge 2-Pole Circuit Breaker",
        "image": "https://m.media-amazon.com/images/I/6165a5MmYTL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-HomeLine-2-Pole-Circuit-Breaker/dp/B002YEJITO/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "492"
        },
        "offers": {
            "@type": "Offer",
            "price": "20.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-HomeLine-2-Pole-Circuit-Breaker/dp/B002YEJITO/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Plug In Circuit Breaker, HOM, Number of Poles 2, 60 Amps, 120/240VAC, Standard",
        "image": "https://m.media-amazon.com/images/I/61VQA8+FMeL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Circuit-Breaker-Number-240VAC-Standard/dp/B07GTDR152/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "146"
        },
        "offers": {
            "@type": "Offer",
            "price": "20.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Circuit-Breaker-Number-240VAC-Standard/dp/B07GTDR152/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D 9013 FSG2 30/50 Schneider Electric FSG2J21CP 30-50 PSI Pumptrol Water Pressure Switch",
        "image": "https://m.media-amazon.com/images/I/81Wl60UgNQL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-9013-FSG2-30-50/dp/B00CONESDG/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "1060"
        },
        "offers": {
            "@type": "Offer",
            "price": "25.07",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-9013-FSG2-30-50/dp/B00CONESDG/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D QO230 Miniature Circuit Breaker, 120/240 VAC, 30 A, 10 kA Interrupt, 2 Poles, Thermal Magnetic Trip, Black",
        "image": "https://m.media-amazon.com/images/I/61aqnskTHdL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-QO230-Miniature-Interrupt-Magnetic/dp/B0195UPQA4/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "109"
        },
        "offers": {
            "@type": "Offer",
            "price": "24.20",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-QO230-Miniature-Interrupt-Magnetic/dp/B0195UPQA4/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D by Schneider Electric Square D X Series Standard Size Screwless Wall Plate for Outlet and Light Switch, 1 Gang, Matte Black",
        "image": "https://m.media-amazon.com/images/I/31kD+vvKnML._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-Standard-Screwless-Outlet-Switch/dp/B0B459T4M1/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": "37"
        },
        "offers": {
            "@type": "Offer",
            "price": "3.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-Standard-Screwless-Outlet-Switch/dp/B0B459T4M1/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D Hom2100 2P-120/240V-100A Cb",
        "image": "https://m.media-amazon.com/images/I/71-q8IUgcRL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-Hom2100-2P-120-240V-100A-Cb/dp/B00R8MSANC/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "860"
        },
        "offers": {
            "@type": "Offer",
            "price": "54.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-Hom2100-2P-120-240V-100A-Cb/dp/B00R8MSANC/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D by Schneider Electric HEPD50 Universal Whole House Surge Protection Device, 1-Phase, 3-Wire + Ground for 120/240V, 50kA, Black",
        "image": "https://m.media-amazon.com/images/I/51W9RtfZtzL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-Schneider-Electric-HEPD50-Electronics/dp/B01MYD45U1/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "173"
        },
        "offers": {
            "@type": "Offer",
            "price": "76.89",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-Schneider-Electric-HEPD50-Electronics/dp/B01MYD45U1/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "1- SQUARE D QO230GFI 30 AMP 2 POLE Plug-on Qwik-Gard GFI",
        "image": "https://m.media-amazon.com/images/I/71bXqeaDOmL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/SQUARE-QO230GFI-POLE-Plug-Qwik-Gard/dp/B00A2V1RZO/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "50"
        },
        "offers": {
            "@type": "Offer",
            "price": "51.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/SQUARE-QO230GFI-POLE-Plug-Qwik-Gard/dp/B00A2V1RZO/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D by Schneider Electric QO2175SB QO SurgeBreaker, Surge Protection Device, 25kA, 120/240V, 1-Phase, 3-Wire",
        "image": "https://m.media-amazon.com/images/I/61ycyHFKaaL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-Schneider-Electric-QO2175SB-SurgeBreaker/dp/B000CG80KY/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "828"
        },
        "offers": {
            "@type": "Offer",
            "price": "70.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-Schneider-Electric-QO2175SB-SurgeBreaker/dp/B000CG80KY/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Telemecanique Sensors RF30 Photoelectric Sensor Reflector, 3\", Silver",
        "image": "https://m.media-amazon.com/images/I/71+6gYyJkNL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Telemecanique-Sensors-Photoelectric-Sensor-Reflector/dp/B00CON76GM/",
        "brand": {
            "@type": "Brand",
            "name": "Telemecanique Sensors"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "267"
        },
        "offers": {
            "@type": "Offer",
            "price": "8.87",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Telemecanique-Sensors-Photoelectric-Sensor-Reflector/dp/B00CON76GM/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "SQUARE D BY SCHNEIDER ELECTRIC QO2020 MINIATURE CB 120/240V 20A/20A by Square D",
        "image": "https://m.media-amazon.com/images/I/319BcAmF1tL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/SCHNEIDER-ELECTRIC-QO2020-MINIATURE-Square/dp/B01MXZG69I/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": "26"
        },
        "offers": {
            "@type": "Offer",
            "price": "39.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/SCHNEIDER-ELECTRIC-QO2020-MINIATURE-Square/dp/B01MXZG69I/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D Type QO 2-Pole Molded Case Circuit Breaker 100A QO2100",
        "image": "https://m.media-amazon.com/images/I/81K1QShTG6L._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-2-Pole-Molded-Circuit-Breaker/dp/B00AT090O8/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "445"
        },
        "offers": {
            "@type": "Offer",
            "price": "59.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-2-Pole-Molded-Circuit-Breaker/dp/B00AT090O8/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D 200 amps 120/240 volt 1 space 1 circuits Load Center Screws",
        "image": "https://m.media-amazon.com/images/I/41o7MAWbw+L._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-D-Load-Center-Clmshl/dp/B01N8S4T4Z/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "2.0",
            "reviewCount": "1"
        },
        "offers": {
            "@type": "Offer",
            "price": "10.25",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-D-Load-Center-Clmshl/dp/B01N8S4T4Z/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D 4020284450K Scr Dr Latch Kt",
        "image": "https://m.media-amazon.com/images/I/31a6RnFPNOL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-D-Door-Latch-Kit/dp/B00PSMP72Q/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.3",
            "reviewCount": "65"
        },
        "offers": {
            "@type": "Offer",
            "price": "20.49",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-D-Door-Latch-Kit/dp/B00PSMP72Q/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D by Schneider Electric Square D X Series Dual Humidity & PIR Motion Occupancy/Vacancy Sensor Light & Fan Control, 3 Amp Single-Pole/1-way, Matte White",
        "image": "https://m.media-amazon.com/images/I/51YTtBZIzCL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-Humidity-Occupancy-Vacancy-Single-Pole/dp/B0B4QQ7HFF/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "3.9",
            "reviewCount": "26"
        },
        "offers": {
            "@type": "Offer",
            "price": "33.76",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-Humidity-Occupancy-Vacancy-Single-Pole/dp/B0B4QQ7HFF/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D QO120 Circuit Breaker, 10 Pack, QO, 20 Amps, 120 Volts, UL Listed, 1 Pole, 10kA AIR, Standard Type, Plug in, Qty 10",
        "image": "https://m.media-amazon.com/images/I/91CrnW-sgEL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-Circuit-Breaker-Listed-Standard/dp/B07RN8ZCS3/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "89"
        },
        "offers": {
            "@type": "Offer",
            "price": "112.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-Circuit-Breaker-Listed-Standard/dp/B07RN8ZCS3/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D HOM1RK Retaining Kit",
        "image": "https://m.media-amazon.com/images/I/31i4Gr9S0jL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-D-HOM1RK-Retaining-Kit/dp/B000LDJRZU/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.0",
            "reviewCount": "15"
        },
        "offers": {
            "@type": "Offer",
            "price": "9.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-D-HOM1RK-Retaining-Kit/dp/B000LDJRZU/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    },
    {
        "@type": "Product",
        "name": "Square D by Schneider Electric Square D X Series 125-Volt Tamper Resistant GFCI Duplex Decorator Receptacle Back Wire Clamps, 15 Amps, Matte Black",
        "image": "https://m.media-amazon.com/images/I/41tznT4zGZL._AC_UL320_.jpg",
        "url": "https://www.amazon.com/Square-125-Volt-Resistant-Decorator-Receptacle/dp/B0B3NJ522D/",
        "brand": {
            "@type": "Brand",
            "name": "Square D"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "31"
        },
        "offers": {
            "@type": "Offer",
            "price": "20.78",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.amazon.com/Square-125-Volt-Resistant-Decorator-Receptacle/dp/B0B3NJ522D/",
            "itemCondition": "https://schema.org/NewCondition"
        }
    }
];

      

// 2. Call renderProducts with the static data
renderProducts(staticProductData);
const staticProductData = { 
    /* ... (your full JSON from above) ... */
};

// Extracting the required fields
function getProductSummary(productData) {
    return {
        product_name: productData.name || "",
        product_price: productData.offers && productData.offers.price ? productData.offers.price : "",
        product_url: productData.offers && productData.offers.url ? productData.offers.url : ""
    };
}

// Usage example:
const summary = getProductSummary(staticProductData);
console.log(summary);
// Output example:
// {
//   product_name: "Square D by Schneider Electric HOM120PDFC Homeline Plug-On Neutral 20 Amp Single-Pole Dual Function (CAFCI and GFCI) Circuit Breaker, (Pack of 4)",
//   product_price: "220.00",
//   product_url: "https://www.amazon.com/Schneider-Electric-HOM120PDFC-Homeline-Single-Pole/dp/B07TW6LKJZ"
// }
// 3. Your renderProducts function
function renderProducts1(productData) {
    // Assign variables as you would with dynamic API data
    const name = productData.name;
    const price = productData.offers && productData.offers.price ? productData.offers.price : "N/A";
    const item_image = productData.image && productData.image.length ? productData.image[0] : "";

    // Example: Render product info to console or page (customize as needed)
    console.log("Product Name:", name);
    console.log("Price: $", price);
    console.log("Image URL:", item_image);

    // You can extend this to actually render HTML if desired, for example:
    // document.getElementById('productName').textContent = name;
    // document.getElementById('productPrice').textContent = '$' + price;
    // document.getElementById('productImage').src = item_image;
}

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
 
