import {Navigate} from 'react-router-dom';
import { Status } from '../../utils/constants';
import { AppRoute } from '../../utils/constants';

type PrivateRouteProps = {
  status: Status;
  children: JSX.Element;
};

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {status, children} = props;

  return (
    status === Status.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}
