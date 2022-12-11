"use strict";
const usernameElement = document.querySelector("#username");

usernameElement.append(JSON.parse(sessionStorage.getItem("user")).username);


const url = "http://127.0.0.1:3000";
console.log(JSON.parse(sessionStorage.getItem("user")).id )

const getRecipeByUserId = async () => {
    try {
        
    //  const response = await fetch(url + "/recipe/user/" + JSON.parse(sessionStorage.getItem("user")).id);
      const response = await fetch(url + "/recipe/user/" + 1);
      const recipes = await response.json();
      console.log(recipes);
      return recipes;
    } catch (e) {
      console.log(e.message);
    }
  };
  const showRecipes = async () =>{
    let json;
    json = await getRecipeByUserId();

  for (const element of json) {
    document.getElementById("info").innerHTML += `
    <a class="ownrecipe_card" onclick="href='recipes.html?id=${element.id}';" style="cursor: pointer;">
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