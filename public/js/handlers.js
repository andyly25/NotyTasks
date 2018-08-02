
"use strict";

// Where our handlers are located
const handlers = (function () {
  // signin handler
  function handleSignupPressed (e) {
    e.preventDefault();

    alert('sign up attempt!');
    const signupElement = $(e.currentTarget);
    const signupUser = {
      firstName: signupElement.find(".firstName-entry").val(),
      lastName: signupElement.find(".lastName-entry").val(),
      username: signupElement.find(".username-entry").val(),
      password: signupElement.find(".password-entry").val()
    };
    api.create('/users', signupUser)
      .then((res) => {
        signupElement[0].reset();
        console.log('signup success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // login handler
  function handleLoginPressed (e) {
    e.preventDefault();

    alert('log in attempt!');
    const loginElement = $(e.currentTarget);
    const loginUser = {
      username: loginElement.find(".username-entry").val(),
      password: loginElement.find(".password-entry").val()
    };
    console.log("loginUser info", loginUser);
    api.create('/auth/login', loginUser)
      .then((res) => {
        store.authToken = res.authToken;
        console.log("res.authToken", res.authToken);
      })
      .then(() => {
        render.tasks();
        console.log("log in success!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    handleSignupPressed,
    handleLoginPressed
  };
}());
