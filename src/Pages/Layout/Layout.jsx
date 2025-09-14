import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { EmailContext } from "../../Context/emailContext.js";
import { UserContext } from "../../Context/userContext.js";
import { CartContext } from "../../Context/CartContext.js";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
import Navbar from "../../Component/Navbar/Navbar.jsx";
import Footer from "../../Component/footer/footer.jsx";
import SearchProducts from "../SearchProducts/SearchProducts.jsx";
export default function Layout() {
  //search
  let [isSearch, setSearch] = useState(false);
  let { email, setEmail } = useContext(EmailContext);
  let { setToken } = useContext(UserContext);
  let { getUserCart, setNumOfCartItems, setCartItems } =
    useContext(CartContext);
  let { favouriteList, setFavouriteList, getWishList } =
    useContext(FavouriteContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      //refresh make token=null
      setToken(localStorage.getItem("userToken"));
      //set cart number
      getCart();
      //set favouriteList
      getFavourites();
    }
  }, []);
  async function getCart() {
    let req = await getUserCart().catch((err) => {
      console.log(err);
    });
    if ((req.data.status = "success")) {
      setNumOfCartItems(req.data.numOfCartItems);
      setCartItems(req.data.data);
    }
  }
  async function getFavourites() {
    let { data } = await getWishList().catch((err) => {
      console.log(err);
    });
    if (data) {
      setFavouriteList(data.data);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("verifyEmail") != null) {
      setEmail(localStorage.getItem("verifyEmail"));
    }
  }, []);
  return (
    <div>
      <Navbar setSearch={setSearch} />
      <div className="my-5">
        <Outlet />
      </div>
      <Footer />
      {isSearch ? <SearchProducts setSearch={setSearch} /> : ""}
    </div>
  );
}
