let loadFile = function (event) {
    let output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) 
    }
};

let counter = 0;

function addField(){
    counter++;
    let newFields = document.getElementById(textfield).cloneNode(true);
    newFields.id = '';
    newFields.style.display = 'block';
    let newField = newFields.childNodes;
    for (let i = 0; i < newField.length; i++){
        let thename = newField[i].nodeName;
        if (thename){
            newField[i].name = theName + counter;
        }
    
    }
    let insert = document.getElementById(add_ingredients);
    insertHere.parentNode.insertBefore(newFields,insertHere);
}
