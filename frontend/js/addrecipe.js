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

function getUserId(){
    document.getElementById("add_id").style.display = "none";
    const textFieldId = document.querySelector(".userIdText")
    textFieldId.append(JSON.parse(sessionStorage.getItem("user")).id)
}

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