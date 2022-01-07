import { useNavigate } from 'react-router-dom';
import "./RecipeItems.scss";

const RecipeItems = (props) => {

  let navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/recipe-details/${props.id}`);
  };

  return (
    <li onClick={navigateHandler}>
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