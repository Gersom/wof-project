
import { NavLink } from "react-router-dom";
import routerNames from '@common/constants/routes'

const NotFound = () => {

  return (
    <div className="NotFound">
      <h1>Error 404</h1>
      <h2>{'/(ㄒoㄒ)/~~'}</h2>
      <p>We're sorry, the page you are looking for was not found.</p>
      <NavLink to={routerNames['home']}>
        <button className="">
        Go back to the Home</button></NavLink>
    </div>
  );
};

export default NotFound