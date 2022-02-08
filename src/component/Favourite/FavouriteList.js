import { useEffect, useContext } from "react";
import { auth } from "../../Firebase";
import FavouriteContext from "../../store/favourite-context";
import FavouriteItem from "./FavouriteItem";
import "./FavouriteList.scss";

const FavouriteList = () => {
  const favouriteCtx = useContext(FavouriteContext);
  const currentUser = auth.currentUser.uid;

  const onRemoveHandler = (itemId) => {
    favouriteCtx.removeItem(currentUser, itemId);
  };
  useEffect(() => {
    // fetch favourites list from firestore
    favouriteCtx.getFavouriteList(currentUser);
  }, []);

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
          />
        ))}
      </ul>
    </div>
  );
};

export default FavouriteList;