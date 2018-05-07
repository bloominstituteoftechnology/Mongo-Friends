export const userMissingFieldError = {
  errorMessage: 'Please provide firstName, lastName and age for the friend.',
  status: 400
}
export const userInvalidAgeError = {
  errorMessage: 'Age must be a number between 1 and 120',
  status: 400
}
export const userCreationFailedError = {
  errorMessage: 'There was an error while saving the friend to the database.',
  status: 500
}
export const userRetrievalFailedError = {
  errorMessage: 'The friend information could not be retrieved.',
  status: 500
}
export const usersRetrievalFailedError = {
  errorMessage: 'The friends information could not be retrieved.',
  status: 500
}