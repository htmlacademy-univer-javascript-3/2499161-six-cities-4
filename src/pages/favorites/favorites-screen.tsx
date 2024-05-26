import {OfferType} from '../../types/offer.tsx';
import Header from '../header/header.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {useEffect} from 'react';
import Spinner from '../loading-screen/loading-screen.tsx';
import {fetchFavorites} from '../../api/api-cation.ts';
import {constCities, filters} from '../../consts/cities.tsx';
import FavouriteCardList from '../../components/favorite-list/favorite-list.tsx';

export default function Favorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const favoritesCounter = useAppSelector((state) => state.favorites.favoritesCounter);
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, favoritesCounter]);
  if (!favorites) {
    return <Spinner/>;
  }
  const favouriteCities: { city: string; offers: OfferType[] }[] = [];
  constCities.forEach((city) => favouriteCities.push({
    city: city,
    offers: favorites.filter((f) => f.city.name === city)
  }));
  const favoritesMap = favouriteCities.filter((city) => city.offers.length > 0);

  if (favoritesMap.length === 0) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">There will be your favorites</h1>
            </section>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {(favoritesMap).map((item) => (
                <li className="favorites__locations-items" key={item.city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{item.city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <FavouriteCardList favouriteCards={item.offers.map((item_) => ({...item_}))} sortType={filters.TOP_RATED}/>
                  </div>
                </li>
              ))}
            </ul>
          </section>
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
