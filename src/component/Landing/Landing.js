import { useContext, useEffect } from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import Loading from '../UI/Loading';
import ErrorModal from '../UI/ErrorModal';
import RecipeContext from '../../store/recipe-context';
import './Landing.scss';

const Landing = () => {
  const recipeCtx = useContext(RecipeContext);

  useEffect(() => {
    if (recipeCtx.recipeItems || recipeCtx.similarRecipeItems) {
      window.scroll({
        top: 1000,
        behavior: 'smooth'
      });
    }
  },[recipeCtx.recipeItems, recipeCtx.similarRecipeItems]);

  return (
    <section className="landing">
      <div className="landing__content">
        <div className="landing__header">
          <h1>Nicercy</h1>
          <h2>Cooking Made Easy</h2>
          <p>
            Search over thousands of recipes. Its so simple... even your kids
            can do it
          </p>
        </div>
        <div className="landing__form">
          <RecipeForm />
        </div>
      </div>
      {recipeCtx.Loading && <Loading align={"flex-start"} />}
      {recipeCtx.error && <ErrorModal errorMessage={recipeCtx.errorMessage} />}
    </section>
  );
};

export default Landing;