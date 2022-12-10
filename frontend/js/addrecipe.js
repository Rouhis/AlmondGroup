"use strict"


const url = 'http://localhost:3000';
const addForm = document.querySelector("#recipe_add");

// const loadFile = function (event) {
//     let output = document.getElementById('output');
//     output.src = URL.createObjectURL(event.target.files[0]);
//     output.onload = function () {
//         URL.revokeObjectURL(output.src) 
//     }
// };

//const fd = new FormData(addForm);
//const test = {"name": "KalaKukko3","userid": 1,"ingredients": "Kala ja KOVAKUKKO","instructions": "Laita Kukko kalaan","img": "kalakukko.jpeg"};
//console.log(test);


// ONKO SE NYT  ISO S vai pieni s :)
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
const data = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
                headers: {
           'Content-Type': 'application/json',
         },
        body: data,
    };
    console.log(fetchOptions);
    const response = await fetch(url + "/recipe" + fetchOptions);
    const json = await response.json();
    alert(json.message);
})
 
//const fd = new FormData(addForm);

// addForm.addEventListener('submit', async (evt) => {
//     evt.preventDefault();
// const data = serializeJSON(addForm);
//     const fetchOptions = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     };
//     console.log(fetchOptions);
//     const response = await fetch(url + "/recipe" + fetchOptions);
//     const json = await response.json();
//     alert(json.message);
// })

