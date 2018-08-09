// Similar to how our page would render
const sampleDisplay = [...Array(4)].map((_, i) => {
  return `  
    <h2>Some Category</h2>  
    <ul class="card"> 
      <li class="card--content"><a href="#">Hello</a> something</li>  
      <li class="card--content"><a href="#">Hello</a> was</li>  
      <li class="card--content"><a href="#">Hello</a> here</li> 
      <li class="card--content"><a href="#">Hello</a> test</li> 
      <li class="card--content"><a href="#">Hello</a> text</li> 
      <li class="card--content"><a href="#">Hello</a> k</li>  
      <li class="card--content"><a href="#">Hello</a> apple</li>  
      <li class="card--content"><a href="#">Hello</a> sauce</li>  
    </ul> 
  `;
});

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

function loginSigninScreen () {
  return `
    <h2>Site introduction</h2>
    <p>some Image</p>
    <section class="login-signin">
      ${createForm(loginForm)}
      ${createForm(signupForm)}
    </section>
  `;
}

function createTaskScreen () {
  console.log('task screen yay!');
  return `
    <h2>Task Screen</h2>
    <section class="task-screen">
      ${createForm(createtaskForm)}
    </section>
  `;
}

function editTaskScreen () {
  console.log('task screen yay!');
  return `
    <h2>Edit Task Screen</h2>
    <section class="edit-task-screen">
      ${createForm(createtaskForm)}
    </section>
  `;
}

function tasksScreen () {
  const taskList = store.tasks.map((task) => `
    <div class="task" data-id="${task._id}">
      <h2>${task.category}</h2>
      <h3>${task.title}</h3>
      <p>${task._id}</p>
      <input class="task-delete" type="button" value="delete">
      <input class="task-edit" type="button" value="edit">
    </div>
    `);
  const taskPage = `
    <h2>Task Page</h2>
    <input class="task-add" type="button" value="Add Task">
    ${taskList.join('')}
  `;
  return taskPage;
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
    case 'edit-task':
      $('.container').html(editTaskScreen());
      break;
    default:
      console.log('ERROR');
  }
};
