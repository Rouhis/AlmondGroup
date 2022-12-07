'use strict'

const searchButton = document.getElementById('button');
const searchField = document.getElementById('search');
let mainElement = document.querySelector('main');

const url = "http://127.0.0.1:3000";

searchButton.addEventListener("click", async () => {
  
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

    mainElement.innerHTML += `
        <a class="recipecard" onclick="location.href='#';" style="cursor: pointer;">
        <div class="recipecardtop">
        <img src="../mockupPhoto/glögg.png" alt="recipe">
        </div>
        <div class="recipecardbottom">
        <h1>${element.name}<h1>
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
getRecipes();