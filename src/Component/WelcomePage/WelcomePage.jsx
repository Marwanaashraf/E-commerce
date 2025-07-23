import React from "react";
import header from "../../assets/images/torapril28.jpg";
import { Link } from "react-router-dom";
export default function WelcomePage() {
  return (
    <>
    <div className="forms"> 
      <div className="container py-5">
        <div className="row g-3 align-items-center">
          <div className="col-md-6 ">
            <div className="">
              <h1 className="text-main fw-bold">E-commerce Website</h1>
              <p className="text-muted my-3">
                A full-featured e-commerce website that allows users to browse 
                products by categories and brands. Users can view product
                details, add items to their wishlist or shopping cart, and
                proceed to checkout with both cash and card payment options. The
                platform also enables users to track their orders and view
                detailed order information.
              </p>
              <button className="btn btn-success">
                <Link className="text-white" to="/home"><i className="fa-solid fa-house"></i> Go To Home</Link>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <img className="w-100" src={header} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
