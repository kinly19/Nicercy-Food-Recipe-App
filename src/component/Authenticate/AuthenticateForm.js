import { useState, Fragment, useContext } from 'react';
import AuthContext from '../../store/auth-context'; // React context
import useInput from '../../hooks/use-inputs'; // custom hook
import ErrorModal from '../UI/ErrorModal';
import './AuthenticateForm.scss';

const AuthenticateForm = (props) => {
  
  const [isLogin, setisLogin] = useState (true);
  const authCtx = useContext(AuthContext); 
  const {REACT_APP_APIKEY} = process.env;
  
  // custom hook 
  const {
    inputValue: enteredFirstName, // store user input
    inputError: inputNameHasError,
    blurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
  } = useInput((inputValue) => inputValue.trim() !== ""); // validate input 

  const {
    inputValue: enteredLastName,
    inputError: enteredLastNameHasError,
    blurHandler: lastNameBlurHandler,
    inputChangeHandler: lastNameChangeHandler,
  } = useInput((inputValue) => inputValue.trim() !== "");

  const {
    inputValue: enteredEmail,
    inputError: enteredEmailHasError,
    blurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
  } = useInput((inputValue) => inputValue.includes("@"));

  const {
    inputValue: enteredPassword,
    inputError: enteredPasswordHasError,
    blurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
  } = useInput((inputValue) => inputValue.length >= 6);

  // style classes for errors
  const nameInputClass = inputNameHasError
    ? "form__input form__input--invalid"
    : "form__input";
  const lastnameInputClass = enteredLastNameHasError
    ? "form__input form__input--invalid"
    : "form__input";
  const emailInputClass = enteredEmailHasError
    ? "form__input form__input--invalid"
    : "form__input";
  const passwordInputClass = enteredPasswordHasError
    ? "form__input form__input--invalid"
    : "form__input";

  //handlers
  const showSignUpHandler = () => {
    setisLogin(!isLogin);
  };

  const userDetails = {
    userEmail: enteredEmail,
    userPassword: enteredPassword,
    userFirstname: enteredFirstName,
    userLastname: enteredLastName
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (isLogin) {
      authCtx.login(userDetails);
    } else {
      authCtx.signup(userDetails);
    }
  };

  return (
    <Fragment>
      {authCtx.error && <ErrorModal errorMessage={authCtx.errorMessage} />}
      <div className="form" onSubmit={formSubmitHandler}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form className="form__inputItems">
          {!isLogin && (
            <Fragment>
              <div className={nameInputClass}>
                <label htmlFor="text">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  required
                  value={enteredFirstName}
                  onBlur={nameBlurHandler}
                  onChange={nameChangeHandler}
                />
              </div>
              <div className={lastnameInputClass}>
                <label htmlFor="text">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  required
                  value={enteredLastName}
                  onBlur={lastNameBlurHandler}
                  onChange={lastNameChangeHandler}
                />
              </div>
            </Fragment>
          )}
          <div className={emailInputClass}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onBlur={emailBlurHandler}
              onChange={emailChangeHandler}
            />
          </div>
          <div className={passwordInputClass}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={enteredPassword}
              onBlur={passwordBlurHandler}
              onChange={passwordChangeHandler}
            />
          </div>
          <div className="form__btn">
            {isLogin && (
              <Fragment>
                <button>Login</button>
                <p>Or</p>
                <button className="light" onClick={showSignUpHandler}>Create Account</button>
              </Fragment>
            )}
            {!isLogin && (
              <Fragment>
                <button className='light'>Create Account</button>
                <button onClick={showSignUpHandler}>Cancel</button>
              </Fragment>
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AuthenticateForm;