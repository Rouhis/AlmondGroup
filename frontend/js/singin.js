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
      body: JSON.stringify(data),
    };
  
    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    if (!json.user) {
      alert(json.error.message);
    } else {
      // save token and user
      sessionStorage.setItem('token', json.token);
      sessionStorage.setItem('user', JSON.stringify(json.user));
      user = JSON.parse(sessionStorage.getItem('user'));
      startApp(true);
    }
  });