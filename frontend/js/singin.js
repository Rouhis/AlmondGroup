/**
 * @author Leo Gong <Leo.Gong@metropolia.fi>
 * 
 */


'use strict';

/* Checking if the token is null. If it is null, it will redirect to the login page. */
if(sessionStorage.getItem("token") == null){
    const url = 'http://127.0.0.1:3000'; 


/* Selecting the form with the id login_form. */
const loginForm = document.querySelector('#login_form');


/* The above code is checking if the user is logged in or not. If the user is not logged in, then the
user will be redirected to the login page. If the user is logged in, then the user will be
redirected to the home page. */
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };
    console.log(fetchOptions)
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log(json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
}
location.href = "home.html"

});
    
}else{
    location.href = "home.html"
}