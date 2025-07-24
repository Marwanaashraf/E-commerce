import React, { useEffect, useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/freshcart-logo.svg";
import $ from "jquery";
import { UserContext } from "../../Context/userContext.js";
import { CartContext } from "../../Context/CartContext.js";
import SearchProducts from "../SearchProducts/SearchProducts.jsx";
export default function Navbar() {
  let { token, setToken } = useContext(UserContext);
  let { numOfCartItems } = useContext(CartContext);
  let navigate = useNavigate();
  // useEffect(() => {
  //   document.addEventListener("scroll", () => {
  //     let top = $("nav").offset().top;
  //     if (top >= 45) {
  //       $("nav").removeClass("bg-transparent");
  //       $("nav").addClass("bg-body-tertiary");
  //     } else if (top < 45) {
  //       $("nav").removeClass("bg-body-tertiary");
  //       $("nav").addClass("bg-transparent");
  //     }
  //   });
  // }, []);
  function logOut() {
    setToken(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 start-0 end-0 z-1 p-3">
        <div className="container-fluid">
          <NavLink to="/home" className="navbar-brand">
            <img className="w-100" src={logo} alt="" />
          </NavLink>
          {token != null ? (
            <>
              <ul className="navbar-nav nav-query flex-row ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-3">
                  <NavLink
                    to="searchproducts"
                    className="nav-link cursor-pointer "
                  >
                    <i className="fa-solid fa-search"></i>
                  </NavLink>
                </li>
                <li className="nav-item me-3">
                  <NavLink className="nav-link" to="/profile">
                    <i className="fa-solid fa-user"></i>
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            ""
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token != null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/Home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/Products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/Categories"
                  >
                    Categories
                  </NavLink>{" "}
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/Brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/Cart"
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/Witchlist"
                  >
                    Witchlist
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token != null ? (
                <>
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-icons">
                  <li className="nav-item ">
                    <NavLink
                      to="searchproducts"
                      className="nav-link cursor-pointer "
                    >
                      <i className="fa-solid fa-search"></i>
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink className="nav-link" to="/profile">
                      <i className="fa-solid fa-user"></i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="/cart">
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="cart-count position-absolute top-0 end-0 rounded p-1 d-flex justify-content-center align-items-center ">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  </ul>
                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={logOut}>
                      LogOut
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="Signup"
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
