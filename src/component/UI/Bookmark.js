import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import FavouriteContext from "../../store/favourite-context";
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import "./Bookmark.scss";

const Bookmark = (props) => {
  // Context
  const favouriteCtx = useContext(FavouriteContext);
  const authCtx = useContext(AuthContext);
  //states
  const [isFavourite, setIsFavourite] = useState(null);
  const favouriteItem = props.itemData;
  const currentUser = authCtx.currentUser;
  const selectedFavouriteItem = favouriteCtx.favouriteList.filter((item) => {
    if (item.Id === props.id) {
      return item;
    }
  });
  const hasFavourite = selectedFavouriteItem.length > 0;
  let navigate = useNavigate();

  // Handlers
  const bookmarkHandler = () => {
    if (currentUser && !isFavourite) {
      setIsFavourite(true);
      favouriteCtx.addItem(favouriteItem);
    } else {
      setIsFavourite(false);
      favouriteCtx.removeItem(favouriteItem.id);
    }

    if (!currentUser) {
      navigate(`/auth`);
    }
  };

  // SideEffects
  useEffect(() => {
    // Fetch data from firestore
    favouriteCtx.getFavouriteList();
    // set state after first render
    if (hasFavourite) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [hasFavourite, currentUser]);

  return (
    <button
      className="bookmark"
      style={{ height: `${props.size}` }}
      onClick={bookmarkHandler}
    >
      <BsFillBookmarkHeartFill
        className={isFavourite ? "bookmark__icon" : "bookmark__icon bookmark__icon--active"}
      />
    </button>
  );
};

export default Bookmark;