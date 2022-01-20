import { useRef, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useEffect } from 'react/cjs/react.development';
import RecipeContext from '../../store/recipe-context';
import "./RecipeForm.scss";

const RecipeForm = () => {

  const recipeCtx = useContext(RecipeContext)
  const searchInputRef = useRef();
  const formRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    const enteredInput = searchInputRef.current.value;
    recipeCtx.fetchSearchQuery(enteredInput)   
    formRef.current.reset(); //reset input field
    console.log("Search recipe for:" + enteredInput);

    //run recipesContext fetch function/pass enteredInput as argument
  };

  useEffect(() => {
    if (recipeCtx.recipeItems && recipeCtx.similarRecipeItems) {
      window.scroll({
        top: 1000,
        behavior: 'smooth'
      });
    }
  },[recipeCtx.recipeItems, recipeCtx.similarRecipeItems]);

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