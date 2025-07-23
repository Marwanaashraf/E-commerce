import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { EmailContext } from "../../Context/emailContext.js";
import { UserContext } from "../../Context/userContext.js";
import { CartContext } from "../../Context/CartContext.js";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
export default function Layout() {
  let { email, setEmail } = useContext(EmailContext);
  let { setToken } = useContext(UserContext);
  let { getUserCart, setNumOfCartItems } = useContext(CartContext);
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
    }
  }
  async function getFavourites() {
    let { data } = await getWishList().catch((err) => {
      console.log(err);
    });
    if (data.status == "success") {
      data.data?.forEach((ele) => {
        favouriteList.push(ele._id);
      });   
    }
  }
  useEffect(() => {
    if (localStorage.getItem("verifyEmail") != null) {
      setEmail(localStorage.getItem("verifyEmail"));
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="my-5">
        <Outlet />
      </div>
    </div>
  );
}
