/**
 * @author Axel Kähkönen OLIKOHAN :DDDD <axel.kahkonen@metropolia.fi>
 */
"use strict";

const searchButton = document.getElementById("button");
const searchField = document.getElementById("search");
let mainElement = document.querySelector("main");

const url = "http://127.0.0.1:3000";

/* An event listener that is listening for a click on the search button. When the button is clicked, it
will prevent the default action of the button. It will then check if the search field is empty. If
it is empty, it will call the getRecipes() function. If it is not empty, it will call the
getRecipeByName() function. It will then loop through the json object and append the data to the
main element. */
searchButton.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let json;

  if (!searchField.value) {
    alert('Typee jotain tyhmyri :DDD');
  } else {
    mainElement.innerHTML = ``;
    json = await getRecipeByName();
  }

  for (const element of json) {
    mainElement.innerHTML += `
    <a class="recipecard" onclick="href='recipes.html?id=${element.id}';" style="cursor: pointer;">
        <div class="recipecardtop">
        <img src="../../backend/uploads/${element.img}"+".jpg" alt="recipe">
        </div>
        <div class="recipecardbottom">
        <h1>${element.name}<h1>
        </div>
        </a>`;
  }
});

const showRecipesOnSite = async (recipes) => {
  const json = recipes;
  for (const element of json) {
    mainElement.innerHTML += `
    <a class="recipecard" onclick="href='recipes.html?id=${element.id}';" style="cursor: pointer;">
        <div class="recipecardtop">
        <img src="../../backend/uploads/${element.img}"+".jpg" alt="recipe">
        </div>
        <div class="recipecardbottom">
        <h1>${element.name}<h1>
        </div>
        </a>`;
  }
}

/**
 * It fetches the data from the API and returns the data in JSON format.
 * @returns An array of objects.
 */
const getRecipes = async () => {
  try {
    const response = await fetch(url + "/recipe/");
    const recipes = await response.json();
    console.log(recipes);
    showRecipesOnSite(recipes);
    return recipes;
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * It takes the value of the search field, appends it to the url, and then fetches the data from the
 * server. 
 * 
 * The data is then returned as a JSON object. 
 * 
 * The function is then called when the search button is clicked.
 * @returns An array of objects.
 */
const getRecipeByName = async () => {
  try {
    const response = await fetch(url + "/recipe/name/" + searchField.value);
    const recipes = await response.json();
    console.log(recipes);
    return recipes;
  } catch (e) {
    console.log(e.message);
  }
};
window.onload = getRecipes();
