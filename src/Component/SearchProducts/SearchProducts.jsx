import React, { useContext, useEffect, useRef, useState } from "react";
import "./SearchProducts.css";
import $ from "jquery";
import axios from "axios";
import { AllProductsContext } from "../../Context/AllProducts.js";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function SearchProducts(props) {
  //all products
  let [allProducts, setAllProducts] = useState([]);
  let { getAllProducts } = useContext(AllProductsContext);
  //searchProducts
  let [productsFilter, setProductsFilter] = useState([]);
  //no results search
  let [noResults, setNoResults] = useState(null);
  let navigate = useNavigate();

  //search products
  async function getEveryProducts() {
    let products = await getAllProducts();
    setProductsFilter(products);
  }
  function searchProducts(e) {
    console.log(productsFilter);
    let val = e.target.value;
    let result = productsFilter.filter((ele) =>
      ele.title.toLowerCase().startsWith(val.toLowerCase())
    );
    if (val == "") {
      setAllProducts([]);
    } else {
      setAllProducts(result);
    }
    console.log(result);
    if (result.length == 0) {
      setNoResults(val);
    } else {
      setNoResults(null);
    }
  }
  function closeSearch() {
    navigate("/home");
  }
  useEffect(() => {
    getEveryProducts();
  }, []);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Search </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="s-products  pt-5">
      <div className="container">
        <div className="row g-2 align-items-center my-2">
          <div className="col-11">
            <div className="search-products ">
              <input
                onKeyUp={searchProducts}
                type="text"
                placeholder="search products..."
                name="pSearch"
                id="pSearch"
                className="form-control"
              />
              <i className="fa-solid fa-search fs-6"></i>
            </div>
          </div>
          <div className="col-1">
            <div
              onClick={closeSearch}
              className="close-search d-flex justify-content-center align-items-center shadow-sm rounded-3"
            >
              <i className="fa-solid fa-xmark text-muted"></i>
            </div>
          </div>
        </div>
        <div className="products row g-3">
          {noResults == null ? (
            allProducts.map((ele) => {
              return (
                <div key={ele._id} className="col-md-3 col-4">
                  <div className="product font-sm position-relative cursor-pointer p-1 h-100">
                    <Link to={"/product/" + ele._id}>
                      <img
                        className="w-100"
                        src={ele.imageCover}
                        alt={ele.title}
                        loading="lazy"
                      />
                      <span className="text-main">{ele.category.name}</span>
                      <h5 className="fw-semibold">
                        {ele.title.split(" ").slice(0, 6).join(" ")}
                      </h5>
                      <div className="d-flex justify-content-between ">
                        <span>{ele.price}EGP</span>
                        <span>
                          <i className="fa-solid fa-star text-warning"></i>
                          {ele.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-md-12">
              <div className="">
                <h3>
                  No results contain{" "}
                  <span className="text-main">"{noResults}"</span>{" "}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
