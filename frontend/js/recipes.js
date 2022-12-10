"use strict";

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

let likeBtn = document.getElementById("likebutton");
const url = "http://127.0.0.1:3000";
const recipeId = getQParam("id");
console.log(recipeId);
const addCommnetForm = document.querySelector(".add_comment");

const getRecipeById = async () => {
  try {
    const response = await fetch(url + "/recipe/" + recipeId);
    const recipes = await response.json();
    console.log(recipes);

    document.getElementById("name").innerHTML = recipes.name;
    document.getElementById("ingredients").innerHTML = recipes.ingredients;
    document.getElementById("steps").innerHTML = recipes.instructions;
  } catch (e) {
    console.log(e.message);
  }
};

const getCommentsById = async () => {
  try {
    const commentResponse = await fetch(
      url + "/comment/user/recipe/" + recipeId
    );
    const comments = await commentResponse.json();
    console.log(comments);
    for (const element of comments) {
      document.getElementById(
        "commentfield"
      ).innerHTML += `<div class="comment">
      <div class="username">
          <h4>${element.username}</h4>
      </div>
      <div class="comment_stuff">
          <p>${element.data}</p>
      </div>
  </div>`;
    }
  } catch (e) {
    console.log(e.message);
  }
};

document
  .querySelector("#add_comment_button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const user_id = 2;
    const recipe_id = recipeId;
    const data = document.querySelector("#commentBox").value;
    const response = await fetch(url + "/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_id,
        user_id,
        data,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  });

document.querySelector("#likebutton").addEventListener("click", async (e) => {
  e.preventDefault();
  const userId = 2;
  const response = await fetch(url + "/fav", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      recipeId,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data));
});

if (likeBtn) {
  console.log("otl");
  likeBtn.addEventListener("Submit", async (evt) => {
    console.log("otl");
    evt.preventDefault();
    const fd = '{"userId": 2,"recipeId": 1}';
    const fetchOptions = {
      method: "POST",
      body: fd,
    };
    const favResponse = await fetch(url + "/fav/" + fetchOptions);
    console.log(fetchOptions + " " + fd);
    const favJson = await favResponse.json();
    alert(favJson.message);
  });
} else {
  console.log("tyhäm");
}

window.onload = getRecipeById();
window.onload = getCommentsById();
