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
                  placeholder="${input.placeholder}">
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
    <section class="login_signin">
      ${createForm(loginForm)}
      ${createForm(signupForm)}
    </section>
  `;
}

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
