import "./RecipeItems.scss";

const RecipeItems = (props) => {
  return (
    <li>
      <div
        className="recipeItem"
        style={{ backgroundImage: `url(${props.backgroundUrl})` }}
      >
        <div className="recipeItem__text">
          <h2>{props.title}</h2>
          <p>{`${props.min} min | ${props.servings} Servings`}</p>
        </div>
      </div>
    </li>
  );
};

export default RecipeItems;