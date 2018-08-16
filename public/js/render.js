
const createForm = (form) => {
  return `
    <form class="${form.classes}">
      <fieldset>
        <legend>${form.legend}</legend>
          <ul class="flex-outer">
          ${form.inputs.map((input) => {
            return `
              <li>
                <label for="${input.labelFor}">${input.label}</label>
                <input 
                  type="${input.type}" 
                  name="${input.name}" 
                  class="${input.class}" 
                  placeholder="${input.placeholder}"
                  value="${input.value ? input.value : ''}"
                  >
              </li>
            `;
            // .join('') removed the random commas between list elements
            }).join('')} 
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </fieldset>
    </form>
  `;
};

const createEditForm = (form) => {
  return `
    <form class="createtask-edit-css createtask-edit-form">
      <fieldset>
        <legend>${form.legend}</legend>
          <ul class="flex-outer">
          ${form.inputs.map((input) => {
            const inputLabel = input.labelFor;
            return `
              <li>
                <label for="${input.labelFor}">${input.label}</label>
                <input 
                  type="${input.type}" 
                  name="${input.name}" 
                  class="${input.class}" 
                  placeholder="${input.placeholder}"
                  value="${input.value ? store.toEditTask[0][inputLabel] : ''}"
                  >
              </li>
            `;
            // .join('') removed the random commas between list elements
            }).join('')} 
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </fieldset>
    </form>
  `;
};

function loginSigninScreen () {
  return `
    <h2>Site introduction</h2>
    <section class="login-signin">
      ${createForm(loginForm)}
      ${createForm(signupForm)}
    </section>
  `;
}

function createTaskScreen () {
  return `
    <h2>Task Screen</h2>
    <section class="task-screen">
      ${createForm(createtaskForm)}
    </section>
  `;
}

function editTaskScreen () {
  return `
    <h2>Edit Task Screen</h2>
    <section class="edit-task-screen">
      ${createEditForm(createtaskForm)}
    </section>
  `;
}

function separateCategories (obj) {
  return _.map(obj, (arrayTasks) => {
    return `
      <ul class="card">
      ${separateTasks(arrayTasks).join('')}
      </ul>
    `;
  });
}

function separateTasks (tasks) {
  return tasks.map((task) => {
    return `
      <li class="card--content">
        <div class="task" data-id="${task.id}">
          <h2>${task.category}</h2>
          <h3>${task.title}</h3>
          <p>${task.id}</p>
          <input class="task-view task-button" type="button" value="view">
          <input class="task-edit task-button" type="button" value="edit">
          <input class="task-delete task-button" type="button" value="delete">
          <label>
            <input 
              class="task-completed"
              type="checkbox" 
              value="completed" 
              ${task.completed ? 'checked' : ''}
            > Completed
          </label>
        </div>
      </li>
    `;
  });
}

function tasksScreen () {
  const categorizedTasks = store.categorizeTasks();
  console.log('categorizedTasks', categorizedTasks);

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
    <input class="task-add task-button" type="button" value="Add Task">
    <input class="user-logout task-button" type="button" value="Log Out">
    <input class="show-completed" id="show-completed" type="checkbox" 
      ${store.showCompleted ? "checked" : ""}
    >
    <label for="show-completed">Show Completed</label>
    <input class="task-search" type="search" name="q"
      placeholder="Search for tasks..."
      aria-label="Search through tasks"
    >
    ${Object.keys(categorizedTasks).length === 0 ? emptyTasks() : taskList.join('')}
  `;
  return taskPage;
}

function singleTaskScreen () {
  const task = store.toEditTask[0];
  return `
    <h2>Title: ${task.title}</h2>
    <h2>Category: ${task.category}</h2>
    <h2>Image: ${task.image}</h2>
    <h2>Date: Time: ${task.time}</h2>
  `;
}

const render = () => {
  switch (store.screen) {
    case 'login':
      $('.container').html(loginSigninScreen());
      break;
    case 'tasks':
      $('.container').html(tasksScreen());
      break;
    case 'create-task':
      $('.container').html(createTaskScreen());
      break;
    case 'view-task':
      $('.container').html(singleTaskScreen());
      break;
    case 'edit-task':
      $('.container').html(editTaskScreen());
      break;
    default:
      console.log('ERROR');
  }
};
