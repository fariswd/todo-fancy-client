// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    getDataUser();
    getTimeline();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1291461150959766',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.11' // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fbLogin(){
  FB.login(function(response){
    console.log(response)
    localStorage.setItem('fb_access_token', response.authResponse.accessToken)
  }, {scope : 'public_profile, email, publish_actions, user_posts'})
  // getDataUser()
}

// function getDataUser(){
//   var fb_access_token = localStorage.getItem('fb_access_token')
//   axios.get('http://localhost:3000/api/fb', {
//     headers: {
//       fb_access_token: fb_access_token
//     }
//   }).then(response=>{
//     console.log('data user', response);
//   }).catch(err=>{
//     console.log(err);
//   })
// }