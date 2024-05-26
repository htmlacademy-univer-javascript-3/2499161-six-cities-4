import Header from '../header/header.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {useEffect} from 'react';
import Spinner from '../loading-screen/loading-screen.tsx';
import {fetchFavorites} from '../../api/api-action.ts';
import {constCities, filters} from '../../const/const.tsx';
import FavoritesCardList from '../../components/favorite-list/favorite-list.tsx';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites.tsx';

export default function Favourites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const favoritesCounter = useAppSelector((state) => state.favorites.favoritesCounter);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, favoritesCounter]);

  if (!favorites) {
    return <Spinner />;
  }

  const favouriteCities = constCities.map((city) => ({
    city,
    offers: favorites.filter((f) => f.city.name === city)
  })).filter((city) => city.offers.length > 0);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favouriteCities.length === 0 ? (
            <EmptyFavorites />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favouriteCities.map((item) => (
                  <li className="favorites__locations-items" key={item.city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{item.city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <FavoritesCardList
                        favoriteCards={item.offers.map((offer) => ({
                          ...offer,
                          image: offer.previewImage,
                          roomName: offer.title,
                          roomType: offer.type
                        }))}
                        sortType={filters.TOP_RATED}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
