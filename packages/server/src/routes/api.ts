import { Router } from 'express';

// Importing routes
import { booksRouter } from './api/books';

export const restRouter: Router = Router();

// Books
restRouter.use('/books', booksRouter);
