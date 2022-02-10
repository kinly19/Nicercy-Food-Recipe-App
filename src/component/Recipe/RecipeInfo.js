import { useContext, useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import RecipeContext from '../../store/recipe-context';
import Bookmark from '../UI/Bookmark';
import Ingredients from './Ingredients';
import Methods from './Methods';
import Loading from '../UI/Loading';
import './RecipeInfo.scss';

const RecipeInfo = () => {

  const recipeCtx = useContext(RecipeContext);
  const params = useParams(); // .recipeId
  const { REACT_APP_SPOONACULARKEY } = process.env;
  
  const [hasNoRecipe, setHasNoRecipe] = useState(null); 
  let selectedRecipe;

  const { data: fetchedData, isLoading: loading } = useFetch(
    `https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${REACT_APP_SPOONACULARKEY}`,
    hasNoRecipe
  );

  const recipeList = recipeCtx.recipeItems?.filter((item) => {
    if (item.id.toString() === params.recipeId) {
      console.log("recipe Fetched from context");
      return item;
    }
  });

  const similarRecipeList = recipeCtx.similarRecipeItems?.filter((item) => {
    if (item.id.toString() === params.recipeId) {
      console.log("similar recipe Fetched from context");
      return item;
    }
  });

  if (recipeList?.length > 0) {
    selectedRecipe = recipeList;
  }

  if (similarRecipeList?.length > 0) {
    selectedRecipe = similarRecipeList;
  }

  if (fetchedData) {
    selectedRecipe = [
      {
        id: fetchedData.id,
        title: fetchedData.title,
        image: fetchedData.image,
        readyIn: fetchedData.readyInMinutes,
        servings: fetchedData.servings,
        ingredients: fetchedData.extendedIngredients,
        instructions: fetchedData.analyzedInstructions,
      },
    ];
  }

  useEffect(() => {
    if (!selectedRecipe) {
      setHasNoRecipe(true);
      console.log("Data fetched from api");
    }
  }, [selectedRecipe]);

  const { image, title, id, readyIn, servings } = selectedRecipe?.[0] || {};

  const showNoContent = (
    <div className="recipeInfo__noContent">
      <h1>No Recipe items found, please try again...</h1>
      <Link to={"/"}>Return To Home</Link>
    </div>
  );

  const showLoading = (
    <div className="recipeInfo__loading">
      <h1>Fetching that delicious recipe...</h1>
      <Loading align={"center"} />
    </div>
  );

  return (
    <section className="recipeInfo">
      {loading && showLoading}
      {!selectedRecipe && !fetchedData && !loading && showNoContent}
      {selectedRecipe && (
        <Fragment>
          <div className="recipeInfo__image" style={{ backgroundImage: `url(${image})` }}>
            <div className="recipeInfo__action">
              <Bookmark
                itemData={{ title, id, image }}
                id={id}
                size={"5rem"}
              />
            </div>
          </div>
          <div className="recipeInfo__title">
            <h1>{title}</h1>
            <h3>Ready in: {readyIn} min</h3>
            <h3>Servings: {servings}</h3>
          </div>
          <div className="recipeInfo__content">
            <Ingredients data={selectedRecipe} />
            <Methods data={selectedRecipe} />
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default RecipeInfo;