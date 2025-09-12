import React, { useEffect, useState } from "react";
import "./AllOrders.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../../Component/Loading/Loading.jsx";

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
  console.log(orders);

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
        <Loading />
      ) : (
        <div className="container pt-5">
          <h1 className="">My Orders</h1>
          {orders.length == 0 ? (
            <div className="bg-body-tertiary rounded-3 my-3  p-4">
              <div className="">
                <h3 className="fw-bold">NO ORDERS</h3>
                <hr />
                <p className="text-muted">You haven't placed any orders yet.</p>
              </div>
            </div>
          ) : (
            <div className="row g-3 my-3">
              <table className="table table-dark table-bordered table-striped  text-center">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Total Amount</th>
                    <th>Total Items</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.id}</td>
                        <td>{ele.totalOrderPrice}EGP</td>
                        <td>{ele.cartItems.length}</td>
                        <td>
                          {" "}
                          {ele.createdAt
                            ?.split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                        <td>
                          {ele.isPaid ? (
                            <div className="btn btn-primary">Paid</div>
                          ) : (
                            <div className="btn btn-success">Shipped</div>
                          )}
                        </td>
                        <td>
                          <button
                            className="details-btn"
                            data-bs-toggle="modal"
                            data-bs-target={"#myModal" + ele.id}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* order details */}

              {orders?.map((ele) => {
                return (
                  <div
                  key={ele.id}
                    className="modal fade"
                    id={"myModal" + ele.id}
                    tabIndex="-1"
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
                                  <div key={item.id} className="col-12">
                                    <div className="row align-items-center">
                                      <div className="col-3">
                                        <div className="">
                                          <img
                                            className="w-100"
                                            src={item.product?.imageCover}
                                            alt={item.product.title}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-9">
                                        <div className="">
                                          <span className="text-main text-xs">
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
