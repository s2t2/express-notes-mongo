# Notes App

## Contributing

### Installation

Install [npm](http://data-creative.info/posts/2015/07/18/how-to-set-up-a-mac-development-environment/#node) and [mongodb](http://data-creative.info/posts/2015/07/18/how-to-set-up-a-mac-development-environment/#mongodb).

Install source code.

```` sh
git clone git@github.com:s2t2/express-notes-mongo.git
cd express-notes-mongo/
````

Install npm package dependencies.

```` sh
npm install nodemon -g
npm install
````

Create and migrate and seed the database.

```` sh
node db/seeds.js
````

### Usage

Run local web server.

```` sh
DEBUG=notes_app:* npm start
````
