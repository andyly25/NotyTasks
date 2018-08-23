// Starting our app here!
$(() => {
  callEventListeners();
  render();
  handlers.showSlides(store.slideIndex);
});
