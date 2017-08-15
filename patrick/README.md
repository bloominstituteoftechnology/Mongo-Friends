# LS-Mongo-I

## Topics - OKAY √

* Databases
* Relational Databases
* Non-Relational Databases
* MongoDB
* Mongoose
* ORM
* `mongod`
* Mongoose.connect
* Mongoose.Schema
* Mongoose.model
* module.exports
* Model.find
* Model.findById
* Model.find().remove()
* .save
* Error first callback
* \_id

## Assignment

Download MongoDB.  https://www.mongodb.com/download-center - DONE √
Create a new folder and run `npm init` to create your `package.json` file. - DONE √
  ```console
  $  npm init
      This utility will walk you through creating a package.json file.
      It only covers the most common items, and tries to guess sensible defaults.

      See `npm help json` for definitive documentation on these fields
      and exactly what they do.

      Use `npm install <pkg>` afterwards to install a package and
      save it as a dependency in the package.json file.

      Press ^C at any time to quit.
      package name: (patrick) user-db
      version: (1.0.0)
      description: LS-Mongo-I Assignment
      entry point: index.js
      test command:
      git repository: https://github.com/mixelpixel/LS-Mongo-I.git
      keywords:
      author: Patrick Kennedy
      license: (ISC)
      About to write to /Users/mixelpix/Lambda-University/LS-Mongo-I/patrick/package.json:

      {
        "name": "user-db",
        "version": "1.0.0",
        "description": "LS-Mongo-I Assignment",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "start": "node server.js"
        },
        "repository": {
          "type": "git",
          "url": "git+https://github.com/mixelpixel/LS-Mongo-I.git"
        },
        "author": "Patrick Kennedy",
        "license": "ISC",
        "bugs": {
          "url": "https://github.com/mixelpixel/LS-Mongo-I/issues"
          },
          "homepage": "https://github.com/mixelpixel/LS-Mongo-I#readme"
        }

        Is this ok? (yes)
        5 mixelpix Tue Aug 15 01:41:25$  npm i --save express body-parser cors mongoose
        npm notice created a lockfile as package-lock.json. You should commit this file.
        + cors@2.8.4
        + body-parser@1.17.2
        + mongoose@4.11.7
        + express@4.15.4
        added 81 packages in 10.865s
  ```
Install npm packages: `npm i --save express body-parser cors mongoose` - DONE √
  ```console
  $  npm i --save express body-parser cors mongoose
      + body-parser@1.17.2
      + express@4.15.4
      + cors@2.8.4
      + mongoose@4.11.7
      updated 4 packages in 5.624s
  ```
Start your MongoDB server by running `mongod` from the command line. - OKAY √
  - not working
  - USING: `mongod --dbpath data` ?????
Implement the following routes but have them utilize a database to achieve data persistence.
* [POST] `/users` This route should save a new user to the server.
* [GET] `/users` This route will return an array of all users.
* [GET] `/users/:id` This route will return the user with the matching `id` (`_id` on the db document) property.
* [DELETE] `/users/:id` This route should delete the specified user.

## Extra Credit

Implement a second collection called `BlogPosts`.  Implement the following routes:
* [POST] `/posts` This route should save a new blog post to the server.
* [GET] `/posts` This route will return an array of all blog posts.
* [GET] `/posts/:id` This route will return the blog post with the matching `id` property.
* [DELETE] `/posts/:id` This route should delete the specified blog post.
Your user objects can take any form.
