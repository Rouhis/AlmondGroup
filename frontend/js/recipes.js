/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";




/*Takes rhe recipes id from the url and makes it a new const*/
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

/**
 * It fetches the recipe from the database and displays it on the page.
 */
const getRecipeById = async () => {
  try {
    const response = await fetch(url + "/recipe/" + recipeId);
    const recipes = await response.json();
    console.log(recipes);

    document.getElementById("foodImage").src = "../../backend/uploads/" + recipes.img;
    document.getElementById("name").innerHTML = recipes.name;
    document.getElementById("ingredients").innerHTML = recipes.ingredients;
    document.getElementById("steps").innerHTML = recipes.instructions;
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * It fetches comments from the database and displays them on the page
 */
const getCommentsById = async () => {
  try {
    const commentResponse = await fetch(
      url + "/comment/user/recipe/" + recipeId
    );
    const comments = await commentResponse.json();
    console.log(comments);
    for (const element of comments) {
      if(sessionStorage.getItem("token")){
        const token = sessionStorage.getItem("token")
        const base64 = token.split('.')[1];
        const decoadedValue = JSON.parse(window.atob(base64));
        const role = decoadedValue.role;
        console.log(role)
        if (role =="2"){
          document.getElementById(
            "commentfield"
          ).innerHTML += `<div class="comment" id="${element.id}">
          <div class="username">
              <h4>${element.username}</h4>
          </div>
          <div class="comment_stuff">
              <p>${element.data}</p>
              <p hidden>${element.user_id}</p>
          </div>
          <div>
          <button id="commentDelete" onClick="deleteComment(${element.id})">Delete</button
        </div>
      </div>
      <script>const buttonDelete = document.getElementById("commentDelete");
      buttonDelete.addEventListener("click",deleteComment(id),async(e) =>{e.preventDefault();});
      </script>`;
        } else {
          document.getElementById(
            "commentfield"
          ).innerHTML += `<div class="comment" id="${element.id}">
          <div class="username">
              <h4>${element.username}</h4>
          </div>
          <div class="comment_stuff">
              <p>${element.data}</p>
              <p hidden>${element.user_id}</p>
          </div>`
        }
      
    }}
  } catch (e) {
    console.log(e.message);
  }
};

/** COMMENT DELETE */
async function deleteComment(id) {
  const token = sessionStorage.getItem("token")
  const base64 = token.split('.')[1];
  const decoadedValue = JSON.parse(window.atob(base64));
  const role = decoadedValue.role;
  console.log(id)
  console.log(role)
  if (role == "2") {
    const response = await fetch(url + "/comment/deleteId/" + id, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));

  }
};


/* Adding a comment to the database. */
document
  .querySelector("#add_comment_button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    if (!document.querySelector("#commentBox").value) {

    } else {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const base64 = token.split('.')[1];
        const decoadedValue = JSON.parse(window.atob(base64));
        const user_id = decoadedValue.id;
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
        location.reload();

      } else {
        alert("Please login to add comment");
      }
    }
  });


//image.pngdocument.querySelector("#ShowCommentDelete").addEventListener("click",hideDelete2());

/* Deleting the recipe from the database. */
document.querySelector("#Delete").addEventListener("click", async (e) => {
  e.preventDefault();
  const token = sessionStorage.getItem("token")
  const base64 = token.split('.')[1];
  const decoadedValue = JSON.parse(window.atob(base64));
  const role = decoadedValue.role;
  console.log(role)


  if (role == "2") {
    const response = await fetch(url + "/recipe/" + recipeId, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));

  }
});

/* Adding a recipe to the favorites list. */
document.querySelector("#likebutton").addEventListener("click", async (e) => {
  e.preventDefault();

  if (sessionStorage.getItem("token")) {
    const token = sessionStorage.getItem("token")
    const base64 = token.split('.')[1];
    const decoadedValue = JSON.parse(window.atob(base64));
    const userId = decoadedValue.id;
    const response = await fetch(url + "/fav/test/", {
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
  } else {
    alert("Please login to add recipe to favorites");
  }
});

function hideDelete() {
  if(sessionStorage.getItem("token")){
  const token = sessionStorage.getItem("token")
  const base64 = token.split('.')[1];
  const decoadedValue = JSON.parse(window.atob(base64));
  const role = decoadedValue.role;
  console.log(role)
  if (role =="2"){
    document.querySelector("#Delete").style.display = "block";
  }else{
    document.querySelector("#Delete").style.display = "none";
  }
  }
}


window.onload = hideDelete();
window.onload = getRecipeById();
window.onload = getCommentsById();



