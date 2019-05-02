import mongoose from 'mongoose';

/**
 * Initialize schema for book model
 * Schema fields include
 *       --title
 *       --author
 *       --genre
 *       --summary
 *
 *       **timestamps**
 *       --created at [ datetime this book was created ]
 *       --updated at [ datetime this book was updated ]
 */
const bookSchema = new mongoose.Schema({
  title        : {type: String, required: true},
  author       : {type: String, required: true},
  genre        : {type: String, required: true},
  summary      : {type: String, default: ''},
}, {
  timestamps: true
});


/**
 * Build and export admin model from schema and schema methods
 */
const Book = mongoose.model('Book', bookSchema);
export default Book;