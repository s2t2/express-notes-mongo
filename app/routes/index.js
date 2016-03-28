var express = require('express');
var router = express.Router();

var Note = require("../models/note");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("VISITED THE HOME PAGE")
  res.redirect('/notes')
});

/* GET notes index. */
router.get('/notes', function(req, res, next) {
  Note.find( function ( err, notes, count ) {
    console.log("FOUND", count, "NOTES")
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

module.exports = router;
