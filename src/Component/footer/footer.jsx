import React from "react";
import { links } from "../Navbar/Navbar.jsx";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./footer.css";
let shopLinks = [
  { path: "/home", html: "Home" },
  { path: "/products", html: "Products" },
  { path: "/categories", html: "Categories" },
  { path: "/brands", html: "Brands" },
];

let authLinks = [
  { path: "/", html: "Login" },
  { path: "/signup", html: "Signup" },
];
let profileLinks = [
  { path: "/cart", html: "Cart" },
  { path: "/cart/allorders", html: "Orders" },
  { path: "/witchlist", html: "Witchlist" },
];
export default function footer() {
  return (
    <footer className="bg-body-tertiary p-2 py-5">
      <div className="container">
        <div className="row g-3 ">
          <div className="col-lg-3 col-md-4  ">
            <div className="">
              <NavLink to="/">
                <img className="logo" src={logo} alt="logo" />
              </NavLink>
              <p className="my-3">
                Secure payments · Fast delivery · Quality guaranteed
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 ">
            <div>
              <h3>Shop</h3>
              {shopLinks.map((link) => {
                return (
                  <div key={link.html}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "nav-link active my-1" : "nav-link my-1"
                      }
                    >
                      {link.html}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-3 col-md-4 ">
            <div>
              <h3>Profile</h3>
              {profileLinks.map((link) => {
                return (
                  <div key={link.html}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "nav-link active my-1" : "nav-link my-1"
                      }
                    >
                      {link.html}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-3 col-md-4 ">
            <div>
              <h3>Auth</h3>
              {authLinks.map((link) => {
                return (
                  <div key={link.html}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "nav-link active my-1" : "nav-link my-1"
                      }
                    >
                      {link.html}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <hr className="" />
      <div className="text-center">
        <p className="">
          Copy Right 2025 © By{" "}
          <Link to="/home" className="fresh text-main fw-semibold">
            Fresh Cart
          </Link>{" "}
          All Rights Reserved
        </p>

        {/* <div className="text-center">
          <h3 className=" text-main fw-bold">Follow Us</h3>
          <div className="d-flex  p-1 fs-4 justify-content-center">
            <i className="fa-brands  fa-facebook cursor-pointer"></i>
            <i className="fa-brands ms-3 fa-linkedin  cursor-pointer"></i>
            <i className="fa-brands ms-3 fa-github  cursor-pointer"></i>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
