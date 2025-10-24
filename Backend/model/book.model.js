import mongoose from 'mongoose';

// Generate a short unique id based on ObjectId
const defaultBookId = () => new mongoose.Types.ObjectId().toHexString();

const BookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true, default: defaultBookId },
  name: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', BookSchema);
export default Book;
