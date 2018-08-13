// const emptyTaskObj = [{
//   title: '',
//   image: '',
//   content: '',
//   date: '',
//   time: '',
//   category: ''
// }];

// Store file to grab variables and data needed
const store = (function () {

  function addToTasks (task) {
    this.tasks = [task, ...this.tasks];
  }

  function addAllTasks (tasks) {
    this.tasks = tasks;
  }

  function findAndRemove (id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  function editTaskContent (id) {
    this.toEditTask = this.tasks.filter(task => task.id === id);
    this.toEditTask[0].date = moment(this.toEditTask[0].date).format('YYYY-MM-DD');
    this.toEditTask[0].time = moment(this.toEditTask[0].time, 'HH:mm').format('HH:mm');
  }

  function updateTask (updatedTask) {
    this.tasks = this.tasks.map((task) => {
      if (updatedTask.id === task.id) {
        return updatedTask;
      }
      return task;
    });
  }

  function categorizeTasks () {
    return _.groupBy(this.tasks, 'category');
  }

  function isLogged () {
    this.loggedIn = !this.loggedIn;
  }

  return {
    authToken: '',
    loggedIn: false,
    isLogged,
    tasks: [],
    taskId: '',
    toEditTask: [],
    addToTasks,
    addAllTasks,
    findAndRemove,
    editTaskContent,
    updateTask,
    categorizeTasks,
    screen: 'login'
  };
}());
