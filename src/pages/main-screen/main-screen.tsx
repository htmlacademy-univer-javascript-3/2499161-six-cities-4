import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import OffersList from '../../components/offers-list/offers-list';
import MapComponent from '../../components/map/map';

type MainScreenProps = {
  cardsNumber: number;
  offers: Offer[];
  favorites: Offer[];
};

export default function MainScreen({cardsNumber, offers, favorites}: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to="/profile" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <Link to="/favorites">
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <span className="header__signout">Sign out</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsNumber} places to stay in Amsterdam</b>
              <OffersList offers={offers} listType = {'typical'}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <MapComponent city={offers[0].city} points={offers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
