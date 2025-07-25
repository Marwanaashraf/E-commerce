import React, { useContext, useEffect, useState } from "react";
import img from "../../assets/images/1680403266739-cover.jpeg";
import "./Cart.css";
import { CartContext } from "../../Context/CartContext.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
  let [cart, setCart] = useState({});
  let [loading, setLoading] = useState(false);
  //getCart
  let {
    getUserCart,
    deleteProductInCart,
    setNumOfCartItems,
    updateProductQuantity,
    clearCart,
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
      console.log(data.data);
      setCart(data.data);
      setLoading(false);
    }
  }
  // let { data, isLoading } = useQuery({ queryKey: ["cart"], queryFn: getCart });
  // let products = data?.data.data.products;
  async function removeProduct(id) {
    setLoading(true);
    let { data } = await deleteProductInCart(id).catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
      setCart(data.data);
      setLoading(false);
    }
  }
  async function updateQuantity(id, count, counter) {
    if (counter == 1) {
      setLoading(true);
      let { data } = await updateProductQuantity(id, ++count).catch((err) => {
        setLoading(false);
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
      if (data.status == "success") {
        setCart(data.data);
        setLoading(false);
      }
    } else if (counter == 0) {
      setLoading(true);
      let { data } = await updateProductQuantity(id, --count).catch((err) => {
        setLoading(false);
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
      if (data.status == "success") {
        setCart(data.data);
        setLoading(false);
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
        <div className="loading d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 end-0 start-0 bg-dark">
          <span className="loader"></span>
        </div>
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
            {cart.products?.length == 0 ? (
              <div className="empty-cart">
                <h4 className="fw-bold  ">YOUR BAG IS EMPTY.</h4>
                <p className="text-muted">
                  Be inspired and discover something new in our latest arrivals.
                </p>
              </div>
            ) : (
              <>
                <div className="row g-3">
                  <div className="col-md-9">
                    <h5 className="fw-bolder">
                      Num of items:{" "}
                      <span className="text-main">{cart.products?.length}</span>
                    </h5>
                  </div>
                  <div className="col-md-3">
                    <h5 className="fw-bolder ms-auto">
                      Total price:{" "}
                      <span className="text-main">
                        {cart.totalCartPrice}EGP
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="row g-3 align-items-center my-3">
                  {cart.products?.map((ele) => {
                    return (
                      <>
                        <div className="col-10">
                          <div className="row g-3 align-items-center">
                            <div className="col-md-2 col-4">
                              <div className="">
                                <img
                                  className="w-100"
                                  src={ele.product?.imageCover}
                                  alt=""
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
                                <button
                                  onClick={() => {
                                    removeProduct(ele.product?._id);
                                  }}
                                  className="btn btn-danger my-2 font-xsm"
                                >
                                  <i className="fa-solid fa-trash"></i> Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="cart-counter d-flex ">
                            <button
                              onClick={() => {
                                updateQuantity(ele.product?._id, ele.count, 1);
                              }}
                              className=" me-2"
                            >
                              +
                            </button>
                            <p className="me-2">{ele.count}</p>
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
                    className="btn btn-outline-danger "
                  >
                  clear your cart
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
