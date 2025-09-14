import React, { useContext, useEffect, useState } from "react";
import img from "../../assets/images/1680403266739-cover.jpeg";
import "./Cart.css";
import { CartContext } from "../../Context/CartContext.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../../Component/Loading/Loading.jsx";
export default function Cart() {
  let [cart, setCart] = useState({});
  let [loading, setLoading] = useState(false);
  let [removeLoading, setRemoveLoading] = useState({});
  let [countLoading, setCountLoading] = useState({});
  //getCart
  let {
    getUserCart,
    deleteProductInCart,
    setNumOfCartItems,
    updateProductQuantity,
    clearCart,
    setCartItems,
  } = useContext(CartContext);
  let navigate = useNavigate();
  async function getCart() {
    setLoading(true);
    let { data } = await getUserCart().catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
    if (data.status == "success") {
      setCart(data.data);
      setCartItems(data.data);
      setLoading(false);
    }
  }
  // let { data, isLoading } = useQuery({ queryKey: ["cart"], queryFn: getCart });
  // let products = data?.data.data.products;
  async function removeProduct(id) {
    setRemoveLoading({ status: true, productId: id });
    let { data } = await deleteProductInCart(id).catch((err) => {
      console.log(err);
      setRemoveLoading({ status: false, productId: id });

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
      setCart(data.data);
      setCartItems(data.data);
      setRemoveLoading({ status: false, productId: id });
    }
  }
  async function updateQuantity(id, count, counter) {
    if (counter == 1) {
      setCountLoading({ status: true, productId: id });
      let { data } = await updateProductQuantity(id, ++count).catch((err) => {
        setCountLoading({ status: false, productId: id });
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
      if (data.status == "success") {
        setCart(data.data);
        setCountLoading({ status: false, productId: id });
      }
    } else if (counter == 0) {
      setCountLoading({ status: true, productId: id });
      let { data } = await updateProductQuantity(id, --count).catch((err) => {
        setCountLoading({ status: false, productId: id });
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
      if (data.status == "success") {
        setCart(data.data);
        setCountLoading({ status: false, productId: id });
      }
    }
  }
  async function clearYourCart() {
    setLoading(true);
    let { data } = await clearCart().catch(() => {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
    if (data.message == "success") {
      setNumOfCartItems(0);
      setCartItems({});
      getCart();
      setLoading(false);
    }
  }
  function navigateToCheckout(id) {
    navigate(`/checkout/${id}`);
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="container pt-5">
          <div className="bg-body-tertiary rounded-3 my-3  p-4  ">
            <div className="d-flex justify-content-between">
              <h3 className="fw-bold">SHOPPING BAG</h3>
              {cart.products?.length == 0 ? (
                " "
              ) : (
                <button
                  onClick={() => {
                    navigateToCheckout(cart._id);
                  }}
                  className="btn bg-main text-white font-sm"
                >
                  checkout
                </button>
              )}
            </div>
            <hr />
            {/* cart is empty */}
            {cart.products?.length == 0 ? (
              <div className="empty-cart">
                <h4 className="fw-bold">YOUR BAG IS EMPTY.</h4>
                <p className="text-muted">
                  Be inspired and discover something new in our latest arrivals.
                </p>
              </div>
            ) : (
              <>
                <div className="row g-3">
                  {/* num of items */}
                  <div className="col-md-9">
                    <h5 className="fw-bolder">
                      Num of items:{" "}
                      <span className="text-main">{cart.products?.length}</span>
                    </h5>
                  </div>

                  {/*total price  */}
                  <div className="col-md-3">
                    <h5 className="fw-bolder ms-auto">
                      Total price:{" "}
                      <span className="text-main">
                        {cart.totalCartPrice}EGP
                      </span>
                    </h5>
                  </div>
                </div>

                {/* items */}
                <div className="row g-3 align-items-center my-3">
                  {cart.products?.map((ele) => {
                    return (
                      <>
                        <div key={ele.product?.id} className="col-sm-10 col-9">
                          <div className="row g-3 align-items-center">
                            <div className="col-md-2 col-4">
                              <div className="">
                                <img
                                  className="w-100"
                                  src={ele.product?.imageCover}
                                  alt={ele.product?.title}
                                />
                              </div>
                            </div>
                            <div className="col-md-10 col-8">
                              <div className="">
                                <h4 className="fw-bolder">
                                  {ele.product?.title
                                    .split(" ")
                                    .slice(0, 4)
                                    .join(" ")}
                                </h4>
                                <span className="font-sm">{ele.price}EGP</span>
                                <br />
                                {removeLoading.status === true &&
                                removeLoading.productId === ele.product?._id ? (
                                  <button className="btn btn-danger my-2 font-xsm">
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      removeProduct(ele.product?._id);
                                    }}
                                    className="btn btn-danger my-2 font-xsm"
                                  >
                                    <i className="fa-solid fa-trash"></i> Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2 col-1">
                          <div className="cart-counter d-flex align-items-center">
                            <button
                              onClick={() => {
                                updateQuantity(ele.product?._id, ele.count, 1);
                              }}
                              className=" me-2"
                            >
                              +
                            </button>
                            <p className="me-2 mt-3">
                              {countLoading.status === true &&
                              countLoading.productId === ele.product?._id ? (
                                <i className="fa-solid fa-spinner fa-spin text-black"></i>
                              ) : (
                                <span>{ele.count}</span>
                              )}{" "}
                            </p>
                            <button
                              onClick={() => {
                                updateQuantity(ele.product?._id, ele.count, 0);
                              }}
                              className=" me-5"
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                </div>
                <div className="text-center">
                  <button
                    onClick={clearYourCart}
                    className="btn btn-outline-danger text-capitalize"
                  >
                    Clear your cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
