import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import Spinner from '../../pages/loading-screen/loading-screen';
import { AuthorizationStatus } from '../../types/offer';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const isUserDataLoading = useAppSelector((state) => state.user.isUserDataLoading);
  const isAuthorized = useAppSelector((state) => state.user.authorizationStatus);
  if (isUserDataLoading || isAuthorized === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  return isAuthorized === AuthorizationStatus.Auth ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
