'use strict'
const usernameElement = document.querySelector('#username');

usernameElement.append(JSON.parse(sessionStorage.getItem("user")).username)
    