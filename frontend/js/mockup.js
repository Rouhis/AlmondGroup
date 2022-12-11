'use strict'
const maze = "https://api.tvmaze.com/search/shows?q=";
const searchButton = document.getElementById('button');
const searchField = document.getElementById('search');
let mainElement = document.querySelector('main');
let mazeSearch;

searchButton.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let photo;
  let altPhoto;

  mazeSearch = maze + searchField.value;

  const response = await fetch(mazeSearch);

  const json = await response.json()

  console.log(json);

  for (const element of json) {
    if (element.show.image == null || element.show.image.medium == null) {
      photo = null;
      altPhoto = "No photo available";
    } else {
      photo = element.show.image.medium;
      altPhoto = "Photo";
    }
    console.log(element.show.name);
    mainElement.innerHTML += `
        <a class="recipecard" onclick="location.href='recipes.html';"" style="cursor: pointer;">
        <div class="recipecardtop">
        <img src="../mockupPhoto/glögg.png" alt="recipe">
        </div>
        <div class="recipecardbottom">
        <h1>Name<h1>
        </div>
        </a>`
      ;
  ;
  }}
);

const getRecipes = async () => {
  try{
    const response = await fetch(url + "/recipes");
    const recipes = await response.json();
    console.log(recipes);
  }catch(e){
    console.log(e.message);
  }
}