var express = require('express');
var router = express.Router();

var Note = require("../models/note");

/* INDEX */

router.get('/notes', function(req, res, next) {
  Note.find( function (err, notes) {
    console.log("FOUND", notes.length, "NOTES")
    res.render('notes/index', {
      page_title: 'Notes',
      notes: notes
    });
  });
});

/* NEW (this must come above the show action or else express will think 'new' is the note :id). */

router.get('/notes/new', function(req, res, next) {
  res.render('notes/new', {
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
      var error_messages = parseErrorMessages(err)
      req.flash('error', error_messages);
      res.render('notes/new', {
        page_title: 'Add a new Note',
        note: note
      })
    } else {
      console.log("CREATED A NEW NOTE", n)
      req.flash('success', 'Created note #'+n._id );
      res.redirect('/notes')
    };
  });
});

/* SHOW */

router.get('/notes/:id', function(req, res, next) {
  var note_id = req.params.id
  Note.findById(note_id, function(err, note) {
    if (err){
      console.log(err)
      var error_messages = parseErrorMessages(err)
      req.flash('error', error_messages);
      res.redirect('/notes')
    } else {
      res.render('notes/show', {
        page_title: 'Note #'+note.id,
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
      var error_messages = parseErrorMessages(err)
      req.flash('error', error_messages);
      res.redirect('/notes')
    } else {
      console.log("EDITING A NOTE", note)
      res.render('notes/edit', {
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
        var error_messages = parseErrorMessages(err)
        req.flash('error', error_messages);
        res.redirect('/notes/'+note_id+'/edit')
      } else {
        console.log("UPDATED A NOTE", n)
        req.flash('success', 'Updated note #'+n._id );
        res.redirect('/notes')
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
    note.remove( function(err, n) {
      req.flash('success', 'Deleted note #'+n._id );
      res.redirect('/notes')
    });
  });
});

/* HELPER FUNCTION(S) */

// Parse Error Messages from error object.
//
// @param [ValidationError] err A mongoose error like...
//
//  {
//    message: 'Note validation failed',
//    name: 'ValidationError',
//    errors:{
//      description:{
//        message: 'Path `description` is required.',
//        name: 'ValidatorError',
//        properties: [Object],
//        kind: 'required',
//        path: 'description',
//        value: ''
//      },
//      title:{
//        message: 'Path `title` is required.',
//        name: 'ValidatorError',
//        properties: [Object],
//        kind: 'required',
//        path: 'title',
//        value: ''
//      }
//    }
//  }
//
// ... or like ...
//
//  {
//    message: 'Cast to ObjectId failed for value "abc" at path "_id"',
//    name: 'CastError',
//    kind: 'ObjectId',
//    value: 'abc',
//    path: '_id',
//    reason: undefined
//  }
//
// @return [Array] error_messages
function parseErrorMessages(err){
  if (err.name == "ValidationError") {
    var errors = err.errors
    var error_messages = Object.keys(errors).map(function(k) {
      var error = errors[k]
      return error.name+': '+error.path+' is '+error.kind //> ValidatorError: description is required
    });
  } else if (err.name == "CastError") {
    var error_messages = ["Sorry, couldn't find a note with that identifier..."]
  } else {
    var error_messages = ["Oops, something unexpected has happened..."]
  };

  return error_messages //> ["ValidatorError: description is required", "ValidatorError: title is required"]
};

module.exports = router;
