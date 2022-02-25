import { useContext, useEffect, Fragment } from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import Loading from '../UI/Loading';
import ErrorModal from '../UI/ErrorModal';
import RecipeContext from '../../store/recipe-context';
import './Landing.scss';

const Landing = () => {
  const recipeCtx = useContext(RecipeContext);
  const showLoading = recipeCtx.Loading && <Loading align={"flex-start"}/>
  const showError = recipeCtx.error && <ErrorModal errorMessage={recipeCtx.errorMessage} />

  useEffect(() => {
    if (recipeCtx.recipeItems || recipeCtx.similarRecipeItems) {
      window.scroll({
        top: 1000,
        behavior: 'smooth'
      });
    }
  },[recipeCtx.recipeItems, recipeCtx.similarRecipeItems]);

  return (
    <Fragment>
      {showError}
      <section className="landing">
        <div className="landing__content">
          <div className="landing__header">
            <h1>Nicercy</h1>
            <h2>Cooking Made Easy</h2>
            <p>
              Search over thousands of recipes. Its so simple... even your kids
              can do it
            </p>
            <RecipeForm />
          </div>
          {showLoading}
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;