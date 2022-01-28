import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider} from './store/auth-context';
import { RecipeContextProvider } from './store/recipe-context';
import { FavouriteContextProvider } from './store/favourite-context';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RecipeContextProvider>
          <FavouriteContextProvider>
            <App />
          </FavouriteContextProvider>
        </RecipeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
