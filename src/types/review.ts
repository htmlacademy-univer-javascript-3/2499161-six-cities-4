import { Author } from './author';

export type Review = {
  id: string;
  date: string;
  user: Author;
  comment: string;
  rating: number;
};
