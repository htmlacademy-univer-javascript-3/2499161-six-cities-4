import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import Spinner from '../loading-screen/loading-screen.tsx';
import {logoutAction} from '../../api/api-action.ts';
import {updateUserLogin} from '../../store/action.ts';
import {AuthorizationStatus} from '../../types/offer.ts';
import {MouseEvent} from 'react';
import { Link } from 'react-router-dom';

export default function Header(): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.user.authorizationStatus);
  const isUserDataLoading = useAppSelector((state) => state.user.isUserDataLoading);
  const userLogin = useAppSelector((state) => state.user.userLogin);
  const favoritesCounter = useAppSelector((state) => state.favorites.favoritesCounter);
  const dispatch = useAppDispatch();
  if (isUserDataLoading) {
    return <Spinner />;
  }

  const handleLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
    dispatch(updateUserLogin(null));
  };

  let loginSection;
  let userSection;
  if (isAuthorized === AuthorizationStatus.Auth) {
    loginSection = (
      <li className="header__nav-item">
        <Link to="/login" onClick={handleLogout} >Sign out</Link>
      </li>
    );
    userSection = (
      <Link className="headernav-link headernav-link--profile" to="/favorites">
        <div className="headeravatar-wrapper useravatar-wrapper">
        </div>
        <span className="headeruser-name username">{userLogin}</span>
        <span className="header__favorite-count">{favoritesCounter}</span>
      </Link>
    );
  } else {
    loginSection = (
      <li className="header__nav-item">
        <Link to="/login" >Sign in</Link>
      </li>
    );
    userSection = (
      <Link className="headernav-link headernav-link--profile" to="/"></Link>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="headerlogo-link headerlogo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {userSection}
              </li>
              {loginSection}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
