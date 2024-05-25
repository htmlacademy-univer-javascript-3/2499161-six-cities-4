import Main from '../../pages/main-screen/main-screen.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Offer from '../../pages/offer/offer-screen.tsx';
import Login from '../../pages/login-screen/login-screen.tsx';
import Favourites from '../../pages/favorites/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {useAppSelector} from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import NotFoundPage from '../../error/NotFound.tsx';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers);
  const cityOffers = useAppSelector((state) => state.cityOffers);
  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="favorites" element={
            <PrivateRoute>
              <Favourites favorites={offers} />
            </PrivateRoute>
          }
          />
          <Route path="offer/">
            <Route path=":id" element={<Offer offers={ cityOffers } />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
