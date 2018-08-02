const loginForm = {
  classes: 'login-css login-form',
  legend: 'login',
  inputs: [
    {
      labelFor: 'username',
      label: 'Username:',
      type: 'text',
      name: 'username',
      class: 'username-entry',
      placeholder: 'Username here'
    },
    {
      labelFor: 'password',
      label: 'Password:',
      type: 'password',
      name: 'password',
      class: 'password-entry',
      placeholder: 'Password here'
    }
  ]
};

const signupForm = {
  classes: 'signup-css signup-form',
  legend: 'Sign Up',
  inputs: [
    {
      labelFor: 'first-name',
      label: 'First Name:',
      type: 'text',
      name: 'first-name',
      class: 'firstName-entry',
      placeholder: 'Enter your first name here'
    },
    {
      labelFor: 'last-name',
      label: 'Last Name:',
      type: 'text',
      name: 'last-name',
      class: 'lastName-entry',
      placeholder: 'Enter your first name here'
    },
    {
      labelFor: 'username',
      label: 'Username:',
      type: 'text',
      name: 'username',
      class: 'username-entry',
      placeholder: 'Username here'
    },
    {
      labelFor: 'password',
      label: 'Password:',
      type: 'password',
      name: 'password',
      class: 'password-entry',
      placeholder: 'Password here'
    }
  ]
};

// create task form
// needs: title, image, content, time, category
// there might be a drop down menu for already created categories
const createtaskForm = {
  classes: 'createtask-css createtask-form',
  legend: 'Create Task',
  inputs: [
    {
      labelFor: 'title',
      label: 'Title:',
      type: 'text',
      name: 'title',
      class: 'title-entry',
      placeholder: 'Enter title of task'
    },
    {
      labelFor: 'image',
      label: 'Image:',
      type: 'text',
      name: 'image',
      class: 'image-entry',
      placeholder: 'Optional, enter image URL'
    },
    {
      labelFor: 'content',
      label: 'Content:',
      type: 'text',
      name: 'content',
      class: 'content-entry',
      placeholder: 'Text content here'
    },
    // datetime-local has limited support, best use date and time separately
    // {
    //   labelFor: 'task-date',
    //   label: 'Date:',
    //   type: 'date',
    //   name: 'task-date',
    //   class: 'date-entry',
    //   placeholder: ''
    // },
    {
      labelFor: 'time',
      label: 'Time:',
      type: 'time',
      name: 'time',
      class: 'time-entry',
      placeholder: ''
    },
    {
      labelFor: 'category',
      label: 'Category:',
      type: 'text',
      name: 'category',
      class: 'category-entry',
      placeholder: ''
    }
  ]
};
