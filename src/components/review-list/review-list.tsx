import {ReviewsMemo} from '../review/review.tsx';
import {Review} from '../../types/offer.tsx';

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewsList({ reviews }: ReviewListProps) {
  return (
    <div>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.slice(-10).reverse().map((item) => (
          <ReviewsMemo key={`${item.user.name}`} img={item.user.avatarUrl} name={item.user.name} text={item.comment} {...item}/>
        ))}
      </ul>
    </div>
  );
}

