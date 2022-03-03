import { Fragment, useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'
import AuthContext from '../../store/auth-context';
import RecipeContext from '../../store/recipe-context';
import './MainNavigation.scss';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const recipeCtx = useContext(RecipeContext)

  const [toggleMenu, setToggleMenu] = useState(false);
  
  const toggleNavHandler = () => {
    setToggleMenu(!toggleMenu);
  }

  const unToggleNavHandler = () => {
    setToggleMenu(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
    recipeCtx.clearList();
  }

  useEffect(() => {
    window.addEventListener("resize", unToggleNavHandler);
    window.addEventListener("scroll", unToggleNavHandler);

    return () => {
      window.removeEventListener("resize", unToggleNavHandler);
      window.removeEventListener("scroll", unToggleNavHandler);
    };
  }, []);

  const activeClass = navData => navData.isActive ? "nav__link nav__link--active" : "nav__link";

  const toggleClass = toggleMenu ? { maxHeight: "200px", opacity: "1" } : {};
 
  let navListItem = (
    <li className="nav__link" onClick={unToggleNavHandler}>
      <NavLink className={activeClass} to="/auth">
        Login
      </NavLink>
    </li>
  );

  if (authCtx.isLoggedIn) {
    navListItem = (
      <Fragment>
        <li className="nav__link" onClick={unToggleNavHandler}>
          <NavLink className={activeClass} to="/Favourite">
            Favourites
          </NavLink>
        </li>
        <li className="nav__link" onClick={unToggleNavHandler}>
          <NavLink className={activeClass} to="/" onClick={logoutHandler}>
            Logout
          </NavLink>
        </li>
      </Fragment>
    );
  }

  return (
    <header className="nav">
      <div className="nav__header">
        <Link to={"/"}>Nicercy</Link>
        <button className="nav__toggle" onClick={toggleNavHandler}>
          <FiMenu className="nav__toggleIcon" />
        </button>
      </div>
      <nav className="nav__links">
        <ul style={toggleClass}>{navListItem}</ul>
      </nav>
    </header>
  );
};

export default MainNavigation;