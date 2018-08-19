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

// function separateCategories (obj) {
//   return _.map(obj, (arrayTasks) => {
//     return `
//       <h2>Category: ${arrayTasks[0].category}</h2>
//       <ul class="card">
//       ${separateTasks(arrayTasks).join('')}
//       </ul>
//     `;
//   });
// }

// function separateTasks (tasks) {
//   return tasks.map((task) => {
//     return `
//       <li class="card--content">
//         <div class="task" data-id="${task.id}">
//           <h2>${task.title}</h2>
//           <img src=${task.image} height="200px" width="200px"
//             onerror="this.onerror=null;this.src='./missing.jpeg';"
//           >
//           <p>Due: 
//             ${moment(task.date).format('MM/DD/YYYY')}, 
//             ${moment(task.time, 'HH:mm').format('hh:mm A')}
//           </p>
//           <input class="task-view task-button" type="button" value="view">
//           <input class="task-edit task-button" type="button" value="edit">
//           <input class="task-delete task-button" type="button" value="delete">
//           <label>
//             <input 
//               class="task-completed"
//               type="checkbox" 
//               value="completed" 
//               ${task.completed ? 'checked' : ''}
//             > Completed
//           </label>
//         </div>
//       </li>
//     `;
//   });
// }

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

function separateTasks (tasks) {
  return tasks.map((task) => {
    return `
      <li class="card">
      <span class="card-header" style="background-image: url(http://placeimg.com/400/200/animals);">
        <span class="card-title">
          <h3>This is a title for a card</h3>
        </span>
      </span>
      <span class="card-summary">
        A summary will also be present. Usually two to three brief sentences about the content on the detail page.
      </span>
      <span class="card-meta">
        Published: June 18th, 2015
      </span>
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
    <img src=${task.image} height="300px" width="300px"
      onerror="this.onerror=null;this.src='./missing.jpeg';"
    >
    <h2>Date: ${task.date}</h2> 
    <h2>Time: ${task.time}</h2>

    <input class="task-mail task-button" type="button" value="Send to Email">
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
