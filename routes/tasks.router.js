
const passport = require('passport');
const router = require('express').Router();
const taskController = require('../controllers/task.controller');

const jwtAuth = passport.authenticate('jwt', { session: false });

// fix this to work later
router.get('/', jwtAuth, taskController.getTasks);
router.post('/', jwtAuth, taskController.postTask);
router.post('/image', jwtAuth, taskController.uploadImage);
router.delete('/:id', jwtAuth, taskController.deleteTask);
router.put('/:id', jwtAuth, taskController.putTask);

module.exports = router;
