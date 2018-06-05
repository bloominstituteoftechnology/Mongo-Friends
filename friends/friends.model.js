const mongoose = require('mongoose');
const friendSchema = mongoose.Schema({
  firstName: { type: String, required: true }, // String, required
  lastName: { type: String, required: true }, // String, required
  age: {
    type: Number,
    required: true,
    validate: {
      validator: ageValidator,
      message: 'Age must be a number between 1 and 120',
    },
  }, // Number, required, should be an integer between 1 and 120
  createdOn: { type: Date, required: true, default: Date.now }, // Date, required, defaults to current date
});

function ageValidator(age) {
  return Nuber.isinteger(age) && 1 <= age <= 120 ? true : false;
}
module.exports = mongoose.model('friends', friendSchema);
