'use strict';

if(sessionStorage.getItem("token") == null){
    const url = 'http://127.0.0.1:3000'; // change url when uploading to server


const loginForm = document.querySelector('#login_form');


loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
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
location.href = "profile.html"

});
    
}else{
    location.href = "profile.html"
}