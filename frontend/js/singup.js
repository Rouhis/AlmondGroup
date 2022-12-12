'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server


const signupForm = document.querySelector('#signupForm');


signupForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(signupForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };
    console.log(fetchOptions)
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  alert(json.message);
  console.log(json);
});