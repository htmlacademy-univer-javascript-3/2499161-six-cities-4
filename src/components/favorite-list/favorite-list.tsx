import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {useState} from 'react';
import {updateFavorite} from '../../api/api-action.ts';
import { FavoritesStatus } from '../../const/const.tsx';
import {updateFavoritesCounter} from '../../store/action.ts';
import {AuthorizationStatus, Place} from '../../types/offer.ts';
import ScrollTop from '../utils/scroll-top.tsx';
import {Link, NavLink} from 'react-router-dom';
import {filters, rareCard} from '../../const/const.tsx';

type FavoriteCardListProps = {
  favoriteCards: Place[];
  sortType: string;
}

const FavoriteCard = (props: Place) => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.user.authorizationStatus);
  const favoritesCounter = useAppSelector((state) => state.favorites.favoritesCounter);
  const [activeOfferId, setActiveOfferId] = useState('');
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  function handleMouseOver() {
    if (props.onListItemHover) {
      props.onListItemHover(props.id);
    }
    setActiveOfferId(props.id);
  }
  function handleIsFavorite() {
    if (isFavorite) {
      dispatch(updateFavorite({
        id: props.id,
        status: FavoritesStatus.DELETE
      }));
      setIsFavorite(false);
      dispatch(updateFavoritesCounter(favoritesCounter - 1));
    } else {
      dispatch(updateFavorite({
        id: props.id,
        status: FavoritesStatus.ADD
      }));
      setIsFavorite(true);
      dispatch(updateFavoritesCounter(favoritesCounter + 1));
    }
  }
  const authorized = (isAuthorized === AuthorizationStatus.Auth) && (
    <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
      type="button" onClick={handleIsFavorite}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To Bookmarks</span>
    </button>
  );
  return (
    <article className="favorites__card place-card" onMouseOver={handleMouseOver}>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="/">
          <img className="place-card__image" src={`${props.image}`} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {authorized}
        </div>
        {rareCard(props.rating)}
        <h2 className="place-card__name">
          <ScrollTop />
          <NavLink to={`/offer/${activeOfferId}`} >{props.roomType}</NavLink>
        </h2>
        <p className="place-card__type">{props.roomName}</p>
      </div>
    </article>
  );
};

const FavoriteCardList = ({favoriteCards: favoriteCards, sortType}: FavoriteCardListProps) => {
  let sortedCards = favoriteCards;
  if (sortType) {
    switch (sortType) {
      case filters.LOW_TO_HIGH:
        sortedCards = [...favoriteCards].sort((a, b) => a.price - b.price);
        break;
      case filters.HIGH_TO_LOW:
        sortedCards = [...favoriteCards].sort((a, b) => b.price - a.price);
        break;
      case filters.TOP_RATED:
        sortedCards = [...favoriteCards].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
    }
  }
  return (
    <div>
      {sortedCards.map((item) => (
        <FavoriteCard key={item.id} {...item}/>
      ))}
    </div>
  );
};

export default FavoriteCardList;
