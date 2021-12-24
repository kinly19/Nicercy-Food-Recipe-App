import { useState, Fragment } from "react";
import "./ErrorModal.scss";

const ErrorModal = (props) => {
  const [showErrorModal, setShowErrorModal] = useState(true);

  const closeErrorModalHandler = () => {
    setShowErrorModal(false);
  };

  return (
    <Fragment>
      {showErrorModal && (
        <div className="error">
          <div className="error__message">
            <p>{props.errorMessage}</p>
            <button onClick={closeErrorModalHandler}>OK</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ErrorModal;
