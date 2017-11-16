module.exports = {
  /* *** Error Status *** */
  userError: 422,
  notFound: 404,
  serverError: 500,
  notLoggedIn: 401,
  
  /* *** Success Status *** */
  success: 200,
  successCreated: 201,
  
  /* *** Error Message *** */
  UserErrorMessage: { error: 'Something wrong with user submission.' },
  userNotFoundMessage: { error: 'couldn\'t find the requested user.' },
  serverErrorMessage: { error: 'Something went wrong with the server.' },
  notLoggedInMessage: { error: 'There is no user logged in.' },
  postNotFoundMessage: { error: 'couldn\'t find the requested post.' },
};