import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch'; //custom fetch hook

const RecipeContext = React.createContext({
  error: false,
  errorMessage: "",
  Loading: false,
  recipeItems: [],
  similarRecipes: [],
  searchInputTitle: "",
  searchInputHandler: () => {},
})

export const RecipeContextProvider = (props) => { 
  // States
  const [recipeIds, setRecipeIds] = useState(null);
  const [recipeItems, setRecipeItems] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState(null);
  const [searchInput, setSearchInput] = useState(null);

  // Api key
  const {REACT_APP_SPOONACULARKEY} = process.env; 

  // Fetch ids
  const { data: fetchedIds, errorMessage, isError, isLoading } = useFetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_SPOONACULARKEY}&query=${searchInput}&number=1`,
    searchInput // is not null
  );
  // Fetch recipeItems
  const { data: fetchedRecipeItems } = useFetch(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${REACT_APP_SPOONACULARKEY}&ids=${recipeIds}&number=1`,
    recipeIds
  );

  // Handlers
  const fetchSearchQuery = (userInput) => {
    setSearchInput(userInput);
  }

  // Side Effects/Store data after fetch
  useEffect(() => {
    if (fetchedIds) {
      const recipeIdList = fetchedIds.results.map((item) => item.id);
      setRecipeIds(recipeIdList);
      console.log("Search input for fetch " + searchInput);
    }
  }, [fetchedIds]);

  useEffect(() => {
    if (fetchedRecipeItems) {
      setRecipeItems(
        fetchedRecipeItems.map((recipeItem) => {
          return {
            id: recipeItem.id,
            title: recipeItem.title,
            image: recipeItem.image,
            readyIn: recipeItem.readyInMinutes,
            servings: recipeItem.servings,
            ingredients: recipeItem.extendedIngredients,
            instructions: recipeItem.analyzedInstructions,
          };
        })
      );
    }
  }, [fetchedRecipeItems]);

  // testing purpose
  useEffect(() => {
    console.log("recipe ids for fetch request: " + recipeIds);
    console.log(recipeItems);
  }, [recipeIds, recipeItems]);

  // ContextValue
  const contextValue = {
    //states
    error: isError,
    errorMessage: errorMessage,
    Loading: isLoading,
    recipeItems: recipeItems,
    similarRecipes: similarRecipes,
    searchInputTitle: searchInput,
    //handler
    fetchSearchQuery: fetchSearchQuery,
  }

  return (
    <RecipeContext.Provider value={contextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;