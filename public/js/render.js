// How our page would render
const render = (() => {

  // Here's our variable for our basic DOM
  const dom = () => {
    $('#main_content').html(
      `<ul class="card">
        <li class="card--content"></li>
        <li class="card--content"></li>
        <li class="card--content"></li>
        <li class="card--content"></li>
        <li class="card--content"></li>
        <li class="card--content"></li>
        <li class="card--content"></li>
        <li class="card--content"></li>
      </ul>`
    );
  };
  return {
    dom
  };
})();
