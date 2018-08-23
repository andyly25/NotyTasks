// event listeners located here
// Work on after I get the api to work with signup and login

const callEventListeners = () => {
  $(window).on('click', handlers.handleCloseOutsideModal);
  $('.main-header').on('click', '.site-logo', handlers.handleHomePressed);
  $('.main-header').on('click', '.user-logout', handlers.handleLogoutPressed);

  $('#main-content').on('click', '.user-signup', handlers.handleSignupRedirect);
  $('#main-content').on('click', '.task-add', handlers.handleAddTaskPressed);
  $('#main-content').on('click', '.task-view', handlers.handleViewTaskPressed);
  $('#main-content').on('click', '.close', handlers.handleCloseModal);
  $('#main-content').on('click', '.task-delete', handlers.handleTaskDeletePressed);
  $('#main-content').on('click', '.task-mail', handlers.handleMailTaskPressed);
  $('#main-content').on('click', '.task-edit', handlers.handleEditTaskPressed);
  $('#main-content').on('click', '.return-home', handlers.handleHomePressed);

  $('#main-content').on('click', '.modal-image', handlers.handleOpenImageModal);
  $('#main-content').on('click', '.modal-close', handlers.handleCloseImageModal);
  $('#main-content').on('click', '.prev', handlers.handleMinusSlides);
  $('#main-content').on('click', '.next', handlers.handlePlusSlides);
  $('#main-content').on('click', '.demo', handlers.handleCurrentSlide);

  $('#main-content').on('submit', '.signup-form', handlers.handleSignupPressed);
  $('#main-content').on('submit', '.login-form', handlers.handleLoginPressed);
  $('#main-content').on('submit', '.createtask-form', handlers.handlePostTaskPressed);
  $('#main-content').on('submit', '.createtask-edit-form', handlers.handleEditSubmitPressed);

  $('#main-content').on('change', '.task-completed', handlers.handleTaskCompleted);
  $('#main-content').on('change', '.show-completed', handlers.handleShowCompleted);
  $('#main-content').on('change', '.task-search', handlers.handleTaskSearch);
};
