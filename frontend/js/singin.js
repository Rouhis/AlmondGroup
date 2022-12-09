'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server


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
  alert(json.message);
  console.log(json);
});