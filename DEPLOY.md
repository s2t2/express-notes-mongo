# How to Deploy a Node app to Heroku from Scratch

This document describes the process of deploying a Node.js application to a production server hosted by Heroku.

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
heroku config:set KEY1=VALUE1 [KEY2=VALUE2 ...]
# heroku domains:add example.com
````

## Production Considerations

Modify `package.json` to include versions and deploy scripts, as necessary.

```` json
  ...
  "engines":{
    "node":"5.4.0",
    "npm":"3.3.12"
  },
  "scripts": {
    "start": "nodemon ./bin/www",
    "heroku-prebuild": "echo This runs before Heroku installs your dependencies.",
    "heroku-postbuild": "echo This runs after Heroku installs your dependencies."
  },
  ...
````

Add a `Procfile` to specify the command which will start the production web server.

```` sh
# Procfile
web: node ./bin/www
````

> Note, the Procfile invokes `node` instead of `nodemon`, the latter being used for local development only.

If using sessions, configure a different session store besides the  default MemoryStore because it is not production-safe.

Redeploy.

```` sh
git push heroku master
````
