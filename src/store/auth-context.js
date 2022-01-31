import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';
import { setDoc, doc } from "firebase/firestore";

const AuthContext = React.createContext({
  isLoggedIn: false,
  error: false,
  errorMessage: "",
  loading: false,
  login: () => {},
  signup: () => {},
  logout: () => {}
});

//wrapper component for providing context
export const AuthContextProvider = (props) => {

  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(null);
  let history = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const loginHandler = (loginDetails) => {
    const { userEmail, userPassword } = loginDetails;
    setError(false);
    
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setLoading(false);
        history(-1);
        console.log("user logged in as: " + userCredential.user.email);
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = errorCode;

        if (errorCode === "auth/invalid-email") {
          errorMessage = "Invalid/Wrong email please try again"
        }
        if (errorCode === "auth/user-not-found") {
          errorMessage = "Email not found"
        }
        if (errorCode === "auth/wrong-password") {
          errorMessage = "Invalid password please try again"
        }

        setLoading(false);
        setError(true);
        setErrorMessage(errorMessage)
        console.log(errorMessage);
      });
  };

  const registerHandler = (registerDetails) => {
    const {userEmail, userPassword, userFirstname, userLastname} = registerDetails;
    setError(false);

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((user) => {
        // create new doc in firestore for new user
        setDoc(doc(db, "users", user.user.uid),{
          Email: user.user.email,
            Firstname: userFirstname,
            Lastname: userLastname
        });

        setLoading(false);
        history("/");
        console.log("User Signed up");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = errorCode;

        if (errorCode === "auth/email-already-in-use") {
          errorMessage = "This Email account already exists"
        }
        if (errorCode === "auth/invalid-email") {
          errorMessage = "Email address is not valid"
        }
        if (errorCode === "auth/weak-password") {
          errorMessage = "Password is not strong enough"
        }

        setLoading(false);
        setError(true);
        setErrorMessage(errorMessage)
        console.log(errorMessage);
      });
  };

  const logoutHandler = async () => {
    await signOut(auth);
    console.log('User Logged Out')
  }

  const contextValue = {
    isLoggedIn: isLoggedin,
    error: error,
    errorMessage: errorMessage,
    loading: loading,
    login: loginHandler,
    signup: registerHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;