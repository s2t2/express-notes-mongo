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

/* GET notes show page. */
router.get('/notes/:id', function(req, res, next) {
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    res.render('notes/show', {
      title: 'Notes App!',
      page_title: 'Note #'+note.id, // +' ('+note.title+')'
      note: note
    });
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
