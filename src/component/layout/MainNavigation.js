import { Link, NavLink } from 'react-router-dom';
import './MainNavigation.scss';

const MainNavigation = () => {
  return (
    <header className="nav">
      <div className="nav__logo">
        <Link to={"/"}>Nicercy</Link>
      </div>
      <nav className="nav__links">
        <ul>
          <li>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "nav__links nav__links--active"
                  : "nav__links"
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "nav__links nav__links--active"
                  : "nav__links"
              }
              to="/signup"
            >
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;