// event listeners located here
// Work on after I get the api to work with signup and login

const callEventListeners = () => {
  $('.signup-form').on('submit', handlers.handleSignupPressed);
  $('.login-form').on('submit', handlers.handleLoginPressed);
  // $('.createtask-form').on('submit', handlers.handleCreateTaskPressed);
  $('.createtask-form').on('submit', handlers.handleTaskSubmitPressed);
};
