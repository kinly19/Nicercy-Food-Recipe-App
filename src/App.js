import { Route, Routes, Navigate} from 'react-router-dom';
import { Fragment, useContext } from 'react';
import './App.scss';
import AuthContext from './store/auth-context';
import Home from './pages/Home';
import MainNavigation from './component/Layout/MainNavigation';
import Favourite from './pages/Favourite';
import AuthPage from './pages/AuthPage';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  const authCtx = useContext(AuthContext);
  
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
    </Fragment>
  );
}
export default App;
