"use strict";
const usernameElement = document.querySelector("#username");

usernameElement.append(JSON.parse(sessionStorage.getItem("user")).username);


const url = "http://127.0.0.1:3000";
console.log(JSON.parse(sessionStorage.getItem("user")).id )

const token = sessionStorage.getItem("token")

const base64Url = token.split('.')[1];
    const decoadedValue = JSON.parse(window.atob(base64Url));
    console.log(decoadedValue)
    sessionStorage.setItem('decoded', JSON.stringify(decoadedValue));

const getRecipeByUserId = async () => {
    try {
        
      const response = await fetch(url + "/recipe/user/" + JSON.parse(sessionStorage.getItem("user")).id);
      const recipes = await response.json();
      console.log(recipes);
      return recipes;
    } catch (e) {
      console.log(e.message);
    }
  };

  const getFavoritesByUserId = async () =>{
    try{
    const response = await fetch(url + "/fav/user/" + JSON.parse(sessionStorage.getItem("user")).id);
    const recipes = await response.json();
    console.log(recipes);
    return recipes;
  } catch (e) {
    console.log(e.message);
  }
  }

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