import { useState, Fragment, useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context'; // React context
import './AuthenticateForm.scss';

const AuthenticateForm = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState (props.isFormLogin);
  const authCtx = useContext(AuthContext); 

  // store user inputs
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //handlers
  const showSignUpHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = !isLoggedIn && firstNameInputRef.current.value;
    const enteredLastName = !isLoggedIn && lastNameInputRef.current.value;

    const APIKEY = 'AIzaSyB87nsYgeUA8nQ6ZJl_XWYyYtnBnA-TEj8';
    let url;

    if (isLoggedIn) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
    }
    //api request
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'content-type' : 'application/json'
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let ErrorMessage = data.error.message
          throw new Error (ErrorMessage);
        });
      };
    })
    .then((data) => {
      console.log(data);
      console.log(`User signed in with Email: ${data.email} Is Registered: ${data.registered} idToken : ${data.idToken}`);
      //store token
      authCtx.login(data.idToken);
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  return (
    <div className="form" onSubmit={formSubmitHandler}>
      <h1>{isLoggedIn ? "Login" : "Sign Up"}</h1>
      <form className="form__inputItems">
        {!isLoggedIn && (
          <Fragment>
            <div className="form__input">
              <label htmlFor="text">First Name</label>
              <input type="text" id="firstname" required ref={firstNameInputRef}/>
            </div>
            <div className="form__input">
              <label htmlFor="text">Last Name</label>
              <input type="text" id="lastname" required ref={lastNameInputRef}/>
            </div>
          </Fragment>
        )}
        <div className="form__input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef}/>
        </div>
        <div className="form__input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required ref={passwordInputRef}/>
        </div>
        <div className="form__btn">
          {isLoggedIn && (
            <Fragment>
              <button>Login</button>
              <p>Or</p>
              <button onClick={showSignUpHandler}>Create Account</button>
            </Fragment>
          )}
          {!isLoggedIn && (
            <Fragment>
              <button>Create Account</button>
              <button onClick={showSignUpHandler}>Cancel</button>
            </Fragment>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthenticateForm;