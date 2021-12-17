import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

//wrapper component for providing context
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(false);
  const userIsLoggin = !!token; //true only if there is a token

  const loginHandler = () => {
    // setToken(token);
    console.log('User Logged In');
  };

  const logoutHandler = () => {
    console.log('User logged out!');
  };

  const contextValue = {
    isLoggedIn: userIsLoggin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;