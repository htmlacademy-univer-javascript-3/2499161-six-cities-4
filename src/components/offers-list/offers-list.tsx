import { Offer } from '../../types/offer.ts';
import Card from '../card/card.tsx';

type CardsListProps = {
    offers: Offer[];
    listType: 'typical' | 'near';
};

export default function CardsList({ offers, listType }: CardsListProps) {
  return (
    <div
      className={`${listType === 'typical' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}
    >
      {offers.map((offer) => (
        <Card key={offer.id} offerInfo={offer} cardType={listType}/>
      ))}
    </div>
  );
}
