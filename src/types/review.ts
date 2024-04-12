import { Author } from './author';

export type Review = {
  id: string;
  date: string;
  author: Author;
  comment: string;
  rating: number;
};
