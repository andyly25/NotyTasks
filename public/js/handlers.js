
'use strict';

// Where our handlers are located
const handlers = (function () {
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
        store.addAllTasks(tasks);
        store.screen = 'tasks';
        render();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // create Task Handler
  function handlePostTaskPressed (e) {
    e.preventDefault();

    console.log('task create attempt!');
    const taskElement = $(e.currentTarget);
    const taskInput = {
      title: taskElement.find('.title-entry').val(),
      image: taskElement.find('.image-entry').val(),
      content: taskElement.find('.content-entry').val(),
      time: taskElement.find('.date-entry').val(),
      category: taskElement.find('.category-entry').val()
    };
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
    // e.preventDefault();
    store.screen = 'login';
    render();
  }

  function handleAddTasksPressed (e) {
    store.screen = 'create-task';
    render();
  }

  function handleTaskDeletePressed (e) {
    const taskElement = $(e.currentTarget);
    const taskId = taskElement.closest('.task').data('id');

    api.remove(`/tasks/${taskId}`)
      .then(() => {
        console.log("inside delete pressed");
        store.findAndRemove(taskId);
        render();
      })
  }

  return {
    handleLogoPressed,
    handleSignupPressed,
    handleLoginPressed,
    handlePostTaskPressed,
    handleTaskDeletePressed,
    handleAddTasksPressed
  };
}());
