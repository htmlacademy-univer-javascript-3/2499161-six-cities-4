import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div>
    <h1>404 Not Found</h1>
    <p>Страница отсутствует</p>
    <Link to="/">Вернуться назад</Link>
  </div>
);

export default NotFoundPage;
