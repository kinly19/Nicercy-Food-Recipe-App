import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Fragment, useContext, useEffect } from 'react';
import './App.scss';
import AuthContext from './store/auth-context';
import RecipeContext from './store/recipe-context';
import Home from './pages/Home';
import MainNavigation from './component/Layout/MainNavigation';
import Favourite from './pages/Favourite';
import AuthPage from './pages/AuthPage';
import RecipeDetails from './pages/RecipeDetails';
import Footer from './component/Layout/Footer';

function App() {
  const authCtx = useContext(AuthContext);
  const recipeCtx = useContext(RecipeContext);
  
  const pathName = useLocation();
  const isPathHome = pathName.pathname === '/';

  useEffect(() => {
    // scroll page to top
    if ((!recipeCtx.recipeItems && isPathHome) || !isPathHome) {
      window.scrollTo(0, 0);
    }
  }, [pathName]);
  
  return (
    <Fragment>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="/recipe-details" element={<RecipeDetails />}>
          <Route path=":recipeId" element={<RecipeDetails />} />
        </Route>
        {/* Protected routes */}
          {authCtx.isLoggedIn && <Route path="/favourite" element={<Favourite />} />}
          {!authCtx.isLoggedIn && <Route path="/favourite" element={<Navigate to="/auth" />}/>}
      </Routes>
      <Footer />
    </Fragment>
  );
}
export default App;
