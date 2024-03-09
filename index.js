window.onload = function() {
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'), // Ensure you have a div with id="buttonDiv" in your HTML
      { theme: 'outline', size: 'large' }  // Customization options
    );
    google.accounts.id.prompt(); // Display the One Tap sign-in prompt
  };
  
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    
    // Decode JWT Payload
    const base64Url = response.credential.split('.')[1]; // Get Payload segment
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert to Base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const user = JSON.parse(jsonPayload);
    // Now you have the user information in a JSON object
    console.log("User ID: " + user.sub);
    console.log("Full Name: " + user.name);
    console.log("Given Name: " + user.given_name);
    console.log("Family Name: " + user.family_name);
    console.log("Image URL: " + user.picture);
    console.log("Email: " + user.email);

    // You can use the user information as needed in your frontend
}



function signOut() {
    google.accounts.id.disableAutoSelect(); // This disables the One Tap prompt.

    google.accounts.id.revoke(localStorage.getItem('google_id'), done => {
        console.log('Credentials revoked');
        localStorage.removeItem('google_id'); // Remove the stored Google user ID from local storage or your preferred storage method.

        // Redirect or update UI as necessary
        window.location.assign('/'); // Redirects user to the homepage, or you can redirect to a login page or update the UI as needed.
    });
}


// More functions related to Google Sign In as needed
