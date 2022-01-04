import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider} from './store/auth-context';
import { RecipeContextProvider } from './store/recipe-context';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
