// list elements for the basic forms (login, edit)
const liForm = (input) => {
  let inputValue = input.value;
  if (store.isEdit) {
    inputValue = input.value ? store.toEditTask[0][input.labelFor] : '';
  }
  return `
    <li>
      <label for="${input.labelFor}">${input.label}</label>
      <input 
        type="${input.type}" 
        name="${input.name}" 
        class="${input.class}" 
        placeholder="${input.placeholder}"
        value="${input.value ? inputValue : ''}"
        >
    </li>
  `;
};

// Handles the elements within the fieldset
const formFieldset = (form) => {
  return `
    <fieldset>
      <legend>${form.legend}</legend>
        <ul class="flex-outer">
        ${form.inputs.map((input) => {
          return liForm(input);
          // .join('') removed the random commas between list elements
          }).join('')} 
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </fieldset>
  `;
};

// creates the basic form for signin, signup
const createForm = (form) => {
  return `
    <form class="${form.classes}">
      ${formFieldset(form)}
    </form>
  `;
};

// creates form for edit tasks
const createEditForm = (form) => {
  return `
    <form class="createtask-edit-css createtask-edit-form">
      ${formFieldset(form)}
    </form>
  `;
};

// creates login sign in form
function loginSigninScreen () {
  return `
    <section class="login-signin">
      <div class="left">
        <h2> Welcome to Notytask!</h2>
        <p> As a user, you can </p>
        <ol>
          <li>Create Tasks</li>
          <li>Customize tasks with images</li>
          <li>E-mail the task to yourself as a reminder</li>
          <li>sneak peek with dummy account (username: someuser@gmail.com password: someuser)
          <li>Sign up now if you haven't yet!</li>
        </ol>
        <input class="user-signup normal-button" type="button" value="Sign Up">
      </div>
      <div class="right">
        ${store.needSignup ? createForm(signupForm) : createForm(loginForm)}
      </div>
    </section>
  `;
}

// creates nav bar at the top with logo and logout
function createNavBar () {
  return `
    <ul class="main-nav">
      <li><h1 class="logo site-logo">Noty<br>Tasks</h1></li>
      <li>
        <input class="user-logout normal-button" type="button" value="Log Out">
      </li>
    </ul>
  `;
}

// form to create a task
function createTaskScreen () {
  return `
    <section class="task-screen">
      ${createForm(createtaskForm)}
    </section>
  `;
}

// edit task screen
function editTaskScreen () {
  return `
    <h2>Edit Task Screen</h2>
    <section class="edit-task-screen">
      ${createEditForm(createtaskForm)}
    </section>
  `;
}

// separate tasks based on categories
function separateCategories (obj) {
  return _.map(obj, (arrayTasks) => {
    return `
      <h2>Category: ${arrayTasks[0].category}</h2>
      <ul class="cards">
      ${separateTasks(arrayTasks).join('')}
      </ul>
    `;
  });
}

// separate each tasks within category
function separateTasks (tasks) {
  return tasks.map((task) => {
    return `
      <li class="card task" data-id="${task.id}">
        <header class="card-header" style="background-image: url(${task.image});">
          <span class="card-title">
            <h3>${task.title}</h3>
            <label>
              <input 
                class="task-completed"
                type="checkbox" 
                value="completed" 
                ${task.completed ? 'checked' : ''}
              > Completed 
            </label>
          </span>
        </header>
        <span class="card-buttons">
          <input class="task-view task-button" type="button" value="view">
          <input class="task-edit task-button" type="button" value="edit">
          <input class="task-delete task-button" type="button" value="delete">
        </span>
        <span class="card-summary">${task.content}</span>
        <span class="card-meta">
          Due: ${moment(task.date).format('MM/DD/YYYY')}, 
               ${moment(task.time, 'HH:mm').format('hh:mm A')}
        </span>
      </li>
    `;
  });
}

// after user logs in, display user's task(s)
function tasksScreen () {
  const categorizedTasks = store.categorizeTasks();

  const emptyTasks = () => {
    const searchInput = store.searchInput;
    store.searchInput = '';
    if (searchInput === '') {
      return `<h2>Currently no tasks, add some tasks!</h2>`;
    }
    return `<h2>no search found: ${searchInput}</h2>`;
  };

  const taskList = separateCategories(categorizedTasks);
  const taskPage = `
    <h2>Task Page</h2>
    <input class="task-add normal-button" type="button" value="Add Task">
    <input class="task-search" type="search" name="q"
      placeholder="Search for tasks..."
      aria-label="Search through tasks"
    >
    <input class="show-completed" id="show-completed" type="checkbox" 
      ${store.showCompleted ? "checked" : ""}
    >
    <label for="show-completed">Show Completed</label>
    
    <!-- The Modal -->
    <div id="myModal" class="modal">
      <p> task content will be in here!</p>
    </div>

    ${Object.keys(categorizedTasks).length === 0 ? emptyTasks() : taskList.join('')}
  `;
  return taskPage;
}

function singleTaskModal () {
  const task = store.toEditTask[0];

  return `
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>${task.title}</h2>
      </div>
      <div class="modal-body">
        <h2>Category: ${task.category}</h2>
        <img src=${task.image} height="300px" width="300px"
          onerror="this.onerror=null;this.src='./missing.jpeg';"
        >
        <p>${task.content}</p>
        <p> 
        Due: ${moment(task.date).format('MM/DD/YYYY')}, 
             ${moment(task.time, 'HH:mm').format('hh:mm A')}
        </p>
      </div>
      <div class="modal-footer">
        <input class="task-mail normal-button" type="button" value="Send to Email">
        <input class="return-home normal-button" type="button" value="Close">
      </div>
    </div>
  `;
}

// viewing an individual task
function singleTaskScreen () {
  const task = store.toEditTask[0];
  return `
    <h2>Title: ${task.title}</h2>
    <h2>Category: ${task.category}</h2>
    <img src=${task.image} height="300px" width="300px"
      onerror="this.onerror=null;this.src='./missing.jpeg';"
    >
    <p>${task.content}
    <h2>Date: ${moment(task.date).format('MM/DD/YYYY')}</h2>  
    <h2>Time: ${moment(task.time, 'HH:mm').format('hh:mm A')}</h2>
    <input class="task-mail normal-button" type="button" value="Send to Email">
    <input class="return-home normal-button" type="button" value="return home">
  `;
}

const render = () => {
  switch (store.screen) {
    case 'login':
      $('.container').html(loginSigninScreen());
      break;
    case 'tasks':
      $('.main-header').html(createNavBar());
      $('.container').html(tasksScreen());
      break;
    case 'create-task':
      $('.container').html(createTaskScreen());
      break;
    case 'view-task':
      $('#myModal').html(singleTaskModal());
      break;
    case 'edit-task':
      $('.container').html(editTaskScreen());
      break;
    default:
      console.log('ERROR');
  }
};
