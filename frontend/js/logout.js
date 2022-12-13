/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";


/**
 * If the user is logged in, hide the login button. If the user is not logged in, hide the logout,
 * profile, and add recipe buttons.
 */
function hideButtons() {
  if (sessionStorage.getItem("token")) {
    document.getElementById("dropdown_login").style.display = "none";
  } else {
    document.getElementById("dropdown_logout").style.display = "none";
    document.getElementById("dropdown_profile").style.display = "none";
    document.getElementById("dropdown_addrecipe").style.display = "none";
  }
}

/**
 * It removes the token from the session storage
 */
function logout() {
  sessionStorage.removeItem("token");
}

window.onload = hideButtons;
