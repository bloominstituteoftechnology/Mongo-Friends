const User = require('../models/User');
const getErrors = function(errors) {
  return Object.keys(errors).map((errKey) => {
    return errors[errKey].message;
  });
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    if (!users.length) throw new Error('No users in database');
    res.status(200).json(users);
    console.log(users);
  } catch(err) {
    res.status(500).json({
      error: err.message
    });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.body.id);
    if (!user) throw new Error('User not found');
    res.status(200).json(user);
  } catch(err) {
    
    res.status(500).json({
      error: err.message
    });
  }
}

async function addUser(req, res) {
  const { username, password } = req.body;
  const user = new User({username, password});
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
    console.log(newUser);
  } catch (err) {
    res.status(500).json({errors: getErrors(err.errors)});
  }
}

async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    const removedUser = await user.remove();
    res.status(200).json(removedUser);
  } catch(err) {
    res.status(500).json({error: err.message});
  }
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUserById
};