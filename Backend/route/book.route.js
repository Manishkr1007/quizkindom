import express from 'express';
import { createBook,getBooks } from '../controller/book.controller.js';

const router = express.Router();

router.post('/create', createBook);
router.get('/', getBooks);

export default router;
