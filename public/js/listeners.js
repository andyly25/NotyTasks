// event listeners located here
// Work on after I get the api to work with signup and login

const callEventListeners = () => {
  $(".signup_form").on("submit", handlers.handleSignupPressed);
  $(".login_form").on("submit", handlers.handleLoginPressed);
};