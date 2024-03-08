// Function to set a session cookie
function setSessionCookie() {
  var now = new Date();
  var expirationTime = new Date(now.getTime() + 30 * 60 * 1000); // Set expiration time to 30 minutes from now
  document.cookie = "sessionCookie=loggedIn; expires=" + expirationTime.toUTCString() + "; path=/";
}

// Call this function when the user logs in
//setSessionCookie();
// Function to check if the session cookie exists and is still valid
function checkSessionCookie() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith('sessionCookie=')) {
      // Session cookie found
      var cookieValue = cookie.substring('sessionCookie='.length);
      // Check if the cookie value is 'loggedIn' or any other valid value you set
      if (cookieValue === 'loggedIn') {
        // Session is still alive
        return true;
      }
    }
  }
  // Session cookie not found or expired
  return false;
}

// Call this function when the page is refreshed
if (!checkSessionCookie()) {
  // Redirect the user to the login page or take any other appropriate action
  window.location.href = "https://app.rechainglobal.com/login.html";
}
