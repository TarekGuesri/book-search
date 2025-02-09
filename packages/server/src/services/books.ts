import { Request, Response } from 'express';

export const getBooks = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  return res.json([]);
};
