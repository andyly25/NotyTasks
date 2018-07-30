
"use strict";

// Where our handlers are located
const handlers = (function () {
  // signin handler
  function handleSignupPressed () {
    $(".signup_form").on("submit", (e) => {
      e.preventDefault();

      alert('sign up attempt!');
      const signupElement = $(e.currentTarget);
      const signupUser = {
        firstName: signupElement.find(".firstName_entry").val(),
        lastName: signupElement.find(".lastName_entry").val(),
        username: signupElement.find(".username_entry").val(),
        password: signupElement.find(".password_entry").val()
      };
      api.create('/users', signupUser)
        .then((res) => {
          signupElement[0].reset();
          console.log('signup success');
        })
        .catch((err) => {
          console.log(err);
        });

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
