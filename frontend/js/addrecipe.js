/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict"


const url = 'http://localhost:3000';
const addForm = document.querySelector("#recipe_add");
const token = sessionStorage.getItem("token")
const base64 = token.split('.')[1];
    const decoadedValue = JSON.parse(window.atob(base64));
    
    

/*Takes the user uploaded image and loads it into the client side website for preview */
const loadFile = function (event) {
    let output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) 
    }
};

/**
 * The function gets the user id from the decoded value and displays it in the text field.
 */
function getUserId(){
    document.getElementById("add_id").style.display = "none";
    const textFieldId = document.querySelector(".userIdText")
    textFieldId.append(decoadedValue.id)
}

/* A function that is called when the submit button is clicked. It prevents the default action of the
submit button. It then creates a new FormData object from the form and then creates a new
fetchOptions object with the method POST and the body data. It then creates a new response object
from the fetch function with the url and the fetchOptions. It then creates a new json object from
the response.json() function. It then alerts the message from the json object. */
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
const data = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        body: data,
    };
    const response = await fetch(url + "/recipe" , fetchOptions);
    const json = await response.json();
    alert(json.message);
})
 
window.onload = getUserId();