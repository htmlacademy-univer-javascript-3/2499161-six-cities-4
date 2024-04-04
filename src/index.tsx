import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mock/offers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enum Settings {
  cardsNumber = 300
}

root.render(
  <React.StrictMode>
    <App cardsNumber = {Settings.cardsNumber} offers = {offers} />
  </React.StrictMode>
);
