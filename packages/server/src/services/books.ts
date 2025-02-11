import axios from 'axios';
import { Request, Response } from 'express';
import type { Book } from '@book-search/shared';
import { OpenLibraryBook, OpenLibraryResponse } from 'src/types';

export const getBooks = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  const { q, limit, page, sort } = _req.query;

  const { data } = await axios.get(
    `https://openlibrary.org/search.json?q=${q}&limit=${limit}&page=${page}&${
      sort ? `sort=${sort}&` : ''
    }fields=*,rating,olid,first_sentence`,
    {},
  );

  const books: Book[] = (data as OpenLibraryResponse).docs.map(
    (book: OpenLibraryBook) => ({
      id: book.key,
      title: book.title,
      author: book.author_name?.join(', ') || 'Unknown',
      publishedYear: book.first_publish_year,
      rating: book.ratings_average ? book.ratings_average.toFixed(1) : 'N/A',
      firstSentence:
        book.first_sentence && book.first_sentence.length > 0
          ? book.first_sentence[0]
          : 'N/A',
    }),
  );

  const rowCount = data.numFound;

  console.log({
    books,
    rowCount,
    url: `https://openlibrary.org/search.json?q=${q}&limit=${limit}&page=${page}&${
      sort ? `sort=${sort}&` : ''
    }fields=*,rating,olid,first_sentence`,
  });

  return res.json({
    data: books,
    rowCount,
  });
};
