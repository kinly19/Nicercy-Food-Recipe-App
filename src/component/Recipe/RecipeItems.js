import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import FavouriteContext from '../../store/favourite-context';
import "./RecipeItems.scss";

const RecipeItems = (props) => {
  // Context
  const favouriteCtx = useContext(FavouriteContext);
  // Hook
  let navigate = useNavigate();
  // States
  const [isFavourite, setIsFavourite] = useState(null);
  const currentUser = auth.currentUser?.uid;
  const favouriteList = favouriteCtx.favouriteList.filter((item) => {
    if (item.Id === props.id) {
      return item;
    }
  });
  const hasItem = favouriteList.length > 0;

  // Handlers
  const navigateHandler = () => {
    navigate(`/recipe-details/${props.id}`);
  };

  const bookmarkHandler = () => {
    const favouriteItem = {
      title: props.title,
      id: props.id,
      image: props.backgroundUrl,
    };

    if (currentUser && !hasItem) {
      setIsFavourite(true);
      favouriteCtx.addItem(currentUser, favouriteItem);
      console.log("add item to favourite list");
    } else {
      setIsFavourite(false);
      favouriteCtx.removeItem(currentUser, favouriteItem.id);
      console.log("remove item from favourite list");
    }

    if (!currentUser) {
      navigate(`/auth`);
      console.log("please log in!");
    }
  };

  useEffect(() => {
    favouriteCtx.getFavouriteList(currentUser);
    setIsFavourite(hasItem);
    if (hasItem) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [isFavourite, hasItem]);

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