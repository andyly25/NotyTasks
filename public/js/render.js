// How our page would render
const res = [...Array(4)].map((_, i) => {
  return `
      <ul class="card">
        <li class="card--content">something</li>
        <li class="card--content">was</li>
        <li class="card--content">here</li>
        <li class="card--content">test</li>
        <li class="card--content">text</li>
        <li class="card--content">k</li>
        <li class="card--content">apple</li>
        <li class="card--content">sauce</li>
      </ul>
  `;
});

const render = (() => {

  const tasks = () => {
    $('.card2').html(res);
  };

  // Here's our variable for our basic DOM
  const dom = () => {
    $('#main_content').html(
      `<div class="card2"></div>`
    );
  };
  return {
    tasks,
    dom
  };
})();
