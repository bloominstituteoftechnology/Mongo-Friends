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
export const userRetrievalIdError = {
  errorMessage: 'The friend with the specified ID does not exist.',
  status: 404
}
export const userRetrievalFailedError = {
  errorMessage: 'The friend information could not be retrieved.',
  status: 500
}
export const usersRetrievalFailedError = {
  errorMessage: 'The friends information could not be retrieved.',
  status: 500
}
export const userDeletionIdError = {
  errorMessage: 'The friend with the specified ID does not exist.',
  status: 404
}
export const userDeletionFailedError = {
  errorMessage: 'The friend could not be removed',
  status: 500
}
export const userUpdateIdError = {
  errorMessage: 'The friend with the specified ID does not exist.',
  status: 404
}
export const userUpdateFailedError = {
  errorMessage: 'The friend information could not be modified.',
  status: 500
}