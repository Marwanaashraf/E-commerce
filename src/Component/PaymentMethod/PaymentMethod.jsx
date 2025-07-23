import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentMethod() {
  let { id } = useParams();
  let navigate = useNavigate();
  function choosePayment(method) {
    navigate(`/checkout/${id}/${method}`);
  }
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Method </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="py-5">
      <div className="container my-5">
        <h1 className="text-main">Choose Payment Method</h1>
        <div className="row g-3 my-3">
          <div className="col-sm-12">
            <div
              onClick={() => {
                choosePayment("cash");
              }}
              className="d-flex justify-content-between border p-4 border-success border-2 rounded-3  cursor-pointer"
            >
              <h2 className="text-success">
                <i className="fa-solid fa-money-bill-wave"></i> Cash Method
              </h2>
              <h2 className="text-success">
                <i className="fa-solid fa-angle-right"></i>
              </h2>
            </div>
          </div>
          <div className="col-sm-12">
            <div
              onClick={() => {
                choosePayment("card");
              }}
              className="d-flex justify-content-between border p-4 border-primary border-2 rounded-3  cursor-pointer"
            >
              <h2 className="text-primary">
                <i className="fa-solid fa-credit-card"></i> Card Method
              </h2>
              <h2 className="text-primary">
                <i className="fa-solid fa-angle-right"></i>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
