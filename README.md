The Madams 💃🏼
======
This is The Madams API built using express.js


## Table of Contents
1. [Usage](https://github.com/vasilenka/madams-express#usage)
2. [Users Endpoint](https://github.com/vasilenka/madams-express#users-endpoint)
      * [Get all users](https://github.com/vasilenka/madams-express#get-all-users)
      * [Get single user data](https://github.com/vasilenka/madams-express#get-single-user-data)
      * [Create new user](https://github.com/vasilenka/madams-express#create-new-user)
      * [Update single user data](https://github.com/vasilenka/madams-express#update-single-user-data)
      * [Delete single user data](https://github.com/vasilenka/madams-express#delete-single-user-data)
3. [Projects Endpoint](https://github.com/vasilenka/madams-express#projects-endpoint)
      * [Get all projects](https://github.com/vasilenka/madams-express#get-all-projects)
      * [Get single project data](https://github.com/vasilenka/madams-express#get-single-project-data)
      * [Create new project](https://github.com/vasilenka/madams-express#create-new-project)
      * [Update single project data](https://github.com/vasilenka/madams-express#update-single-project-data)
      * [Delete single project data](https://github.com/vasilenka/madams-express#delete-single-project-data)
4. [Contributing to this repository](https://github.com/vasilenka/madams-express#contributing-to-this-repository)



# Usage
### Setup the app
1. Clone this repository to your local machine.
2. Open your terminal/console and run `npm install` or `yarn install` if you prefer using `yarn` to install all the project dependencies.

### Connecting to database
We are using mongodb atlas as development database, to get your own free cloud atlas, just go to [http://mongodb.com](https://www.mongodb.com "MongoDB Homepage").

After setting up your database, add new `nodemon.json` file on your root folder and copy the value in `nodemon.example.json` and add your database configuration value.

### Running the App
In your terminal, navigate to the the madams directory (if you are not in it already) and run the app using `npm run dev` or `yarn dev`. If everything's good, your app will running on [http://localhost:5000](http://localhost:5000 "localhost:5000")

`npm run dev` will start a nodemon server where the server will automatically reload when there's changes in your code. You can run `npm start` or `yarn start` if you want to start server without `nodemon`.



# Users Endpoint
### Get all users
To get all users stored in database, send `GET` request to `/users`
```
GET /users
```
This will response with object with key `message`, `count`, and `users` consist of an array of all users information stored in database.
```javascript
[
  message: String,
  count: Number, // The count of all users stored in database
  {
    _id: ObjectID,
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    role: Array of String,
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Get single user data
To get single user data, send `GET` request to `/users/:userId` with `userId` is the requested user id as request parameter.
```
GET /users/:userId
```
This request will response with an object consist of a single user data.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    role: Array of String,
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Create new user
To create new user, send `POST` request to `/users`.
```
POST /users
```
The endpoint expecting the follwoing values sent as json in the request:
```javascript
{
  username: String // required,
  email: String // required,
  firstName: String,
  lastName: String,
  password: String,
  role: Array of String
}
```
If the new user created, this request will send a response with an object consist of the user data that just been created.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    username: String,
    email: String,
    firstName: String,
    role: Array of String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Update single user data
To update single user data, send `PATCH` request to `/users/:userId` with `userId` is the requested user id as request parameter.
```
PATCH /users/:userId
```
You can send any of the following values as `JSON` to the endpoint:
```javascript
{
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  role: Array of String,
}
```
This request will response with `message` and an object consist of a the user that has been deleted.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Delete single user data
To delete single user data, send `DELETE` request to `/users/:userId` with `userId` is the requested user id as request parameter.
```
DELETE /users/:userId
```
This request will response with `message` and an object consist of a the user that has been deleted.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date,
  }
]
```



# Projects
### Get all projects
To get all projects stored in database, send `GET` request to `/projects`
```
GET /projects
```
This will response with object with key `message`, `count`, and `users` consist of an array of all users information stored in database.
```javascript
[
  message: String,
  count: Number, // The count of all projects stored in database
  {
    _id: ObjectID,
    name: String, // Project name
    teams: Array of Users, // Every team member that involved in the project
    tags: Array of String,
    startDate: Date, // The date the project officially started
    endDate: Date, // The date the project officially ended
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Get single project data
To get single project data, send `GET` request to `/projects/:projectId` with `projectId` is the requested project id as request parameter.
```
GET /users/:projectId
```
This request will response with an object consist of a single project data.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    name: String, // Project name
    teams: Array of Users, // Every team member that involved in the project
    tags: Array of String,
    startDate: Date, // The date the project officially started
    endDate: Date, // The date the project officially ended
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Create new project
To create new project, send `POST` request to `/projects`
```
POST /projects
```
The endpoint expecting the follwoing values sent as json in the request:
```javascript
{
  _id: ObjectID,
  name: String, // required
  teams: Array of Users,
  tags: Array of String,
  startDate: Date,
  endDate: Date,
}
```
If the new project successfully created, this request will send a response with an object consist of the project data that just been created.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    name: String, // Project name
    teams: Array of Users, // Every team member that involved in the project
    tags: Array of String,
    startDate: Date, // The date the project officially started
    endDate: Date, // The date the project officially ended
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Update single project data
To update single project data, send `PATCH` request to `/projects/:projectId` with `projectId` is the requested project id as request parameter.
```
PATCH /projects/:projectId
```
You can send any of the following values as `JSON` to the endpoint:
```javascript
{
  name: String, // Project name
  teams: Array of Users, // Every team member that involved in the project
  tags: Array of String,
  startDate: Date, // The date the project officially started
  endDate: Date, // The date the project officially ended
}
```
This request will response with `message` and an object consist of a the projects that has been updated.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    name: String, // Project name
    teams: Array of Users, // Every team member that involved in the project
    tags: Array of String,
    startDate: Date, // The date the project officially started
    endDate: Date, // The date the project officially ended
    createdAt: Date,
    updatedAt: Date,
  }
]
```

### Delete single project data
To delete single project data, send `DELETE` request to `/projects/:projectId` with `projectId` is the requested project's id as request parameter.
```
DELETE /projects/:projectId
```
This request will response with `message` and an object consist of a the project that has been deleted.
```javascript
[
  message: String,
  {
    _id: ObjectID,
    name: String, // Project name
    teams: Array of Users, // Every team member that involved in the project
    tags: Array of String,
    startDate: Date, // The date the project officially started
    endDate: Date, // The date the project officially ended
    createdAt: Date,
    updatedAt: Date,
  }
]
```



# Contributing to this repository
We'll be happy if you want to contribute to this projects. Just fork this repository and submit a pull request (PR).
If you find something wrong or you want to give us some feedback, don't be shy to file an issue.
