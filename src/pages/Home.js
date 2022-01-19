import { Fragment, useContext } from 'react';
import Landing from '../component/Landing/Landing';
import RecipeList from '../component/Recipe/RecipeList';
import RecipeContext from '../store/recipe-context';
import './Home.scss';

const Home = () => {
  const recipeCtx = useContext(RecipeContext);

  return (
    <main className="home">
      <Landing />
      {recipeCtx.recipeItems && recipeCtx.similarRecipeItems && (
        <Fragment>
          <RecipeList
            title={"Recipes For"}
            subTitle={recipeCtx.searchInputTitle}
            data={recipeCtx.recipeItems}
          />
          <RecipeList
            title={"Similar Recipes For"}
            subTitle={recipeCtx.searchInputTitle}
            data={recipeCtx.similarRecipeItems}
          />
        </Fragment>
      )}
    </main>
  );
};

export default Home;