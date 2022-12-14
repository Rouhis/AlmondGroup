/**
 * @author Leo Gong <Leo.Gong@metropolia.fi>
 */
'use strict';
const url = 'https://recipegx.northeurope.cloudapp.azure.com/app';


/* Selecting the form element with the id of signupForm. */
const signupForm = document.querySelector('#signupForm');


/* The above code is a JavaScript function that is listening for a submit event on the signup form.
When the submit event is triggered, the function will prevent the default action of the form,
serialize the form data, and send a POST request to the server. */
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
   
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  console.log(json);
  location.href='login.html';
});