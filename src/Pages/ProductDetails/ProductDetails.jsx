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
import Loading from "../../Component/Loading/Loading.jsx";
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
  let { addCart, setNumOfCartItems, cartItems, setCartItems } =
    useContext(CartContext);
  async function addToCart() {
    setBtnLoading(true);
    let { data } = await addCart(id).catch((error) => {
      console.log(error);
      setBtnLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      {loading ? (
        <Loading />
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

          <div style={{marginTop:"120px"}} className="container py-5 rounded-4 border ">
            <div className="row g-4 align-items-center">
              {/* slider */}
              <div className="col-md-3">
                <div className="">
                  <Slider arrows={false} dots={true}>
                    {product.images?.map((ele) => {
                      return (
                        <div key={ele}>
                          <img className="w-100" src={ele} alt={ele.title} />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              {/* details */}
              <div className="col-md-9 ">
                <div className="prod-detail my-4">
                  {/* category and favourite */}
                  <div className="text-main fs-6 d-flex align-items-center">
                    {/* category */}
                    <span className="text-xs">{product.category?.name}</span>

                    {/* wishlist */}
                    <div
                      onClick={(e) => {
                        addWatchList(e, product._id);
                      }}
                      className="heart d-flex justify-content-center align-items-center shadow-sm ms-auto"
                    >
                      {favouriteList.find(
                        (ele) => ele._id === product._id || ele === product._id
                      ) ? (
                        <i
                          id={product._id}
                          heart="solid"
                          className="fa-solid fa-heart text-main"
                        ></i>
                      ) : (
                        <i
                          id={product._id}
                          heart="regular"
                          className="fa-regular fa-heart"
                        ></i>
                      )}
                    </div>
                  </div>
                  {/* title */}
                  <h3 className="my-1 fw-bold">{product.title}</h3>

                  {/* price */}
                  <h5 className=" mt-2">EGP {product.price}</h5>

                  {/* Rating */}
                  <div className="d-flex align-items-center mt-1 fs-6">
                    <i
                      className={
                        Math.ceil(product.ratingsAverage) >= 1
                          ? "fa-solid fa-star rating-color  "
                          : "fa-regular fa-star rating-color  "
                      }
                    ></i>
                    <i
                      className={
                        Math.ceil(product.ratingsAverage) >= 2
                          ? "fa-solid fa-star rating-color  "
                          : "fa-regular fa-star rating-color  "
                      }
                    ></i>
                    <i
                      className={
                        Math.ceil(product.ratingsAverage) >= 3
                          ? "fa-solid fa-star rating-color  "
                          : "fa-regular fa-star rating-color  "
                      }
                    ></i>
                    <i
                      className={
                        Math.ceil(product.ratingsAverage) >= 4
                          ? "fa-solid fa-star rating-color  "
                          : "fa-regular fa-star rating-color  "
                      }
                    ></i>
                    <i
                      className={
                        Math.ceil(product.ratingsAverage) >= 5
                          ? "fa-solid fa-star rating-color  "
                          : "fa-regular fa-star rating-color  "
                      }
                    ></i>
                    <span className="text-muted ms-1">
                      ({product.ratingsAverage})
                    </span>
                  </div>

                  {/* description */}
                  <p className="text-muted my-3">{product.description}</p>
                  {/* <h5 className="text-main fw-semibold">
                    Brand:{" "}
                    <span className="text-black fw-medium">
                      {" "}
                      {product.brand?.name}
                    </span>
                  </h5> */}
                  {/* add to cart */}
                  {btnLoading ? (
                    <button className="form-btn mt-3">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  ) : cartItems?.products?.find((ele) => {
                      return (
                        ele.product._id === product._id ||
                        ele.product === product._id
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
