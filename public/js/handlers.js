
"use strict";

// Where our handlers are located
const handlers = (function () {
  // signin handler
  function handleSignupPressed () {
    $(".signup_form").on("submit", (e) => {
      e.preventDefault();

      alert('sign in attempt!');
      const signupElement = $(e.currentTarget);
      const signupUser = {
        firstName: signupElement.find("firstName_entry"),
        lastName: signupElement.find("lastName_entry"),
        username: signupElement.find("username_entry"),
        password: signupElement.find("password_entry")
      };
    });
  }

  // login handler
  function handleLoginPressed () {
    $(".login_form").on("submit", (e) => {
      e.preventDefault();

      alert('log in attempt!');
      const loginElement = $(e.currentTarget);
      const loginUser = {
        username: loginElement.find("username_entry"),
        password: loginElement.find("password_entry")
      };
    });
  };  

  function callEventListeners () {
    handleSignupPressed();
    handleLoginPressed();
  }

  return {
    callEventListeners: callEventListeners
  };
}());
