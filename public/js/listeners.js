// event listeners located here
// Work on after I get the api to work with signup and login

const callEventListeners = () => {
  $('#main-content').on('submit', '.signup-form', handlers.handleSignupPressed);
  $('#main-content').on('submit', '.login-form', handlers.handleLoginPressed);
  // $('.createtask-form').on('submit', handlers.handleCreateTaskPressed);
  $('#main-content').on('submit', '.createtask-form', handlers.handleCreateTaskPressed);
};
