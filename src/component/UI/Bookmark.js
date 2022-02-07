import { useEffect, useState, useContext } from "react";
import { auth } from "../../Firebase";
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import FavouriteContext from "../../store/favourite-context";
import { useNavigate } from "react-router-dom";
import "./Bookmark.scss";

const Bookmark = (props) => {
  // Context
  const favouriteCtx = useContext(FavouriteContext);
  //states
  const [isFavourite, setIsFavourite] = useState(null);
  const favouriteItem = props.itemData;
  const currentUser = auth.currentUser?.uid;
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
      favouriteCtx.addItem(currentUser, favouriteItem);
    } else {
      setIsFavourite(false);
      favouriteCtx.removeItem(currentUser, favouriteItem.id);
    }

    if (!currentUser) {
      navigate(`/auth`);
    }
  };

  // SideEffects
  useEffect(() => {
    // Fetch data from firestore
    favouriteCtx.getFavouriteList(currentUser);
    // set state after first render
    setIsFavourite(hasFavourite);

    if (hasFavourite) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [hasFavourite]);

  return (
    <button
      className="bookmark"
      style={{ height: `${props.size}` }}
      onClick={bookmarkHandler}
    >
      <BsFillBookmarkHeartFill
        className="bookmark__icon"
        style={isFavourite ? { fill: "#ffc100" } : {}}
      />
    </button>
  );
};

export default Bookmark;