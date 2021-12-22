import { useNavigate } from "react-router-dom";
import AuthContext from '../../store/auth-context'; // React context
import useInput from '../../hooks/use-inputs'; // custom hook
import './AuthenticateForm.scss';
import ErrorModal from '../UI/ErrorModal';

const AuthenticateForm = (props) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState (props.isFormLogin);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const authCtx = useContext(AuthContext); 
  const {REACT_APP_APIKEY} = process.env;
  let history = useNavigate();
  
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
    setIsLoggedIn(!isLoggedIn);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setError(false);
    let url;

    if (isLoggedIn) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_APIKEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_APIKEY}`;
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
        history("/favourite");
        return res.json();
      } else {
        return res.json().then((data) => {
          let ErrorMessage = `${data.error.message} Please Try Again`;
          throw new Error(ErrorMessage);
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
      setErrorMessage(err.message);
      setError(true);
      console.log(err.message);
    });
  };

  return (
    <Fragment>
    {error && <ErrorModal errorMessage={errorMessage}/>}
    <div className="form" onSubmit={formSubmitHandler}>
      <h1>{isLoggedIn ? "Login" : "Sign Up"}</h1>
      <form className="form__inputItems">
        {!isLoggedIn && (
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
        <div className="form__input">
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
    </Fragment>
  );
};

export default AuthenticateForm;