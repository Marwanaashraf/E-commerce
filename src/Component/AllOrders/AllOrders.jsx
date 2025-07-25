import React, { useEffect, useState } from "react";
import "./AllOrders.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  //displayOrders
  let [orders, setOrders] = useState([]);
  //loading screen
  let [loading, setLoading] = useState(false);
  //get cartOwner from token
  let cartOwner = jwtDecode(localStorage.getItem("userToken")).id;
  async function getAllOrders() {
    setLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`
    );
    setLoading(false);
    if (data != []) {
      setOrders(data);
    }
  }
  function orderDetails(cartItems) {
    console.log(cartItems);
  }
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>All Orders </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <div className="loading d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 end-0 start-0 bg-dark">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container pt-5">
          {orders.length == 0 ? (
            <div className="bg-body-tertiary rounded-3 my-3  p-4">
              <div className="">
                <h3 className="fw-bold">NO ORDERS</h3>
                <hr />
                <p className="text-muted">You haven't placed any orders yet.</p>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              {orders?.map((ele) => {
                return (
                  <div className="col-md-6">
                    <div className="bg-body-tertiary rounded-3 shadow-sm p-3">
                      <div className="d-flex justify-content-between">
                        <h3 className="fw-bolder">Order No.{ele.id}</h3>
                        <h5 className="text-black-50">
                          {ele.createdAt
                            ?.split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </h5>
                      </div>
                      <p className="text-muted my-2">
                        Payment Method:{" "}
                        <span className="text-main fw-bolder ">
                          {ele.paymentMethodType}
                        </span>
                      </p>
                      <p className="text-muted my-2">
                        Total Amount:{" "}
                        <span className="text-main fw-bolder">
                          {ele.totalOrderPrice}EGP
                        </span>
                      </p>
                      <p className="text-muted my-2">
                        Quantity:{" "}
                        <span className="text-main fw-bolder">
                          {ele.cartItems.length}
                        </span>
                      </p>
                      <button
                        className="details-btn"
                        data-bs-toggle="modal"
                        data-bs-target={"#myModal" + ele.id}
                      >
                        Details
                      </button>
                      <div
                        className="modal fade"
                        id={"myModal" + ele.id}
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-fullscreen-sm-down">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fw-bold"
                                id="exampleModalLabel"
                              >
                                Order No.{ele.id}
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="row g-3 ">
                                {ele.cartItems.map((item) => {
                                  return (
                                    <>
                                      {/* <h4 className="fw-bolder">Cart Items: <span className="text-main">{ele.cartItems.length}</span>
                                  </h4> */}
                                      <div className="col-12">
                                        <div className="row align-items-center">
                                          <div className="col-3">
                                            <div className="">
                                              <img
                                                className="w-100"
                                                src={item.product?.imageCover}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                          <div className="col-9">
                                            <div className="">
                                              <span className="text-main fs-6">
                                                {item.product.category.name}
                                              </span>
                                              <h4 className="fw-bold">
                                                {item.product.title
                                                  .split(" ")
                                                  .slice(0, 3)
                                                  .join(" ")}
                                              </h4>
                                              <div className="d-flex justify-content-between ">
                                                <h5 className="">
                                                  Units:{" "}
                                                  <span className="text-main">
                                                    {item.count}
                                                  </span>
                                                </h5>
                                                <h5 className="">
                                                  price:{" "}
                                                  <span className="text-main">
                                                    {item.price}
                                                  </span>
                                                </h5>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <hr />
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                            {/* <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
