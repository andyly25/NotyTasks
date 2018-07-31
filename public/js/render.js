// Similar to how our page would render
const res = [...Array(4)].map((_, i) => {
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

function loginSigninScreen () {
  return `
    <h2>Site introduction</h2>
    <p>some Image</p>
    <section class="login_signin">
      <form class='login_css login_form'>
        <fieldset>
          <legend>Login</legend>
          <ul class="flex-outer">
            <li>
              <label for="username">Username:</label>
              <input type="text" name="username" class="username_entry" value="" placeholder="Username here">
            </li>
            <li>
              <label for="password">Password:</label>
              <input type="password" name="password" class="password_entry" value="" placeholder="Password here">
            </li>
            <li>
              <button type="submit">Login</button>
            </li>
          </ul>
        </fieldset>
      </form>

      <form class='signup_css signup_form'>
        <fieldset>
        <legend>Sign Up</legend>
          <ul class="flex-outer">
            <li>
              <label for="first-name">First Name</label>
              <input type="text" class="firstName_entry" placeholder="Enter your first name here" value="someuser">
            </li>
            <li>
              <label for="last-name">Last Name</label>
              <input type="text" class="lastName_entry" placeholder="Enter your last name here" value="someuser">
            </li>
            <li>
              <label for="username">username</label>
              <input type="text" class="username_entry" placeholder="Enter your username here">
            </li>
            <li>
              <label for="password">password</label>
              <input type="password" class="password_entry" placeholder="Enter your password here" value="someuser">
            </li>
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </fieldset>
      </form>
    </section>
  `;
}

const form = {
  classes: "createtask-css createtask-form",
  legend: "Create Task",
  inputs: [
    {
      labelFor: "first-name",
      label: "First Name",
      type: "text",
      class: "firstName_entry",
      placeholder: "Enter your first name here"
    }
  ]
};

const createForm = (form) => {
  return `
    <form class="${form.classes}">
      <fieldset>
        <legend>${form.legend}</legend>
          <ul class="flex-outer">
          ${form.inputs.map(input => {
            return `
              <li>
                <label for="${input.labelFor}">${input.label}</label>
                <input type="text" class="firstName_entry" placeholder="Enter your first name here" value="someuser">
              </li>
            `
            })}
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </fieldset>
    </form>
  `;
};

console.log(createForm(form));

const render = (() => {

  const tasks = () => {
    // GOAL: try to grab all the content of a todo store into tasks
    // as well add HTML necessary
    $('.container').html(res);
  };

  // Here's our variable for our basic DOM
  const dom = () => {
    $('#main_content').html(
      `<div class="container">
        ${loginSigninScreen()}
      </div>`
    );
  };
  return {
    tasks,
    dom
  };
})();
