
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

    console.log('log in attempt!');
    const loginElement = $(e.currentTarget);
    const loginUser = {
      username: loginElement.find('.username-entry').val(),
      password: loginElement.find('.password-entry').val()
    };
    console.log('loginUser info', loginUser);
    api.create('/auth/login', loginUser)
      .then((res) => {
        store.authToken = res.authToken;
        console.log('res.authToken', res.authToken);
      })
      .then(() => {
        store.screen = 'create-task';
        render.screen();
        console.log('log in success!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // create Task Handler
  function handleCreateTaskPressed (e) {
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
    console.log(taskInput);
    // Create a task
    api.create('/tasks', taskInput)
      .then((res) => {
        console.log('inside task create', res);
        store.addToTasks(res);
        store.screen = 'tasks';
        render.screen();
      })
      .catch((err) => { console.log(err); });
  }

  return {
    handleSignupPressed,
    handleLoginPressed,
    handleCreateTaskPressed
  };
}());
