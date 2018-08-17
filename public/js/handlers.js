
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

  const loginUser = (loginInfo) => {
    api.post('/auth/login', loginInfo)
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

  // #### Handler functions ####
  // signin handler
  function handleSignupPressed (e) {
    e.preventDefault();

    console.log('sign up attempt!');
    const signupElement = $(e.currentTarget);
    const username = signupElement.find('.username-entry').val();
    const password = signupElement.find('.password-entry').val();
    const signupUser = {
      firstName: signupElement.find('.firstName-entry').val(),
      lastName: signupElement.find('.lastName-entry').val(),
      username,
      password
    };
    api.post('/users', signupUser)
      .then((res) => {
        signupElement[0].reset();
        loginUser({username, password});
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
    const loginInfo = {
      username: loginElement.find('.username-entry').val(),
      password: loginElement.find('.password-entry').val()
    };
    // rename create later possibly post
    loginUser(loginInfo);
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

  function handleViewTaskPressed (e) {
    const taskElement = $(e.currentTarget);
    const taskId = taskElement.closest('.task').data('id');
    console.log('view task pressed');
    store.taskId = taskId;
    store.editTaskContent(taskId);
    store.screen = 'view-task';
    render();
  }

  function handleMailTaskPressed () {
    console.log('mail button pressed', store.toEditTask);
    const targetTask = store.toEditTask[0];
    const mailContent = {
      title: targetTask.title,
      category: targetTask.category,
      content: targetTask.content
    };
    console.log('mail content', mailContent);

    api.post('/send', mailContent)
      .then((res) => {
        console.log('mail res', res);
        console.log('sending mail');
      })
      .catch((err) => { console.log("mail error", err); });
  }

  function handleTaskCompleted (e) {
    const taskId = $(e.currentTarget).closest('.task').data('id');
    const task = store.findById(taskId);
    task.completed = !task.completed;
    console.log(task);
    api.put(`/tasks/${task.id}`, task)
      .then((task) => {
        store.updateTask(task);
        store.screen = 'tasks';
        render();
      });
  }

  function handleShowCompleted () {
    store.showCompleted = !store.showCompleted;
    render();
  }

  function handleTaskSearch (e) {
    e.preventDefault();
    console.log('searching for tasks');
    const taskElement = $(e.currentTarget);
    store.searchInput = taskElement.val();
    console.log('store.searchInput', taskElement.val());
    render();
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
    handleViewTaskPressed,
    handleEditTaskPressed,
    handleTaskCompleted,
    handleShowCompleted,
    handleTaskSearch,
    handleEditSubmitPressed,
    handleMailTaskPressed
  };
}());
