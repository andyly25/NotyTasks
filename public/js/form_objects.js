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
      placeholder: 'Username here',
      value: 'notytask@gmail.com'
    },
    {
      labelFor: 'password',
      label: 'Password:',
      type: 'password',
      name: 'password',
      class: 'password-entry',
      placeholder: 'Password here',
      value: 'someuser'
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
      type: 'email',
      name: 'username',
      class: 'username-entry',
      placeholder: 'Username in e-mail format: xxx@xxx.xxx'
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
      placeholder: 'Enter title of task',
      value: 'testing'
    },
    {
      labelFor: 'image',
      label: 'Image:',
      type: 'text',
      name: 'image',
      class: 'image-entry',
      placeholder: 'Optional, enter image URL',
      value: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg'
    },
    {
      labelFor: 'content',
      label: 'Content:',
      type: 'text',
      name: 'content',
      class: 'content-entry',
      placeholder: 'Text content here',
      value: 'testing'
    },
    // datetime-local has limited support, best use date and time separately
    {
      labelFor: 'date',
      label: 'Date:',
      type: 'date',
      name: 'date',
      class: 'date-entry',
      placeholder: '',
      value: moment().add(1, 'day').format('YYYY-MM-DD')
    },
    {
      labelFor: 'time',
      label: 'Time:',
      type: 'time',
      name: 'time',
      class: 'time-entry',
      placeholder: '',
      value: moment().format('HH:mm')
    },
    {
      labelFor: 'category',
      label: 'Category:',
      type: 'text',
      name: 'category',
      class: 'category-entry',
      placeholder: '',
      value: ''
    }
  ]
};
