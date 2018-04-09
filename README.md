# Mongo I Project

## Topics

* Databases.
* MongoDB.
* Mongoose.
* Performing CRUD Operations on Resources.

## Assignment

Use Node.js, Express.js and Mongoose.js to build an API that persists friend data to a MongoDB database.

### Software Requirements

For this project you need to have _MongoDB Community Edition_ installed and running. Having a local instance of _MongoDB_ running on your system is the preferred option.

Alternatively, you can sign up for an account from a _Database As A Service_ provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [mlab](https://mlab.com/). Both _DBAAS_ providers offer a free tier with 500MB size limit that can be used for development and testing.

#### Using a Local MongoDB Server

If you don't have MongoDB installed, please click on [this link](https://docs.mongodb.com/manual/administration/install-community/) for instructions on how to **install** and **run** the _Community Server_ and the _mongo shell_. Follow the instructions for your _Operating System_.

After MongoDB is installed, follow the instructions on the documentation to start the server. Then run the _mongo shell_ from a separate terminal and execute the `show dbs` command. If all goes well you should see a list of available databases, similar to the sample below.

```
 > show dbs
 admin  0.000GB
 local  0.000GB
```

### Getting the Starter Files

1.  **Fork** and **Clone** this repository.
1.  **CD into the folder** where you cloned the repository.
1.  Type `yarn` or `npm install` to download all dependencies listed inside `package.json`.
1.  To start the server, type `yarn start` or `npm start`. The server will restart automatically as you make changes.
1.  **Use _Postman_ to Test the API.**
1.  make a GET request to http://localhost:5000. The response should be the following JSON object:

```json
{
  "api": "running from Mongo-I"
}
```

### Create friend Schema and Model

In a separate file, create the _Schema_ and _Model_ for the _friends_ collection. Each _friend_ document should conform to the following object structure:

```js
{
  firstName: "Jane", // String, required
  lastName: "Doe",  // String, required
  age: 18, // Number, required, should be an integer between 1 and 120
  createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
}
```

### Implement CRUD Endpoints

Add code inside `server.js` and any other files you create in order to implement your API.

Configure the following API endpoints:

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

* If the value for `age` is not a number or it has a value that is less than 1 or more than 120:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Age must be a number between 1 and 120" }`.

* If the information about the _friend_ is valid:

  * save the new _friend_ the the database.
  * return HTTP status code `201` (Created).
  * return the **newly created** _friend document_.

* If there's an error while saving the _friend_:
  * cancel the request.
  * respond with HTTP status code `500` (Server Error).
  * return the following JSON object: `{ errorMessage: "There was an error while saving the friend to the database." }`.

When the client makes a `GET` request to `/api/friends`:

* If there's an error retrieving the _friends_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage: "The friends information could not be retrieved." }`.

- On success return status code `200` (OK) and the list of all friends contained in the friends collection.

When the client makes a `GET` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If there's an error in retrieving the _friend_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage: "The friend information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If there's an error in removing the _friend_ from the database:
  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage: "The friend could not be removed" }`.

When the client makes a `PUT` request to `/api/friends/:id`:

* If the _friend_ with the specified `id` is not found:

  * return HTTP status code `404` (Not Found).
  * return the following JSON object: `{ message: "The friend with the specified ID does not exist." }`.

* If the request body is missing the `firstName`, `lastName` or `age` property:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Please provide firstName, lastName and age for the friend." }`.

* If the value for `age` is not a number or it has a value that is less than 1 or more than 120:

  * cancel the request.
  * respond with HTTP status code `400` (Bad Request).
  * return the following JSON response: `{ errorMessage: "Age must be a number between 1 and 120" }`.

* If there's an error when updating the _friend_:

  * cancel the request.
  * respond with HTTP status code `500`.
  * return the following JSON object: `{ errorMessage: "The friend information could not be modified." }`.

* If the friend is found and the new information is valid:

  * update the friend document in the database using the new information sent in the `reques body`.
  * return HTTP status code `200` (OK).
  * return the newly updated _friend document_.

### Additional Notes

**Stop the MongoDB database server when not in use to save computer resources**.

## Stretch Problems

1.  Add a field called `contactInfo` to store all the contact information for the friend (email, mobile number, github username, facebook username, twitter handle, etc).
1.  Add a front end application.
