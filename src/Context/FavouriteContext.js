import axios from "axios";
import { createContext, useState } from "react";



export let FavouriteContext = createContext();
export function FavouriteProvider({ children }) {
  let [favouriteList, setFavouriteList] = useState([]);
  async function getWishList() {
    let options = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      options
    );
  }
  async function addInWishlist(id) {
    let body = {
      productId: id,
    };
    let options = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    return await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      body,
      options
    );
  }
  async function deleteInWishlist(id) {
    let options = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    return await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      options
    );
  }
  return (
    <FavouriteContext.Provider
      value={{
        favouriteList,
        setFavouriteList,
        getWishList,
        addInWishlist,
        deleteInWishlist,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}
