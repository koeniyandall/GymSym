const router = require('express').Router();
let User = require('../models/User');

// Get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new user
router.route('/add').post((req, res) => {
  const newUser = new User(req.body);

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a user by username
router.route('/:username').get((req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;