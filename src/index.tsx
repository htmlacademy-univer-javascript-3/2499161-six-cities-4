import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enum Setting {
  cardsNumber = 300
}

root.render(
  <React.StrictMode>
    <App cardsNumber = {Setting.cardsNumber}/>
  </React.StrictMode>
);
