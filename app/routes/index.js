var express = require('express');
var router = express.Router();

var Note = require("../models/note");

/* GET home page. */
router.get('/', function(req, res, next) {
  Note.find( function ( err, notes, count ) {
    res.render('index', {
      title: 'Notes App!',
      notes: notes
    });
  });
});

module.exports = router;
