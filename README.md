# UserAuth App
This app signs in or signs up a user.

## Get Started
Assuming you have node and npm installed, if not you can look it up at https://nodejs.org/en/
```
npm install
```

## Create Database
This app uses MongoDB, if you dont have it installed, please reference https://docs.mongodb.com/manual/installation/.

Run below after installing Mongo

To start MongoDB
```
mongod
```

Then open new tab in terminal enter mongo shell

```
mongo
```

Now, create database user_app and collection users

```
use user_app
```

```
db.createCollection("users")
```

Once all the node modules are done installing, run

```
npm start
```

You can now view the app on localhost 3000 with the api proxy running on localhost 3001