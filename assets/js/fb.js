// (checktoken())

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    checktoken()
    
  } else {
    // The person is not logged into your app or we are unable to tell.
    console.log('belum login')
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
    appId      : '451001571962385',
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
(function init(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fbLogin(){
  FB.login(function(response){
    console.log(response)
    signinfb(response)
  }, {scope : 'public_profile, email'})
  // getDataUser()
}

function signinfb(response){
  axios.post('http://localhost:3000/api/signfb',[],{
    'headers': {'fb_token': response.authResponse.accessToken}
  })
  .then(r=>{
    console.log(r.data)
    if(r.data.msg=='login success'){
      localStorage.setItem('token', r.data.token)
      window.location.replace("home.html");
    } else {
      console.log('something wrong')
    }
  })
  .catch(err=>{
    console.log(err)
  })
}

function checktoken(){
  var token = localStorage.getItem('token');
  if(token){
    //cek token if valid
    axios.get('http://localhost:3000/api/mytodo',{
      'headers': {'token': token}
    })
    .then((response)=>{
      if(response.status!=200){
        alert("please login");
        localStorage.removeItem('token');
      }else {
        window.location.replace("home.html");
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  } else {
    //delete token
    localStorage.removeItem('token');
  }
}