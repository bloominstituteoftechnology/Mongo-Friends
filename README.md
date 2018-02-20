# Mongo I Project

## Topics

* Databases.
* MongoDB.
* Mongoose.
* Performing CRUD Operations.

## Assignment

Use Node.js, Express.js and Mongoose.js to build an API that persists data to a MongoDB database.

1. **Fork** and **Clone** this repository.
1. **CD into the folder** where you cloned the repository.
1. Type `yarn` or `npm install` to download all dependencies listed inside `package.json`.
1. Add code inside `server.js` and any other files you create in order to implement your API.
1. To start the server, type `yarn start` or `npm start`. The server will restart automatically as you make changes.
1. **Use _Postman_ to Test the API.**

### Create friend Schema

In a separate file, create a _Schema_ for the _friends_ collection. Each _friend_ document should conform to the following object structure:

```js
{
  firstName: "Jane", // String, required
  lastName: "Doe",  // String, required
  age: 18, // Number, required, should be an integer between 1 and 120
  createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
}
```

### Implement CRUD Endpoints

Configure the API to respond to the following routes:

| Method | Endpoint         | Description                                                                                                                         |
| ------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/friends     | Creates a friend using the information sent inside the `request body`.                                                              |
| GET    | /api/friends     | Returns an array of all the friend objects contained in the database.                                                               |
| GET    | /api/friends/:id | Returns the friend object with the specified id.                                                                                    |
| DELETE | /api/friends/:id | Removes the friend with the specified id and returns the deleted friend.                                                            |
| PUT    | /api/friends/:id | Updates the friend with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |

#### Endpoint Specifications

When the client makes a `POST` request to `/api/friends`:

* If the request body is missing the `firstName`, `lastName` or `age` property:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Please provide firstName, lastName and age for the friend." }`.

* If the value for `age` is not an integer or is less than 1 or more than 120:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Age must be a whole number between 1 and 120" }`.

* If the information about the _friend_ is valid:

  * save the new _friend_ the the database.
  * return HTTP status code `201` (Created).
  * return the newly created _friend document_.

* If there's an error while saving the _friend_:
  * cancel the request.
  * respond with HTTP status code `500` (Server Error).
  * return the following JSON object: `{ error: "There was an error while saving the friend to the database" }`.

When the client makes a `GET` request to `/api/friends`:

* If there's an error in retrieving the _friends_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ error: "The information could not be retrieved." }`.

When the client makes a `GET` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If there's an error in retrieving the _friend_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ error: "The information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If there's an error in removing the _friend_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ error: "The friend could not be removed" }`.

When the client makes a `PUT` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If the request body is missing the `firstName`, `lastName` or `age` property:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Please provide firstName, lastName and age for the friend." }`.

* If the value for `age` is not an integer or is less than 1 or more than 120:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Age must be a whole number between 1 and 120" }`.

* If there's an error when updating the _friend_:

  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ error: "The friend information could not be modified." }`.

* If the friend is found and the new information is valid:

  * update the friend document in the database using the new information sent in the `reques body`.
  * return HTTP status code `200` (OK).
  * return the newly updated _friend document_.

### Additional Notes

Remember to use `body-parser` to read information from the request body.

**Stop the MongoDB database server when not in use to save computer resources**.

## Stretch Problems

1. Implement a second collection called `BlogPosts`.
1. Define the schema however you see fit.
1. Implement all CRUD operations.
1. Add validation.
