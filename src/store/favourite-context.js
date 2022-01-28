import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase'; 
import React, { useState } from 'react';

const FavouriteContext = React.createContext({
  favouriteList: [],
  getFavouriteList: () => {},
  addItem: () => {},
  removeItem: () => {},
})
 
export const FavouriteContextProvider = (props) => {
// State
  const [favourite, setFavourite] = useState([]);

// Handlers
  const getFavouriteListHandler = async (userId) => {
    // get data from firestore
    const snapshot = await getDoc(collection(db, "users", userId, "Favourite"));

    snapshot.forEach((doc) => {
      setFavourite((prevState) => [...prevState, doc.data()]);
    });

    console.log(favourite);
  };

  const addToFavouriteListHandler = async (userId, item) => {
    try {
      await setDoc(doc(db, "users", userId, "Favourite", `${item.id}`), {
        Title: item.title,
        Id: item.id,
        Image: item.image,
      });
      console.log("Items added to list: ", item.id);
    } catch {
      console.log("failed to add item to list");
    }
  };

  const removeFromFavouriteHandler = async (userId, itemId) => {
    try {
      await deleteDoc(doc(db, "users", userId, "Favourite", `${itemId}`));
      console.log("Item deleted: ", itemId);
    } catch {
      console.log("Failed to delete item: ", itemId);
    }
  };

  const contextValue = {
    favouriteList: favourite,
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