// list elements for the basic forms (login, edit)
const liForm = (input) => {
  let inputValue = input.value;
  if (store.isEdit) {
    inputValue = input.value ? store.toEditTask[0][input.labelFor] : '';
  }

  const acceptImage = 'accept="image/*"';

  const required = ['username', 'password', 'title'];
  return `
    <li class="li-${input.class}">
      <label for="${input.labelFor}">${input.label}</label>
      <input 
        type="${input.type}" 
        name="${input.name}" 
        class="${input.class}" 
        ${input.labelFor === 'image' ? acceptImage : ''}
        placeholder="${input.placeholder}"
        value="${input.value ? inputValue : ''}"
        ${required.includes(input.labelFor) ? 'required' : ''}
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

// This is what I'll use to edit the input into textarea
function contentTextarea () {
  const content = store.toEditTask[0].content || '';
  return `
    <li>
      <label for="content">Content:</label>
      <textarea  
        name="content" 
        class="content-entry" 
        placeholder="Enter in your task content here"
        rows="10"
        value=""
        required
        >${content}</textarea>
    </li>
  `;
}

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
        <header class="card-header" 
                style="background-image: url(${task.image});" 
                role="banner"
        >
          <span class="card-title ${task.completed ? 'card-red' : 'card-green'}">
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
        <span class="card-summary">${store.textTruncate(task.content)}</span>
        <span class="card-meta">
          Due: ${moment(task.date).format('MM/DD/YYYY')}, 
               ${moment(task.time, 'HH:mm').format('hh:mm A')}
        </span>
      </li>
    `;
  });
}

// after user logs in, display user's task(s)
// where users can add, edit, delete, view their tasks
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
    <div class="task-inputs">
      <input class="task-search" type="search" name="q"
        placeholder="Search for tasks..."
        aria-label="Search through tasks"
      >
      <input class="show-completed" id="show-completed" type="checkbox" 
        ${store.showCompleted ? "checked" : ""}
      >
      <label for="show-completed">Show Completed</label>
      <input class="task-add normal-button" type="button" value="Add Task">
    </div>
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
    <div class="modal-content" role="section">
      <div class="modal-header ${task.completed ? 'card-red' : 'card-green'}">
        <span class="close">&times;</span>
        <h2>${task.title}</h2>
      </div>
      <div class="modal-body">
        <h2>Category: ${task.category}</h2>
        <img src=${task.image} 
          height="300px" width="300px"
          onerror="this.onerror=null;this.src='./missing.jpeg';"
          alt="${task.title} image"
        >
        <p>${task.content}</p>
        <p> 
        Due: ${moment(task.date).format('MM/DD/YYYY')}, 
             ${moment(task.time, 'HH:mm').format('hh:mm A')}
        </p>
      </div>
      <div class="modal-footer ${task.completed ? 'card-red' : 'card-green'}">
        <input class="task-mail normal-button" type="button" value="Send to Email">
      </div>
    </div>
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
      // change input content into textarea
      $('.li-content-entry').replaceWith(contentTextarea());
      break;
    case 'view-task':
      $('#myModal').html(singleTaskModal());
      break;
    case 'edit-task':
      $('.container').html(editTaskScreen());
      $('.li-content-entry').replaceWith(contentTextarea());
      break;
    default:
      console.log('ERROR');
  }
};
