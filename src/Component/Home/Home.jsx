import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext.js";
import toast, { Toaster } from "react-hot-toast";
import "./Home.css";
import axios from "axios";
import $ from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainSlider from "../MainSlider/MainSlider.jsx";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider.jsx";
import { CartContext } from "../../Context/CartContext.js";
import Swal from "sweetalert2";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
import { Helmet } from "react-helmet";
export default function Home() {
  //display products
  let [products, setProducts] = useState([]);
  //loading
  let [loading, setLoading] = useState(false);
  //favourite
  let [heart, setHeart] = useState(false);
  let navigate = useNavigate();
  //get products display in home
  async function getProducts() {
    setLoading(true);
    let req = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=30`
    );
    setLoading(false);
    setProducts(req.data.data);
  }
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
        toast.success("product deleted   in wishlist");
      }
    }
  }
  //cart
  let { addCart, setNumOfCartItems } = useContext(CartContext);
  async function addToCart(id) {
    setLoading(true);
    let { data } = await addCart(id).catch((err) => {
      console.log(err);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
      setLoading(false);
      Swal.fire({
        title: "Good job!",
        text: `${data.message}`,
        icon: "success",
      });
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Home </title>
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      <MainSlider />
      <CategoriesSlider />
      <div>
        <Toaster position="top-center" />
      </div>
      {loading ? (
        <div className="loading d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 end-0 start-0 bg-dark">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container py-5">
          <div className="products row g-3">
            {products.map((ele) => {
              return (
                <div key={ele._id} className="col-lg-2 col-md-3 col-sm-6">
                  <div className="product font-sm position-relative cursor-pointer p-1">
                    <Link to={"/product/" + ele._id}>
                      <img
                        className="w-100"
                        src={ele.imageCover}
                        alt={ele.title}
                        loading="lazy"
                      />
                      <span className="text-main">{ele.category.name}</span>
                      <h5 className="fw-semibold">
                        {ele.title.split(" ").slice(0, 6).join(" ")}
                      </h5>
                      <div className="d-flex justify-content-between ">
                        <span>{ele.price}EGP</span>
                        <span>
                          <i className="fa-solid fa-star text-warning"></i>
                          {ele.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div
                      onClick={(e) => {
                        addWatchList(e, ele._id);
                      }}
                      className="heart d-flex justify-content-center align-items-center shadow position-absolute top-0 end-0 mt-1 me-1"
                    >
                      {favouriteList.includes(ele._id) ? (
                        <i
                          id={ele._id}
                          heart="solid"
                          className="fa-solid fa-heart text-main"
                        ></i>
                      ) : (
                        <i
                          id={ele._id}
                          heart="regular"
                          className="fa-regular fa-heart"
                        ></i>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addToCart(ele._id);
                      }}
                      className="btn bg-main text-white w-100"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
