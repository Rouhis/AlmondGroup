"use strict"


const url = 'http://localhost:3000';
const addForm = document.querySelector("#recipe_add");

const loadFile = function (event) {
    let output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) 
    }
};


addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
const data = new FormData(addForm);
console.log(data);
    const fetchOptions = {
        method: 'POST',
        body: data,
    };
    console.log(fetchOptions);
    const response = await fetch(url + "/recipe" , fetchOptions);
    const json = await response.json();
    alert(json.message);
})
 
