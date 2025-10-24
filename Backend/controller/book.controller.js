import Book from '../model/book.model.js';

export const createBook = async (req, res) => {
  try {
    const { bookId, name, url, price } = req.body;

    if (!name || !url || price === undefined) {
      return res.status(400).json({ message: 'name, url and price are required' });
    }

    if (bookId) {
      const existing = await Book.findOne({ bookId });
      if (existing) {
        return res.status(409).json({ message: 'Book with this id already exists' });
      }
    }

    const numPrice = Number(price);
    if (!Number.isFinite(numPrice) || numPrice < 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }

    const book = new Book({ bookId, name, url, price: numPrice });
    await book.save();

    res.status(201).json({ message: 'Book created', book });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } 
};
