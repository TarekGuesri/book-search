import { Router } from 'express';
import { getBooks } from '../../services/books';

export const booksRouter: Router = Router();

// @route GET books/
// @desc Gets books
// @access Public
booksRouter.get('/', getBooks);
