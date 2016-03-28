var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var Note = new Schema({
  title : String,
  description : String,
  updated_at : Date
});

mongoose.model( 'Note', Note );
mongoose.connect( 'mongodb://localhost/notes' );

module.exports = mongoose.model('Note', Schema);

/*


var todo = new Note({
  name: 'Zildjian'
});

todo.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('dooo itt!');
  }
});





new Note({
  title: req.body.name,
  description: req.body.description,
  updated_at : Date.now()
}).save( function( err, movie, count ) {
  res.redirect('/movies');
});

*/
