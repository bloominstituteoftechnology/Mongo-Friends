const validateRequestData = (req, res, next) => {
  const { firstName, lastName, age } = req.body;
  if (requiredDataExists(firstName, lastName, age, res) && validAge(age, res)){
    next();
  }
}

const requiredDataExists = (firstName, lastName, age, res) => {
  if(!firstName || !lastName || !age){
    res.status(400).json({ error: 'Please provide firstName, lastName and age for the friend.' });
    return false;
  }

  return true;
}

const validAge = (age, res) => {
  if (!validAgeRange(age) || isNaN(age)){
    res.status(400).json({ error: 'Age must be a number between 1 and 120.' });
    return false;
  }

  return true;
}

const validAgeRange = (age) => {
  if (age > 0 && age < 121){
    return true;
  }
  return false;
}

module.exports = {
  validateRequestData
}