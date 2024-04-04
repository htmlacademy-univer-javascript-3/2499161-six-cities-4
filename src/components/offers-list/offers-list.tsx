import { Offer } from '../../types/offer.ts';
import Card from '../card/card.tsx';

type CardsListProps = {
    offers: Offer[];
};

export default function CardsList({offers: citiesCards}: CardsListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {citiesCards.map((city) => (
        <Card key={city.id} offerInfo={city}/>
      ))}
    </div>
  );
}
