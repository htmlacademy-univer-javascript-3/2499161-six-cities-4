import ScrollTop from './../utils/scroll-top';
import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import {AuthorizationStatus, Place} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {updateFavourite} from '../../api/api-cation.ts';
import {FavoritesStatus} from '../../consts/favorites-consts.ts';
import {updateFavoritesCounter} from '../../store/action.ts';

export default function Card(place: Place): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.user.authorizationStatus);
  const favoritesCounter = useAppSelector((state) => state.favorites.favoritesCounter);
  const [activeOfferId, setActiveOfferId] = useState('');
  const [isFavourite, setIsFavourite] = useState(place.isFavourite);
  const dispatch = useAppDispatch();
  function handleMouseOver() {
    if (place.onListItemHover) {
      place.onListItemHover(place.id);
    }
    setActiveOfferId(place.id);
  }
  function handleIsFavorite() {
    if (isFavourite) {
      dispatch(updateFavourite({
        id: place.id,
        status: FavoritesStatus.DELETE
      }));
      setIsFavourite(false);
      dispatch(updateFavoritesCounter(favoritesCounter - 1));
    } else {
      dispatch(updateFavourite({
        id: place.id,
        status: FavoritesStatus.ADD
      }));
      setIsFavourite(true);
      dispatch(updateFavoritesCounter(favoritesCounter + 1));
    }
  }
  const authorized = (isAuthorized === AuthorizationStatus.Auth) && (
    <button
      className={isFavourite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
      type="button" onClick={handleIsFavorite}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To Bookmarks</span>
    </button>
  );

  return (
    <article className="cities__card place-card" onMouseOver={handleMouseOver}>
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={place.img}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.valuePerNight}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {authorized}
          <button className={`place-card__bookmark-button ${
            place.isBookmarked ? 'place-card__bookmark-button--active' : ''
          } button`} type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{place.isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${place.rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <ScrollTop />
          <NavLink to={`/offer/${activeOfferId}`}>{place.name}</NavLink>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
}
