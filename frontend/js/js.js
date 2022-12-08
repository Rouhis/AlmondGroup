'use strict'

const searchButton = document.getElementById('button');
const searchField = document.getElementById('search');
let mainElement = document.querySelector('main');

const url = "http://127.0.0.1:3000";

searchButton.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let photo;
  let altPhoto
  let json;
  

//  mazeSearch = maze + searchField.value;

  //const response = await fetch(mazeSearch);

if(!searchField.value){
  console.log("tyhjä")
  mainElement.innerHTML = ``;
  json = await getRecipes();
 // console.log(json);
}else{
  console.log("onon")
  mainElement.innerHTML = ``;
  json = await getRecipeByName();
}

  //const json = await getRecipes();
 // console.log(json);




  for (const element of json) {
 /*   if (element.show.image == null || element.show.image.medium == null) {
      photo = null
      altPhoto = "No photo available"
    } else {
      photo = element.show.image.medium;
      altPhoto = "Photo"
    }*///
   // console.log(element.show.name);
    mainElement.innerHTML += `
    <a class="recipecard" onclick="href='recipes.html?id=${element.id}';" style="cursor: pointer;">
        <div class="recipecardtop">
        <img src="../mockupPhoto/glögg.png" alt="recipe">
        </div>
        <div class="recipecardbottom">
        <h1>${element.name}<h1>
        <h2>${element.id}</h2>
        <button class="favorite recipebutton"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
        </div>
        </a>`
      ;

  }
}
);


const getRecipes = async () => {
  try{
    const response = await fetch(url + "/recipe/");
    const recipes = await response.json();
    console.log(recipes);
    return recipes;

  }catch(e){
    console.log(e.message);
  }
}

const getRecipeByName = async () => {
  try{
    const response = await fetch(url + "/recipe/name/" + searchField.value);
    const recipes = await response.json();
    console.log(recipes);
    return recipes;

  }catch(e){
    console.log(e.message);
  }
}
window.onload = getRecipes();