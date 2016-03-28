var mongoose = require( 'mongoose' );
var Note = require("../app/models/note");

var mongoConnectionString = process.env.MONGOLAB_URI || 'mongodb://localhost/notes_app';
mongoose.connect(mongoConnectionString);

//
// get a collection of all existing notes
//

Note.find(function (err, notes) {
  if (err) return console.error(err);
  console.log("FOUND", notes.length, "NOTES TO BE DELETED")

  //
  // delete all items in the collection
  //

  Note.remove(notes, function (err) {
    if (err) return console.error(err);
    console.log("DELETED")

    //
    // add new note(s) to the collection
    //

    var seeds = [
      {title: 'Todo Yesterday', description: 'Something I needed to do yesterday (overdue).'},
      {title: 'Todo Today', description: 'Something I need to do today.'},
      {title: 'Todo Tomorrow', description: 'Something I can put off until tomorrow.'},
    ]

    Note.create(seeds, function (err, new_notes) {
      console.log(new_notes)

      mongoose.disconnect(); // close the connection, or else it will keep running, which is appropriate for when the web server runs, but not for a script like this.
    });

    // Note.collection.insert(seeds, onInsert);
    // function onInsert(err, docs){
    //   if (err) {
    //     // TODO: handle error
    //   } else {
    //     console.info('%d notes were successfully stored.', docs.length);
    //   }
    // }; NOTE: this works but skips assignment of timestamps...

    //var todo = new Note({title: 'Todo Today', description: 'Something I need to do today.'});
    //todo.save(function (err) {
    //  if (err) {
    //    console.log(err);
    //  } else {
    //    console.log('dooo itt!', todo.title);
    //  }
    //});
  });
});
