/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 * @author Leo Gong <Leo.Gong@metropolia.fi>
 */
"use strict";

const url = 'https://recipegx.northeurope.cloudapp.azure.com/app';
const token = sessionStorage.getItem("token")

/* Getting the username from the token. */
const base64 = token.split('.')[1];
    const decoadedValue = JSON.parse(window.atob(base64));
    const usernameElement = document.querySelector("#username");
    usernameElement.append(decoadedValue.username);

/**
 * It fetches the recipes associated with user_id from the database and returns them.
 * @returns An array of objects.
 */
const getRecipeByUserId = async () => {
    try {
        
      const response = await fetch(url + "/recipe/user/" + decoadedValue.id);
      const recipes = await response.json();
      return recipes;
    } catch (e) {
      console.log(e.message);
    }
  };

/**
 * a function that gets the favorites of a user by their user id.
 * @returns An array of objects.
 */
  const getFavoritesByUserId = async () =>{
    try{
    const response = await fetch(url + "/fav/user/" + decoadedValue.id);
    const recipes = await response.json();
    return recipes;
  } catch (e) {
    console.log(e.message);
  }
  }

/**
 * It gets the recipes and favorites from the database and displays them on the page.
 */
  const showRecipes = async () =>{
    let recipeJSON;
    let favoriteJSON;
    recipeJSON = await getRecipeByUserId();
    favoriteJSON = await getFavoritesByUserId();


  for (const element of recipeJSON) {
    document.getElementById("info").innerHTML += `
    <a class="recipecard" onclick="href='recipes.html?id=${element.id}';" style="cursor: pointer;">
        <div class="recipecardtop">
        <img src="../../backend/uploads/${element.img}"+".jpg" alt="recipe">
        </div>
        <div class="recipecardbottom">
        <h1>${element.name}<h1>
    
        </div>
        </a>`;
  }
  for (const element of favoriteJSON) {
    document.getElementById("infoliked").innerHTML += `
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


  window.onload = showRecipes();