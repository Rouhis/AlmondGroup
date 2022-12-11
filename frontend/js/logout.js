"use strict"


function hideButtons(){


if(sessionStorage.getItem("user")){
    document.getElementById("dropdown_login").style.display = "none";
}else{
document.getElementById("dropdown_logout").style.display = "none";
document.getElementById("dropdown_profile").style.display = "none";
document.getElementById("dropdown_addrecipe").style.display = "none";
}
}

function logout(){
    sessionStorage.removeItem("user");
}

window.onload = hideButtons