// Similar to how our page would render

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

// will fill out eventually
function tasksScreen () {
  const taskList = store.tasks.map((task) => `
    <h2>${task.category}</h2>
    <img src="${task.image}">
    <ul class="card">
      <h3>${task.title}</h3>
      <li class="card--content">${task.content}</li>
    </ul>
    `);
  return taskList.join('');
}

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
    <p>some Image</p>
    <section class="task-screen">
      ${createForm(createtaskForm)}
    </section>
  `;
}

const render = (() => {
  // one possibility switch statements
  const screen = () => {
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
    }
  };
  return {
    screen
  };
})();
