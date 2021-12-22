import { useState } from "react";

const useInput = (validateInput) => {
  const [inputValue, setInputValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputIsValid = validateInput(inputValue);
  const inputError = !inputIsValid && inputTouched;

  const blurHandler = () => {
    setInputTouched(true);
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    inputError,
    blurHandler,
    inputChangeHandler,
  };
};

export default useInput;