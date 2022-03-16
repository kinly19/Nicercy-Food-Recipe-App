import { useContext, useEffect } from 'react';
import Landing from '../component/Landing/Landing';
import RecipeList from '../component/Recipe/RecipeList';
import RecipeContext from '../store/recipe-context';
import './Home.scss';

const Home = () => {
  const recipeCtx = useContext(RecipeContext);

  useEffect(() => {
    if (!recipeCtx.recipeItems){
      window.scrollTo(0,0);
    }
  },[])

  return (
    <main className="home">
      <Landing />
      {recipeCtx.recipeItems && (
        <RecipeList
          title={"Recipes For"}
          subTitle={recipeCtx.searchInputTitle}
          data={recipeCtx.recipeItems}
        />
      )}
      {recipeCtx.similarRecipeItems && (
        <RecipeList
          title={"Similar Recipes For"}
          subTitle={recipeCtx.searchInputTitle}
          data={recipeCtx.similarRecipeItems}
        />
      )}
    </main>
  );
};

export default Home;