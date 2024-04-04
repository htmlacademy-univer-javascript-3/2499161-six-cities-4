import { City } from './city';
import { Author } from './author';

export type Offer = {
  'id': string;
  'previewImage': string;
  'title': string;
  'isPremium': boolean;
  'isFavorite': boolean;
  'type': string;
  'rating': number;
  'city': City;
  'numOfBedrooms': number;
  'numOfGuests': number;
  'price': number;
  'author': Author;
};
