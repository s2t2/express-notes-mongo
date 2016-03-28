var express = require('express');
var router = express.Router();

var Note = require("../models/note");

/* GET notes index. */
router.get('/notes', function(req, res, next) {
  Note.find( function (err, notes) {
    console.log("FOUND", notes.length, "NOTES")
    res.render('notes/index', {
      title: 'Notes App!',
      page_title: 'Notes',
      notes: notes
    });
  });
});

/* GET new note page (this must come above the show action or else express will think 'new' is the note :id). */
router.get('/notes/new', function(req, res, next) {
  res.render('notes/new', {
    title: 'Notes App!',
    page_title: 'Add a new Note'
  });
});

/* POST to create a new note. */
router.post('/notes/new', function(req, res, next) {
  console.log("CAPTURING FORM DATA:", req.body)
  var note = new Note({
    title: req.body.noteTitle,
    description: req.body.noteDescription
  })
  note.save(function(err, n) {
    if (err){
      console.log(err)
      res.redirect('/notes/new') //todo: keep values and flash a message
    } else {
      console.log("CREATED A NEW NOTE", n)
      res.redirect('/notes/'+n._id) //todo: flash a message
    };
  });
});

/* GET notes show page. */
router.get('/notes/:id', function(req, res, next) {
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    if (err){
      console.log(err)
      res.redirect('/notes') //todo: keep values and flash a message
    } else {
      res.render('notes/show', {
        title: 'Notes App!',
        page_title: 'Note #'+note.id, // +' ('+note.title+')'
        note: note
      });
    };
  });
});

/* DELETE a note. */
router.post('/notes/:id/destroy', function(req, res, next) {
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    note.remove( function(err, note) {
      res.redirect('/notes')
    });
  });
});

// router.delete('/notes/:id', function(req, res, next) {
//   var note_id = req.params.id
//   Note.findById(note_id, function(err, note) {
//     note.remove( function(err, note) {
//       res.redirect('/notes')
//     });
//   });
// }); // not able to trigger this.

module.exports = router;
