const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find();
    const currentUser = await User.findById(req.session.user._id);

    res.render('users/index.ejs', {
      allUsers,
      currentUser,
    });    

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);

    res.locals.userName = selectedUser.username;
    res.locals.userRecipes = selectedUser.pantry;

    res.render('users/show.ejs', {
        selectedUser,
    });

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;