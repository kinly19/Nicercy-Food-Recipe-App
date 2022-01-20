import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch'; //custom fetch hook

const RecipeContext = React.createContext({
  error: false,
  errorMessage: "",
  Loading: false,
  recipeItems: [],
  similarRecipeItems: [],
  searchInputTitle: "",
  searchInputHandler: () => {},
})

export const RecipeContextProvider = (props) => { 
  // States
  const [recipeIds, setRecipeIds] = useState(null);
  const [singleRecipeId, setSingleRecipeId] = useState(null)
  const [recipeItems, setRecipeItems] = useState(null);
  const [similarRecipeIds, setSimilarRecipeIds] = useState(null);
  const [similarRecipeItems, setSimilarRecipeItems] = useState(null)
  const [searchInput, setSearchInput] = useState(null);

  // Api key
  const {REACT_APP_SPOONACULARKEY} = process.env; 

  // Fetch ids
  const { data: fetchedIds, isError: idHasError, errorMessage: idErrMsg, isLoading: idIsLoading } = useFetch(
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_SPOONACULARKEY}&query=${searchInput}&number=1`,
    searchInput // is not null
  );
  // Fetch recipeItems
  const { data: fetchedRecipeItems, isError: recipeHasError, errorMessage: recipeErrMsg, isLoading: recipeIsLoading} = useFetch(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${REACT_APP_SPOONACULARKEY}&ids=${recipeIds}&number=1`,
    recipeIds
  );
  // Fetch ids for similar recipes
  const { data: fetchedSimilarIds } = useFetch(
    `https://api.spoonacular.com/recipes/${singleRecipeId}/similar?apiKey=${REACT_APP_SPOONACULARKEY}&number=1`,
    singleRecipeId
  );
  // Fetch recipe items for similar recipes
  const { data: fetchedSimilarRecipeItems } = useFetch(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${REACT_APP_SPOONACULARKEY}&ids=${similarRecipeIds}&number=1`,
    similarRecipeIds
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
      setSingleRecipeId(recipeIdList[0])
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

  useEffect(() => {
    if (fetchedSimilarIds) {
      setSimilarRecipeIds(fetchedSimilarIds.map((similarItems) => similarItems.id))
    }
  },[fetchedSimilarIds])

  useEffect(() => {
    if(fetchedSimilarRecipeItems){
      setSimilarRecipeItems(fetchedSimilarRecipeItems.map((recipeItem) => {
        return {
          id: recipeItem.id,
          title: recipeItem.title,
          image: recipeItem.image,
          readyIn: recipeItem.readyInMinutes,
          servings: recipeItem.servings,
          ingredients: recipeItem.extendedIngredients,
          instructions: recipeItem.analyzedInstructions,
        };
      }))
    }
  },[fetchedSimilarRecipeItems])

  // ContextValue
  const contextValue = {
    //states
    error: idHasError || recipeHasError,
    errorMessage: idErrMsg || recipeErrMsg,
    Loading: idIsLoading || recipeIsLoading,
    recipeItems: recipeItems,
    similarRecipeItems: similarRecipeItems,
    searchInputTitle: searchInput,
    //handler
    fetchSearchQuery: fetchSearchQuery,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;