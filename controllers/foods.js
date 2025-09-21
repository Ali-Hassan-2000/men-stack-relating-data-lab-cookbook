const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

/* -------------------------------------------------Routes-----------------------------------------------*/

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.locals.userName = currentUser.username; // used res.local
    res.locals.IsThereAnyPantry = currentUser.pantry.length; // check if the pantry is empty
    res.locals.message = "There are no items in this pantry.";

    res.render('foods/index.ejs', {
      foods: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  
    } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.pantry.id(req.params.foodId).deleteOne();
    
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  
} catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.locals.food = currentUser.pantry.id(req.params.foodId);
    
    res.render('foods/edit.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    food.set(req.body);
    
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/foods`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;