import { useRef, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import RecipeContext from '../../store/recipe-context';
import "./RecipeForm.scss";

const RecipeForm = () => {

  const recipeCtx = useContext(RecipeContext)
  const searchInputRef = useRef();
  const formRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    const enteredInput = searchInputRef.current.value;
    recipeCtx.fetchSearchQuery(enteredInput);
    recipeCtx.clearList(); // clear array list   
    formRef.current.reset(); //reset input field
    console.log("Search recipe for:" + enteredInput);
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