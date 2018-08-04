// Store file to grab variables and data needed

const tasks = [];

const store = (function () {

  function addToTasks (task) {
    this.tasks = [task, ...this.tasks];
  }

  return {
    authToken: '',
    tasks,
    addToTasks,
    screen: 'login'
  };
}());

/* some test data
 * tasks: [{
      image: "123.png",
      category: "something2",
      _id: "5b543bd2b5c3581e333cfbe6",
      time: "2301-01-02T08:00:00.000Z",
      title: "something",
      content: "I was here",
      __v: 0
      },
      {
      image: "321.png",
      category: "something3",
      _id: "5b557804ebd3160aa48ea862",
      time: null,
      title: "something2",
      content: "I was not here",
      __v: 0
      },
      {
      image: "321.png",
      category: "something3",
      _id: "5b5579ae5105190b420af1cb",
      title: "something2",
      content: "I was not here",
      time: "2018-07-23T06:46:06.845Z",
      __v: 0
      }]
 */
