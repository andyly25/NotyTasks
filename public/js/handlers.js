
'use strict';

// Where our handlers are located
const handlers = (function () {

  // #### Helper functions ####

  // grabbing form information
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

  // handles the user login process after user submits information
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
  };

  // #### Handler functions ####
  // signin handler: when users are signing up
  function handleSignupPressed (e) {
    e.preventDefault();

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
        loginUser({ username, password });
        console.log('signup success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // login handler, when users login
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

    const taskElement = $(e.currentTarget);
    const taskInput = getFormInfo(taskElement);
    // POST a task
    api.post('/tasks', taskInput)
      .then((res) => {
        store.addToTasks(res);
        store.screen = 'tasks';
        render();
      })
      .catch((err) => { console.log(err); });
  }

  // bring to home page, which should be the tasks page after signing in
  // This is mainly from the logo button pressed
  function handleHomePressed (e) {
    store.screen = store.loggedIn ? 'tasks' : 'login';
    store.searchInput = '';
    render();
  }

  // Brings users to add task screen
  function handleAddTaskPressed (e) {
    store.screen = 'create-task';
    render();
  }

  // Brings users to edit task screen
  function handleEditTaskPressed (e) {
    const taskElement = $(e.currentTarget);
    const taskId = taskElement.closest('.task').data('id');
    store.taskId = taskId;
    store.editTaskContent(taskId);
    store.isEditTask();
    store.screen = 'edit-task';
    render();
  }

  // When user press submit in edit task screen, we update and return to home
  function handleEditSubmitPressed (e) {
    e.preventDefault();
    const taskElement = $(e.currentTarget);
    const taskInput = getFormInfo(taskElement);
    api.put(`/tasks/${store.taskId}`, taskInput)
      .then((task) => {
        store.updateTask(task);
        store.isEditTask();
        store.screen = 'tasks';
        render();
      });
  }

  // shows you an individual task in form of modal
  function handleViewTaskPressed (e) {
    const taskElement = $(e.currentTarget);
    const taskId = taskElement.closest('.task').data('id');
    store.taskId = taskId;
    store.editTaskContent(taskId);

    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    store.screen = 'view-task';
    render();
  }

  // handles closing modal from X from top right
  function handleCloseModal () {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    handleHomePressed();
  }

  // handles closing modal if press outside modal
  function handleCloseOutsideModal (e) {
    const modal = document.getElementById('myModal');
    if (e.target === modal) {
      modal.style.display = 'none';
      handleHomePressed();
    }
  }

  // handles sending the mail
  function handleMailTaskPressed () {
    const targetTask = store.toEditTask[0];
    const mailContent = {
      title: targetTask.title,
      category: targetTask.category,
      content: targetTask.content,
      date: moment(targetTask.date).format('MM/DD/YYYY'),
      time: moment(targetTask.time, 'HH:mm').format('hh:mm A')
    };

    console.log('mail content', mailContent);

    api.post('/send', mailContent)
      .then((res) => {
        console.log('mail res', res);
        console.log('sending mail');
      })
      .catch((err) => { console.log('mail error', err); });
  }

  // handles the checkbox signifying completed task
  function handleTaskCompleted (e) {
    const taskId = $(e.currentTarget).closest('.task').data('id');
    const task = store.findById(taskId);
    task.completed = !task.completed;
    api.put(`/tasks/${task.id}`, task)
      .then((task) => {
        store.updateTask(task);
        store.screen = 'tasks';
        render();
      });
  }

  // shows completed tasks
  function handleShowCompleted () {
    store.showCompleted = !store.showCompleted;
    render();
  }

  // Allows you to search for tasks
  function handleTaskSearch (e) {
    e.preventDefault();
    const taskElement = $(e.currentTarget);
    store.searchInput = taskElement.val();
    console.log('store.searchInput', taskElement.val());
    render();
  }

  // Deletes a task
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
    handleHomePressed,
    handleSignupPressed,
    handleLoginPressed,
    handleLogoutPressed,
    handlePostTaskPressed,
    handleTaskDeletePressed,
    handleAddTaskPressed,
    handleViewTaskPressed,
    handleCloseModal,
    handleCloseOutsideModal,
    handleEditTaskPressed,
    handleTaskCompleted,
    handleShowCompleted,
    handleTaskSearch,
    handleEditSubmitPressed,
    handleMailTaskPressed
  };
}());
