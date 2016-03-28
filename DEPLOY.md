# How to Deploy this Node app to Heroku from Scratch

This document describes the process of deploying this Node.js application to a production server hosted by Heroku.

## Prerequisites

Download [heroku toolbelt](https://toolbelt.heroku.com/) to enable `heroku` command line tools.

```` sh
heroku login
cd ~/myapp
````

## Configuration

Create and configure a new heroku application.

```` sh
heroku create
heroku apps:rename new-app-name
# heroku domains:add example.com
````

Set environment variable(s). Setting `NODE_ENV` is technically unnecessary because heroku does it automatically during deploy.

```` sh
heroku config:set NODE_ENV=production SESSION_SECRET=s0m3l0ngstr1ng123456
````

## Production Considerations

Modify `package.json` to include versions and deploy scripts, as necessary. Find your versions with `node -v` and `npm -v`, respectively.

```` json
  ...
  "engines":{
    "node":"5.4.0",
    "npm":"3.3.12"
  },
  "scripts": {
    "start": "nodemon ./bin/www",
    "heroku-prebuild": "echo This runs before Heroku installs your dependencies.",
    "heroku-postbuild": "node db/seeds.js"
  },
  ...
````

Add a `Procfile` to specify the command which will start the production web server.

```` sh
# Procfile
web: node ./bin/www
````

> Note, the Procfile invokes `node` instead of `nodemon`, the latter being used for local development only.

If using sessions, configure a different session store (perhaps pg, redis, or mongo) besides the default `MemoryStore` because the latter it is not production-safe.

## Add-ons and Resources

### Mongo

Configure a production mongo database.

```` sh
heroku addons:create mongolab:sandbox
````

Configure the application to use the `MONGOLAB_URI` environment variable in production. Do this wherever you have specified `mongoose.connect()`.

```` js
// app.js
var mongoose = require('mongoose');
var mongoConnectionString = process.env.MONGOLAB_URI || 'mongodb://localhost/notes_app';
mongoose.connect(mongoConnectionString);
````

## Deploy

Deploy and/or redeploy.

```` sh
git push heroku master
````
