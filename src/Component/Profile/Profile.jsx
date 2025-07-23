import React, { useContext, useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext.js";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
export default function Profile() {
  let { setToken, decodingData } = useContext(UserContext);
  // let [userName, setUserName] = useState(null);
  // if (localStorage.getItem("userToken") != null) {
  //   setUserName(jwtDecode(localStorage.getItem("userToken")).name);
  // }

  console.log(decodingData);

  let navigate = useNavigate();
  function logOut() {
    setToken(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="forms">

    <div className="container pt-5">
      <div className="d-flex profile-header bg-body-tertiary p-3 rounded-3 shadow-sm">
        <div className="profile-img ">
          <h2 className="fw-bold text-capitalize">{decodingData?.name.slice(0, 1)}</h2>
        </div>
        <div className=" ms-3 ">
          <h3 className="fw-bold">{decodingData?.name}</h3>
          <p className="text-black-50">{decodingData?.email}</p>
        </div>
      </div>
      <div className="row g-3 my-3">
        <div className="col-md-6">
          <Link to="editprofile" className="bg-body-tertiary rounded-3 p-3 d-flex justify-content-between cursor-pointer shadow-sm">
            <h4 className="text-muted">
              <i className="fa-regular fa-pen-to-square"></i> Edit Profile
            </h4>
            <h4 className="text-muted">
              {" "}
              <i className="fa-solid fa-chevron-right"></i>{" "}
            </h4>
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="changepassword" className="bg-body-tertiary rounded-3 p-3 d-flex justify-content-between cursor-pointer shadow-sm">
            <h4 className="text-muted">
              <i className="fa-solid fa-key"></i> Change Password
            </h4>
            <h4 className="text-muted">
              {" "}
              <i className="fa-solid fa-chevron-right"></i>{" "}
            </h4>
          </Link>
        </div>
        <div className="col-md-6">
          <Link
            to="/cart"
            className="bg-body-tertiary rounded-3 p-3 d-flex justify-content-between cursor-pointer shadow-sm"
          >
            <h4 className="text-muted">
              <i className="fa-solid fa-cart-shopping"></i> Cart
            </h4>
            <h4 className="text-muted">
              {" "}
              <i className="fa-solid fa-chevron-right"></i>{" "}
            </h4>
          </Link>
        </div>
        <div className="col-md-6">
          <Link
            to="/cart/allorders"
            className="bg-body-tertiary rounded-3 p-3 d-flex justify-content-between cursor-pointer shadow-sm"
          >
            <h4 className="text-muted">
              <i className="fa-solid fa-box"></i> Order History
            </h4>
            <h4 className="text-muted">
              {" "}
              <i className="fa-solid fa-chevron-right"></i>{" "}
            </h4>
          </Link>
        </div>
        <div className="col-md-6">
          <Link
            to="/witchlist"
            className="bg-body-tertiary rounded-3 p-3 d-flex justify-content-between cursor-pointer shadow-sm"
          >
            <h4 className="text-muted">
              <i className="fa-solid fa-heart"></i> Favourite
            </h4>
            <h4 className="text-muted">
              {" "}
              <i className="fa-solid fa-chevron-right"></i>{" "}
            </h4>
          </Link>
        </div>
        <div className="col-md-6">
          <div
            onClick={logOut}
            className="bg-body-tertiary rounded-3 p-3 d-flex justify-content-between cursor-pointer shadow-sm"
          >
            <h4 className="text-muted">
              <i className="fa-solid fa-door-open"></i> Logout
            </h4>
            <h4 className="text-muted">
              {" "}
              <i className="fa-solid fa-chevron-right"></i>{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
