import Main from '../../pages/main-screen/main-screen.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from '../../error/NotFound.tsx';
import Offer from '../../pages/offer/offer-screen.tsx';
import Login from '../../pages/login-screen/login-screen.tsx';
import Favourites from '../../pages/favorites/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {OfferType} from '../../types/offer.tsx';

type AppProps = {
  offers: OfferType[];
}

export default function App ({offers}: AppProps){
  const favorites = offers.filter((o) => o.isFavorite);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<PrivateRoute><Favourites favorites={favorites}/></PrivateRoute>} />
        <Route path="offer/">
          <Route path=":id" element={<Offer offers={offers}/>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
