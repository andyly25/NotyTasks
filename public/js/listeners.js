// event listeners located here
// Work on after I get the api to work with signup and login

const callEventListeners = () => {
  $('#site-logo').on('click', handlers.handleLogoPressed);
  $('#main-content').on('submit', '.signup-form', handlers.handleSignupPressed);
  $('#main-content').on('submit', '.login-form', handlers.handleLoginPressed);
  // $('.createtask-form').on('submit', handlers.handleCreateTaskPressed);
  $('#main-content').on('submit', '.createtask-form', handlers.handlePostTaskPressed);
  $('#main-content').on('click', '.task-add', handlers.handleAddTaskPressed);
  $('#main-content').on('click', '.task-delete', handlers.handleTaskDeletePressed);
  $('#main-content').on('click', '.task-edit', handlers.handleEditTaskPressed);
};
