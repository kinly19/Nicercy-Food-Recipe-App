import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../Firebase'; 
import React, { useContext, useState } from 'react';
import AuthContext from './auth-context';

const FavouriteContext = React.createContext({
  favouriteList: [],
  isLoading: false,
  getFavouriteList: () => {},
  addItem: () => {},
  removeItem: () => {},
})
 
export const FavouriteContextProvider = (props) => {
// Context
  const authCtx = useContext(AuthContext);
  const currentUserId = authCtx.currentUser;
// State
  const [favourite, setFavourite] = useState([]);
  const [loading, setIsloading] = useState(false);

  const getFavouriteListHandler = async () => {
    const favList = [];
    setIsloading(true);
    if (currentUserId) {
      const snapshot = await getDocs(
        collection(db, "users", currentUserId, "Favourite")
      );
      snapshot.forEach((doc) => {
        favList.push(doc.data());
      });
      setFavourite(favList);
    } else {
      console.log("No user found");
    }
    setIsloading(false);
  };

  const addToFavouriteListHandler = async (item) => {
    try {
      await setDoc(doc(db, "users", currentUserId, "Favourite", `${item.id}`), {
        Title: item.title,
        Id: item.id,
        Image: item.image,
      });
      getFavouriteListHandler();
      console.log("Items added to list: ", item.id);
    } catch {
      console.log("failed to add item to list");
    }
  };

  const removeFromFavouriteHandler = async (itemId) => {
    try {
      await deleteDoc(doc(db, "users", currentUserId, "Favourite", `${itemId}`));
      console.log("Item deleted: ", itemId);
      getFavouriteListHandler();
    } catch {
      console.log("Failed to delete item: ", itemId);
    }
  };

  const contextValue = {
    favouriteList: favourite,
    isLoading: loading,
    getFavouriteList: getFavouriteListHandler,
    addItem: addToFavouriteListHandler,
    removeItem: removeFromFavouriteHandler,
  };

  return (
    <FavouriteContext.Provider value={contextValue}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContext; 