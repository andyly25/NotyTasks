// Store file to grab variables and data needed
const store = (function () {

  function addToTasks (task) {
    this.tasks = [task, ...this.tasks];
  }

  function addAllTasks (tasks) {
    this.tasks = tasks;
  }

  function findAndRemove (id) {
    this.tasks = this.tasks.filter(task => task._id != id);
  }

  return {
    authToken: '',
    tasks: [],
    addToTasks,
    addAllTasks,
    findAndRemove,
    screen: 'login'
  };
}());
