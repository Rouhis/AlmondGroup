'use strict'
const maze = "https://api.tvmaze.com/search/shows?q=";
const searchButton = document.getElementById('button');
const searchField = document.getElementById('search');
let mainElement = document.querySelector('main');
let mazeSearch;
searchButton.addEventListener("click", async () => {

  let photo;
  let altPhoto;

  mazeSearch = maze + searchField.value;

  const response = await fetch(mazeSearch);

  const json = await response.json()

  console.log(json);

  for (const element of json) {
    if (element.show.image == null || element.show.image.medium == null) {
      photo = null
      altPhoto = "No photo available"
    } else {
      photo = element.show.image.medium;
      altPhoto = "Photo"
    }
    console.log(element.show.name);
    mainElement.innerHTML += `
        <div class="grid-item" onclick="location.href='#';" style="cursor: pointer;">
        <div class="textcontainer">
        <a href="#" class="textonrecipe">Recipe</a>
        </div> 
        <div>
        <img src="../mockupPhoto/glögg.png" alt=${altPhoto}>
        </div>
        </div>`
      ;

  }
}
);