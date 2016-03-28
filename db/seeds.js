var mongoose = require( 'mongoose' );
var Note = require("../app/models/note");

mongoose.connect('mongodb://localhost/notes');

// get a collection of all existing notes

Note.find(function (err, notes) {
  if (err) return console.error(err);
  console.log("FOUND", notes.length, "NOTES TO BE DELETED")

  // delete all items in the collection

  Note.remove(notes, function (err) {
    if (err) return console.error(err);
    console.log("DELETED")

    // add new note(s) to the collection

    var todo = new Note({title: 'Todo Today', description: 'Something I need to do today.'});
    todo.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('dooo itt!', todo.title);
      }

      mongoose.disconnect(); // close the connection, or else it will keep running, which is appropriate for when the web server runs, but not for a script like this.
    });
  });
});
