const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
    class:{
      type: String,
      enum: ['Appetizer', 'Entrée', 'Dessert', 'Starter'],
      required: true,
    },
    ingredients: [
        {
            type: String,
        }
    ],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  pantry: [foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;