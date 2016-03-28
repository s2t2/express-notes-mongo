var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
  {
    title : String,
    description : String
  },
  {
    timestamps: { // include timestamp attributes in the schema and automattically assign values on create and update, respectively
      createdAt: 'created_at', // rename from createdAt
      updatedAt: 'updated_at' // rename from updatedAt
    }
  }
);

module.exports = mongoose.model('Note', NoteSchema);
