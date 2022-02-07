import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.development';
import useFetch from '../../hooks/useFetch';
import RecipeContext from '../../store/recipe-context';
import Bookmark from '../UI/Bookmark';
import Ingredients from './Ingredients';
import Methods from './Methods';
import './RecipeInfo.scss';

const RecipeInfo = () => {

  const recipeCtx = useContext(RecipeContext);
  const params = useParams(); // .recipeId
  const { REACT_APP_SPOONACULARKEY } = process.env;

  const { data: fetchedData } = useFetch(
    `https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${REACT_APP_SPOONACULARKEY}`,
    !recipeCtx.recipeItems
  );

  let selectedRecipe;
  if (recipeCtx.recipeItems) {
    const recipeList = recipeCtx.recipeItems.filter((item) => {
      if (item.id.toString() === params.recipeId) {
        console.log("recipe Fetched from context");
        return item;
      }
    });

    const similarRecipeList = recipeCtx.similarRecipeItems.filter((item) => {
      if (item.id.toString() === params.recipeId){
        console.log("similar recipe Fetched from context");
        return item
      }
    })

    if (recipeList.length > 0) {
      selectedRecipe = recipeList;
    } else {
      selectedRecipe = similarRecipeList;
    }
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
    console.log("Data fetched from api call");
  }

  return (
    <section className="recipeInfo">
      {!selectedRecipe && !fetchedData && (
        <div className="recipeInfo__noContent">
          <h1>No Recipe items found, please try again...</h1>
          <Link to={"/"}>Return To Home</Link>
        </div>
      )}
      {selectedRecipe && (
        <Fragment>
          <div className="recipeInfo__image" style={{ backgroundImage: `url(${selectedRecipe[0].image})` }}>
            <div className="recipeInfo__action">
              <Bookmark
                itemData={{
                  title: selectedRecipe[0].title,
                  id: selectedRecipe[0].id,
                  image: selectedRecipe[0].image,
                }}
                id={selectedRecipe[0].id}
                size={"5rem"}
              />
            </div>
          </div>
          <div className="recipeInfo__title">
            <h1>{selectedRecipe[0].title}</h1>
            <h3>Ready in: {selectedRecipe[0].readyIn} min</h3>
            <h3>Servings: {selectedRecipe[0].servings}</h3>
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