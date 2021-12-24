import { useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import "./RecipeForm.scss";

const RecipeForm = () => {

  const searchInputRef = useRef();
  const formRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredInput = searchInputRef.current.value;
    formRef.current.reset(); //reset input field
    console.log("Search recipe for:" + enteredInput);

    //run recipesContext fetch function/pass enteredInput as argument
  };

  return (
    <form onSubmit={formSubmitHandler} ref={formRef}>
      <div className="search">
        <div className="search__input">
          <input type="text" placeholder="Search Recipes..." required ref={searchInputRef}/>
        </div>
        <div className="search__button">
          <button>
            <FiSearch className="search__icon" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecipeForm; 