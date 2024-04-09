import { Review } from '../../types/review';
import { formatRating } from '../utils/formatRating';


type ReviewProps = {
  review: Review;
};

export default function OneReview({review}: ReviewProps): JSX.Element {
  const {id, date, author: author, rating, comment} = review;
  return (
    <li className="reviews__item" key={id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={author.photo} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name"> {author.name} </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: formatRating(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{date}</time>
      </div>
    </li>
  );
}
