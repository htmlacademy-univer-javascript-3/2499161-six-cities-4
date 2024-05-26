import {CardMemo} from '../card/card.tsx';
import {Place} from '../../types/offer.tsx';
import {filters} from '../../const/const.tsx';
import { memo } from 'react';


type CardsListProps = {
  citiesCards: Place[];
  sortType: string;
};

function CardsList({citiesCards, sortType}: CardsListProps): JSX.Element {
  let sortedCards = citiesCards;
  if (sortType) {
    switch (sortType) {
      case filters.LOW_TO_HIGH:
        sortedCards = [...citiesCards].sort((a, b) => a.price - b.price);
        break;
      case filters.HIGH_TO_LOW:
        sortedCards = [...citiesCards].sort((a, b) => b.price - a.price);
        break;
      case filters.TOP_RATED:
        sortedCards = [...citiesCards].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
    }
  }
  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedCards.map((place) => (
        <CardMemo key={place.id} {...place}/>
      ))}
    </div>
  );
}

export const CardsListMemo = memo(CardsList);
