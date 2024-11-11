//const url = "https://instantapi.ai/api/retrieve/";
 const scriptURL = 'hhttps://script.google.com/macros/s/AKfycbxi4bopMHTXXbU2uHDO2ORcuTmr1QomJWKhd2NQcHswPcocoOvQSSxdqfEchqbtbVYy/exec'
                     

   
     
   
const data = {
  "webpage_url": "https://tg.coinafrique.com/profil/c4c18891-6b02-4cf2-881c-6de09703ec3f?page=1",
 //  "webpage_url": "https://tg.coinafrique.com/annonce/appartements/location-appartement-attilamonou-4930530",
   "api_method_name": "getProductsList",
   "api_response_structure": "{\"Items\":[{\"name\":\"<the full title of the item, including any hashtags and emojis>\",\"price\":\"<the defined price of the item>\",\"author\":\"<the publisher of the item>\",\"item_url\":\"<the absolute URL to the item details>\",\"item_image\":\"<the absolute URL to the item image>\"}]}",
  
  // "webpage_url": "https://www.amazon.com/Schneider-Electric-HOM120PDFC-Homeline-Single-Pole/dp/B07TW6LKJZ/ref=sr_1_5?crid=GO5AGC9SDDB7&dib=eyJ2IjoiMSJ9.uE4deo7r5VmfAYy0VaoW5gZ-srtMCvhZPBYVlq8YKWUPWVIIM4exQQ0LpVlh4XthMBWh4WCIOYbrI4pXeyS44NYRuAl9wuMj_KlZe6GTmrSeUUuSM8ITD4af3PLZz4jEI4-izPm_70FLSvoN57VxbWx_qW7UFr8RbF2ih0Zo49o1hs69ZI6sDGje2R56pczekwEah2t2qky1y3H6TceejUWrxHRTNBM2ljjtmUNsNvU.sCn4ekKGnzaVXB6k-c1nidwTJUXgOsbXWhnxD0LG8F8&dib_tag=se&keywords=Schneider+Electric&psr=EY17&qid=1730050709&s=todays-deals&sprefix=schneider+electric+%2Ctodays-deals%2C740&sr=1-5-catcorr",
  // "api_method_name": "getProductInformation",
  // "api_response_structure": "{\"product_name\":\"\",\"product_description\":\"\",\"product_use_cases\":\"\",\"copyright_company_name\":\"\",\"tax_registration_number\":\"\"}",
   "api_key": "free_joel@rechainglobal.com"
};

// Display a loading message while waiting for the API response
document.getElementById("responseContainer").innerHTML = '<span class="loading">Loading<span class="cursor">|</span></span>';
const jsonData = {
       "title": 'Location boutique - Kodjoviakope',
      "price": '120 000',
      "author": 'Samuel',
      "product_url": 'https://tg.coinafrique.com/annonce/bureaux-et-commerces/location-boutique-kodjoviakope-4924416',
      "item_image": 'https://images.coinafrique.com/thumb_4924416_uploaded_image1_1725345786.jpg'
};

   fetch(scriptURL, { 
    method: 'POST',
    
     body: JSON.stringify(jsonData)
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

// Function to fetch data and display it in the responseContainer div
/*fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {

    console.log(data);
    // Replace loading message with JSON data in a readable format
    document.getElementById("responseContainer").textContent = JSON.stringify(data, null, 2);
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById("responseContainer").textContent = `Error: ${error.message}`;
});*/
