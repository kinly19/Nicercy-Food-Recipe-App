import { useNavigate } from 'react-router-dom';
import Bookmark from '../UI/Bookmark';
import "./RecipeItems.scss";

const RecipeItems = (props) => {
  // Hook
  let navigate = useNavigate();

  const favouriteItem = {
    title: props.title,
    id: props.id,
    image: props.backgroundUrl,
  };
  // Handlers
  const navigateHandler = () => {
    navigate(`/recipe-details/${props.id}`);
  };

  return (
    <li>
      <div
        className="recipeItem"
        style={{ backgroundImage: `url(${props.backgroundUrl})` }}
        onClick={navigateHandler}
      >
        <div className="recipeItem__text">
          <h2>{props.title}</h2>
          <p>{`${props.min} min | ${props.servings} Servings`}</p>
        </div>
      </div>
      <div className="action">
        <Bookmark itemData={favouriteItem} id={props.id} size={"3rem"} />
      </div>
    </li>
  );
};

export default RecipeItems;