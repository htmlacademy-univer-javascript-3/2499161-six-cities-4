import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/main-screen/main-screen';
import { AppRoute, Status } from '../constants';
import FavoritesScreen from '../pages/favorites/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';
import OfferScreen from '../pages/offer/offer-screen';
import PrivateRoute from '../private-route/private-route';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';


type AppPageProps = {
  cardsNumber: number;
  offers: Offer[];
  reviews: Review[];
};

export default function App({cardsNumber, offers, reviews} : AppPageProps) : JSX.Element {
  const favorites = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen cardsNumber={cardsNumber} offers={offers} favorites={favorites}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute status={Status.Auth}>
              <FavoritesScreen favorites={favorites}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen reviews={reviews} favorites={favorites}/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}
