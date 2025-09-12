import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import "./PaymentMethod.css"
export default function PaymentMethod() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [payMethod, setMethod] = useState("");

  function selectMethod(type) {
    let paymentCash = document.querySelector(".payment-cash");
    let paymentVisa = document.querySelector(".payment-visa");
    if (type == "cash") {
      paymentCash.classList.replace(
        "border-secondary-subtle",
        "border-success"
      );
      paymentVisa.classList.replace(
        "border-primary",
        "border-secondary-subtle"
      );
      setMethod("cash");
    } else if (type === "card") {
      paymentCash.classList.replace(
        "border-success",
        "border-secondary-subtle"
      );
      paymentVisa.classList.replace(
        "border-secondary-subtle",
        "border-primary"
      );
      setMethod("card");
    }
  }
  function navigateToCheckout(){
    navigate(`/checkout/${id}/${payMethod}`)
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Method </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className=" forms ">
        <div className="contain-form text-center">
          <h1 className="fw-bold fs-3">Select Payment Method</h1>
            {/* cash */}
          <div
            onClick={() => {
              selectMethod("cash");
            }}
            style={{ border: "2px solid" }}
            className="payment-cash border-secondary-subtle rounded-4 my-4"
          >
            <div className="d-flex align-items-center p-3 cursor-pointer">
              <h2 className="text-success">
                <i className="fa-solid fa-money-bill-wave"></i>
              </h2>
              <div className="ms-4">
                <h5 className="text-start fw-semibold">Cash Method</h5>
                <p>pay with when your order arrives</p>
              </div>
            </div>
          </div>

          {/* card */}
          <div
            onClick={() => {
              selectMethod("card");
            }}
            style={{ border: "2px solid" }}
            className="payment-visa border-secondary-subtle rounded-4  my-3"
          >
            <div className="d-flex align-items-center p-3 cursor-pointer">
              <h2 className="text-primary">
                <i className="fa-solid fa-credit-card"></i>
              </h2>
              <div className="ms-4">
                <h5 className="text-start fw-semibold">Card Method</h5>
                <p>Secure online payment with visa</p>
              </div>
            </div>
          </div>

          {payMethod ? (
            <button
              onClick={navigateToCheckout}
              className="form-btn"
            >
              <i className="fa-solid fa-lock"></i> Checkout
            </button>
          ) : (
            <button disabled className="form-btn">
              <i className="fa-solid fa-lock"></i> Checkout
            </button>
          )}

          <p className="text-muted mt-2 fs-6">
            <i className="fa-solid fa-shield-halved"></i> Secure Checkout
          </p>
        </div>
      </div>
    </>
  );
}
