import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import $ from "jquery";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext.js";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  //get id from params
  let { id } = useParams();
  //displayProduct
  let [product, setProduct] = useState({});
  //loading
  let [loading, setLoading] = useState(false);
  //button loading
  let [btnLoading, setBtnLoading] = useState(false);
  async function getProductDetails() {
    //1-start loading
    setLoading(true);
    //2-get data
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    //3-set display products
    setProduct(data.data);
    //4-stop loading
    setLoading(false);
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
        toast.success("product deleted in wishlist");
      }
    }
  }
  //cart
  let { addCart, setNumOfCartItems } = useContext(CartContext);
  async function addToCart() {
    setLoading(true);
    let {data} = await addCart(id).catch((error) => {
      console.log(error);
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
    getProductDetails();
  }, []);
  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      {loading ? (
        <div className="loading d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 end-0 start-0 bg-dark">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {product?.title ? (
            <Helmet>
              <meta charSet="utf-8" />
              <title>{product.title} </title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
          ) : (
            ""
          )}

          <div className="container pt-5">
            <div className="row g-4 align-items-center">
              <div className="col-md-3">
                <div className="">
                  <Slider arrows={false} dots={true}>
                    {product.images?.map((ele) => {
                      return (
                        <div>
                          <img className="w-100" src={ele} alt="" />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              <div className="col-md-9 ">
                <div className="prod-detail my-4">
                  <span className="text-main fs-6 d-flex">
                    {product.category?.name}{" "}
                    <div
                      onClick={(e) => {
                        addWatchList(e, product._id);
                      }}
                      className="heart d-flex justify-content-center align-items-center shadow ms-auto"
                    >
                      {favouriteList.includes(product._id) ? (
                        <i
                          id={product._id}
                          heart="solid"
                          className="fa-solid fa-heart text-main"
                        ></i>
                      ) : (
                        <i
                          id={product._id}
                          heart="regular"
                          className="fa-regular fa-heart text-black"
                        ></i>
                      )}
                    </div>
                  </span>
                  <h3 className="my-1 fw-bold">{product.title}</h3>
                  <h5 className="text-muted my-3">{product.description}</h5>
                  <div className="d-flex justify-content-between fs-6 mt-2">
                    <p>{product.price}EGP</p>
                    <p>
                      <i className="fa-solid fa-star text-warning"></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                  {btnLoading ? (
                    <button
                      onClick={addToCart}
                      className="btn bg-main text-white w-100 my-2"
                    >
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      onClick={addToCart}
                      className="btn bg-main text-white w-100 my-2"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
