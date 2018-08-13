
'use strict';

// Where our handlers are located
const handlers = (function () {

  // #### Helper functions ####
  const getFormInfo = (form) => {
    return {
      title: form.find('.title-entry').val(),
      image: form.find('.image-entry').val(),
      content: form.find('.content-entry').val(),
      date: form.find('.date-entry').val(),
      time: form.find('.time-entry').val(),
      category: form.find('.category-entry').val()
    };
  };

  // #### Handler functions ####
  // signin handler
  function handleSignupPressed (e) {
    e.preventDefault();

    console.log('sign up attempt!');
    const signupElement = $(e.currentTarget);
    const signupUser = {
      firstName: signupElement.find('.firstName-entry').val(),
      lastName: signupElement.find('.lastName-entry').val(),
      username: signupElement.find('.username-entry').val(),
      password: signupElement.find('.password-entry').val()
    };
    api.post('/users', signupUser)
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
    const loginElement = $(e.currentTarget);
    const loginUser = {
      username: loginElement.find('.username-entry').val(),
      password: loginElement.find('.password-entry').val()
    };
    // rename create later possibly post
    api.post('/auth/login', loginUser)
      .then((res) => {
        store.authToken = res.authToken;
        return api.read('/tasks');
      })
      .then((tasks) => {
        store.isLogged();
        store.addAllTasks(tasks);
        store.screen = 'tasks';
        render();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // logout handler
  function handleLogoutPressed (e) {
    e.preventDefault();
    store.isLogged();
    window.location.href = '/auth/logout';
  }

  // create Task Handler
  function handlePostTaskPressed (e) {
    e.preventDefault();

    console.log('task create attempt!');
    const taskElement = $(e.currentTarget);
    const taskInput = getFormInfo(taskElement);
    // Create a task
    api.post('/tasks', taskInput)
      .then((res) => {
        console.log('inside task create', res);
        store.addToTasks(res);
        store.screen = 'tasks';
        render();
      })
      .catch((err) => { console.log(err); });
  }

  function handleLogoPressed (e) {
    store.screen = store.loggedIn ? 'tasks' : 'login';
    render();
  }

  function handleAddTaskPressed (e) {
    store.screen = 'create-task';
    render();
  }

  function handleEditTaskPressed (e) {
    const taskElement = $(e.currentTarget);
    const taskId = taskElement.closest('.task').data('id');
    console.log('edit task pressed');
    store.taskId = taskId;
    store.editTaskContent(taskId);
    store.screen = 'edit-task';
    render();
  }

  function handleEditSubmitPressed (e) {
    e.preventDefault();
    const taskElement = $(e.currentTarget);
    const taskInput = getFormInfo(taskElement);
    api.put(`/tasks/${store.taskId}`, taskInput)
      .then((task) => {
        store.updateTask(task);
        store.screen = 'tasks';
        render();
      });
  }

  function handleTaskDeletePressed (e) {
    const taskElement = $(e.currentTarget);
    const taskId = taskElement.closest('.task').data('id');

    api.remove(`/tasks/${taskId}`)
      .then(() => {
        console.log('inside delete pressed');
        store.findAndRemove(taskId);
        render();
      });
  }

  return {
    handleLogoPressed,
    handleSignupPressed,
    handleLoginPressed,
    handleLogoutPressed,
    handlePostTaskPressed,
    handleTaskDeletePressed,
    handleAddTaskPressed,
    handleEditTaskPressed,
    handleEditSubmitPressed
  };
}());
