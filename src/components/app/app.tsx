import Main from '../../pages/main-screen/main-screen.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Offer from '../../pages/offer-screen/offer-screen.tsx';
import Login from '../../pages/login-screen/login-screen.tsx';
import Favorites from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {useAppSelector} from '../../hooks/index.ts';
import NotFoundPage from '../../error/NotFound.tsx';
import Spinner from '../../pages/loading-screen/loading-screen.tsx';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.offers.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers.cityOffers);
  if (isOffersDataLoading) {
    return (
      <Spinner />
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
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path="offer/">
            <Route path=":id" element={<Offer offers={ offers } />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
