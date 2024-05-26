import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import Spinner from '../loading-screen/loading-screen.tsx';
import {logoutAction} from '../../api/api-action.ts';
import {updateUserLogin} from '../../store/action.ts';
import {AuthorizationStatus} from '../../types/offer.ts';
import {MouseEvent} from 'react';

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
        <a href="/login" onClick={handleLogout} >Sign out</a>
      </li>
    );
    userSection = (
      <a className="headernav-link headernav-link--profile" href="/favorites">
        <div className="headeravatar-wrapper useravatar-wrapper">
        </div>
        <span className="headeruser-name username">{userLogin}</span>
        <span className="header__favorite-count">{favoritesCounter}</span>
      </a>
    );
  } else {
    loginSection = (
      <li className="header__nav-item">
        <a href="/login" >Sign in</a>
      </li>
    );
    userSection = (
      <a className="headernav-link headernav-link--profile" href="#"></a>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="headerlogo-link headerlogo-link--active" href="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
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
