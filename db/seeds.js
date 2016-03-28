var mongoose = require( 'mongoose' );
var Note = require("../app/models/note");

mongoose.connect('mongodb://localhost/notes');

var todo = new Note({
  title: 'Todo Today',
  description: 'Something I need to do today.'
});

todo.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('dooo itt!', todo.title);
  }

  mongoose.disconnect(); // close the connection, or else it will keep running, which is appropriate for when the web server runs, but not for a script like this.
});
