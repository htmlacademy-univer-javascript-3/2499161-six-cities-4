import { Review } from '../../types/review.ts';
import OneReview from '../review/review.tsx';

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <OneReview key={review.id} review={review}/>
      ))}
    </ul>
  );
}
