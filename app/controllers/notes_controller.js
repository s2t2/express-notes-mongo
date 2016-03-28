var express = require('express');
var router = express.Router();

var Note = require("../models/note");

/* INDEX */

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

/* NEW (this must come above the show action or else express will think 'new' is the note :id). */

router.get('/notes/new', function(req, res, next) {
  res.render('notes/new', {
    title: 'Notes App!',
    page_title: 'Add a new Note'
  });
});

/* CREATE */

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

/* SHOW */

router.get('/notes/:id', function(req, res, next) {
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    if (err){
      console.log(err)
      res.redirect('/notes') //todo: flash a message
    } else {
      res.render('notes/show', {
        title: 'Notes App!',
        page_title: 'Note #'+note.id, // +' ('+note.title+')'
        note: note
      });
    };
  });
});

/* EDIT */

router.get('/notes/:id/edit', function(req, res, next) {
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    if (err){
      console.log(err)
      res.redirect('/notes') //todo: flash a message
    } else {
      console.log("EDITING A NOTE", note)
      res.render('notes/edit', {
        title: 'Notes App!',
        page_title: 'Edit Note #'+note.id, // +' ('+note.title+')'
        note: note
      });
    }
  });
});

/* UPDATE */

// router.put('/notes/:id', function(req, res, next) {
//   ...
// });

router.post('/notes/:id/update', function(req, res, next) {
  console.log("CATURED FORM DATA", req.body)
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    note.title = req.body.noteTitle
    note.description = req.body.noteDescription
    note.save(function(err, n) {
      if (err){
        console.log(err)
        res.redirect('/notes/'+note_id+'/edit') //todo: keep values and flash a message
      } else {
        console.log("UPDATED A NOTE", n)
        res.redirect('/notes/'+note_id) //todo: flash a message
      };
    });
  });
});

/* DESTROY */

// router.delete('/notes/:id', function(req, res, next) {
//   ...
// });

router.post('/notes/:id/destroy', function(req, res, next) {
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    note.remove( function(err, note) {
      res.redirect('/notes')
    });
  });
});

module.exports = router;
