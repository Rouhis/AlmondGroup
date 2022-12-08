"use strict"

const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
  };

  
    const url = "http://127.0.0.1:3000"; 
    const recipeId= getQParam("id"); 
     console.log(recipeId);

  const getRecipeById = async () => {
    try{
        const response = await fetch(url + "/recipe/" + recipeId);
        const recipes = await response.json();
        console.log(recipes);

        document.getElementById("name").innerHTML = recipes.name;
        document.getElementById("ingredients").innerHTML = recipes.ingredients;
        document.getElementById("steps").innerHTML = recipes.instructions;
      //  console.log(json)
    //    return json;
      }catch(e){
        console.log(e.message);
      }
  }


  const getCommentsById = async () => {
    try{
        const commentResponse = await fetch(url+"/comment/user/recipe/"+recipeId);
        const comments = await commentResponse.json();
        console.log(comments);
        for (const element of comments){
        document.getElementById("comments").innerHTML += `<div class="comment"><h4>${element.username}</h4><p>${element.data}</p></div>`
        }
    }catch(e){
        console.log(e.message);

    }
  }

  window.onload = getRecipeById();
  window.onload = getCommentsById();
