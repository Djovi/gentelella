const url = "https://instantapi.ai/api/retrieve/";

const data = {
    / "webpage_url": "https://tg.coinafrique.com/profil/c4c18891-6b02-4cf2-881c-6de09703ec3f?page=2",
   //"webpage_url": "https://www.tiktok.com/channel/tokyo-travel?lang=en",
  "api_method_name": "getAllItems",
   "api_response_structure": "{\"Items\":[{\"name\":\"<the full title of the item, including any hashtags and emojis>\",\"price\":\"<the defined price of the item>\",\"author\":\"<the publisher of the item>\",\"item_url\":\"<the absolute URL to the item details>\",\"item_image\":\"<the absolute URL to the item image>\"}]}",
  
  //  "webpage_url": "https://instantapi.ai/",
 //   "api_method_name": "getProductInformation",
  //  "api_response_structure": "{\"product_name\":\"\",\"product_description\":\"\",\"product_use_cases\":\"\",\"copyright_company_name\":\"\",\"tax_registration_number\":\"\"}",
    "api_key": "free_joel@rechainglobal.com"
};

// Display a loading message while waiting for the API response
document.getElementById("responseContainer").innerHTML = '<span class="loading">Loading<span class="cursor">|</span></span>';

// Function to fetch data and display it in the responseContainer div
fetch(url, {
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
    document.getElementById("responseContainer").textContent = JSON.stringify(data.items, null, 2);
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById("responseContainer").textContent = `Error: ${error.message}`;
});
