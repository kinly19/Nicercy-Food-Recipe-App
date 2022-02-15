import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FavouriteContext from "../../store/favourite-context";
import AuthContext from "../../store/auth-context";
import Loading from "../UI/Loading";
import FavouriteItem from "./FavouriteItem";
import "./FavouriteList.scss";

const FavouriteList = () => {
  const favouriteCtx = useContext(FavouriteContext);
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.currentUser;
  let navigate = useNavigate()

  const onRemoveHandler = (itemId) => {
    favouriteCtx.removeItem(itemId);
  };

  const onNavigateHandler = (itemId) => {
    navigate(`/recipe-details/${itemId}`);
  }

  useEffect(() => {
    // fetch favourites list from firestore
    favouriteCtx.getFavouriteList();
  }, [currentUser]);

  return (
    <div className="favourite">
      <h1 className="favourite__title">Favourite</h1>
      <p className="favourite__subTitle">Recipes</p>
      <ul className="favourite__list">
        {favouriteCtx.favouriteList.map((item) => (
          <FavouriteItem
            key={item.Id}
            title={item.Title}
            onRemove={() => onRemoveHandler(item.Id)}
            onNavigate={() => onNavigateHandler(item.Id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default FavouriteList;