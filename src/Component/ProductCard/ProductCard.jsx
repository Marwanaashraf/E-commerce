import React, { useContext, useState } from "react";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
import { CartContext } from "../../Context/CartContext.js";
import axios from "axios";
import $, { data } from "jquery";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function ProductCard({ product, setLoading }) {
  let [btnLoading, setBtnLoading] = useState(false);
  //watchlist
  let { addInWishlist, deleteInWishlist, setFavouriteList, favouriteList } =
    useContext(FavouriteContext);
  async function addWatchList(e, id) {
    if ($(e.target).attr("heart") == "regular") {
      setLoading(true);
      let { data } = await addInWishlist(id);
      if (data.status == "success") {
        setFavouriteList(data.data);
        setLoading(false);
        toast.success("product addedd in wishlist");
      }
    } else if ($(e.target).attr("heart") == "solid") {
      setLoading(true);
      let { data } = await deleteInWishlist(id);
      if (data.status == "success") {
        setFavouriteList(data.data);
        setLoading(false);
        toast.success("product deleted in wishlist");
      }
    }
    console.log(data);
    
  }
  //cart
  let { addCart, setNumOfCartItems, cartItems, setCartItems } =
    useContext(CartContext);
  async function addToCart(id) {
    setBtnLoading(true);
    let { data } = await addCart(id).catch((err) => {
      console.log(err);
      setBtnLoading(false);
      toast.error("Faild");
    });
    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
      setCartItems(data.data);
      setBtnLoading(false);
      toast.success(data.message, {
        position: "top-right",
        className: "fs-6",
      });
    }
  }
  console.log(favouriteList);

  return (
    <div key={product._id} className="col-xl-2 col-lg-3 col-md-4 col-6">
      <div className="product position-relative cursor-pointer p-1 overflow-hidden">
        <Link to={"/product/" + product._id}>
          <img
            className="w-100"
            src={product.imageCover}
            alt={product.title}
            loading="lazy"
          />
          <span className="text-main text-xs">{product.category?.name}</span>
          <h5 className="fw-semibold fs-6">
            {product.title.split(" ").slice(0, 4).join(" ")}
          </h5>
          <div className="d-flex justify-content-between ">
            <span>{product.price}EGP</span>
            <span>
              <i className="fa-solid fa-star text-warning"></i>
              {product.ratingsAverage}
            </span>
          </div>
        </Link>
        <div
          onClick={(e) => {
            addWatchList(e, product._id);
          }}
          className="heart d-flex justify-content-center align-items-center shadow position-absolute top-0 end-0 mt-1 me-1"
        >
          {favouriteList.find((ele) => ele._id === product._id || ele === product._id) ? (
            <i
              id={product._id}
              heart="solid"
              className="fa-solid fa-heart text-main"
            ></i>
          ) : (
            <i
              id={product._id}
              heart="regular"
              className="fa-regular fa-heart text-main"
            ></i>
          )}
        </div>
        {/* add to cart */}
        {btnLoading ? (
          <button className="form-btn mt-3">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        ) : cartItems?.products?.find((ele) => {
            return (
              ele.product._id === product._id || ele.product === product._id
            );
          }) ? (
          <button
            disabled
            className="form-btn mt-3 d-flex justify-content-center align-items-center"
          >
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7998 19.0172L16.5401 4.8319C16.5131 4.51697 16.2477 4.27853 15.9373 4.27853H13.3458C13.3099 1.91207 11.3753 0 8.99978 0C6.62435 0 4.68979 1.91207 4.6538 4.27853H2.06239C1.74746 4.27853 1.48652 4.51697 1.45953 4.8319L0.199812 19.0172C0.199812 19.0352 0.195312 19.0532 0.195312 19.0712C0.195312 20.6863 1.67548 22 3.49756 22H14.5021C16.3242 22 17.8043 20.6863 17.8043 19.0712C17.8043 19.0532 17.8043 19.0352 17.7998 19.0172ZM8.99978 1.21472C10.7049 1.21472 12.0951 2.58241 12.1311 4.27853H5.86852C5.90452 2.58241 7.2947 1.21472 8.99978 1.21472ZM14.5021 20.7853H3.49756C2.35482 20.7853 1.42803 20.0294 1.41004 19.0982L2.61576 5.49775H4.6493V7.34233C4.6493 7.67975 4.91924 7.94969 5.25666 7.94969C5.59409 7.94969 5.86403 7.67975 5.86403 7.34233V5.49775H12.1311V7.34233C12.1311 7.67975 12.4011 7.94969 12.7385 7.94969C13.0759 7.94969 13.3458 7.67975 13.3458 7.34233V5.49775H15.3794L16.5896 19.0982C16.5716 20.0294 15.6403 20.7853 14.5021 20.7853Z"
                fill="white"
                stroke="white"
                strokeWidth="0.1"
              />
            </svg>{" "}
            <span className="ms-1">Add to Cart</span>
          </button>
        ) : (
          <button
            onClick={() => {
              addToCart(product._id);
            }}
            className="form-btn mt-3 fs-5 d-flex justify-content-center align-items-center"
          >
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7998 19.0172L16.5401 4.8319C16.5131 4.51697 16.2477 4.27853 15.9373 4.27853H13.3458C13.3099 1.91207 11.3753 0 8.99978 0C6.62435 0 4.68979 1.91207 4.6538 4.27853H2.06239C1.74746 4.27853 1.48652 4.51697 1.45953 4.8319L0.199812 19.0172C0.199812 19.0352 0.195312 19.0532 0.195312 19.0712C0.195312 20.6863 1.67548 22 3.49756 22H14.5021C16.3242 22 17.8043 20.6863 17.8043 19.0712C17.8043 19.0532 17.8043 19.0352 17.7998 19.0172ZM8.99978 1.21472C10.7049 1.21472 12.0951 2.58241 12.1311 4.27853H5.86852C5.90452 2.58241 7.2947 1.21472 8.99978 1.21472ZM14.5021 20.7853H3.49756C2.35482 20.7853 1.42803 20.0294 1.41004 19.0982L2.61576 5.49775H4.6493V7.34233C4.6493 7.67975 4.91924 7.94969 5.25666 7.94969C5.59409 7.94969 5.86403 7.67975 5.86403 7.34233V5.49775H12.1311V7.34233C12.1311 7.67975 12.4011 7.94969 12.7385 7.94969C13.0759 7.94969 13.3458 7.67975 13.3458 7.34233V5.49775H15.3794L16.5896 19.0982C16.5716 20.0294 15.6403 20.7853 14.5021 20.7853Z"
                fill="white"
                stroke="white"
                strokeWidth="0.1"
              />
            </svg>{" "}
            <span className="ms-1">Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}
