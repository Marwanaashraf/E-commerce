import React, { useContext, useEffect, useRef, useState } from "react";
import "./SearchProducts.css";
import { AllProductsContext } from "../../Context/AllProducts.js";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ProductCard from "../../Component/ProductCard/ProductCard.jsx";
export default function SearchProducts(props) {
  //all products
  let [allProducts, setAllProducts] = useState([]);
  let { getAllProducts } = useContext(AllProductsContext);
  //searchProducts
  let [productsFilter, setProductsFilter] = useState([]);
  //no results search
  let [noResults, setNoResults] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  //search products
  async function getEveryProducts() {
    let products = await getAllProducts();
    setProductsFilter(products);
  }
  function searchProducts(e) {
    let val = e.target.value;
    setLoading(true);
    let result = productsFilter.filter((ele) =>
      ele.title.toLowerCase().startsWith(val.toLowerCase())
    );
    if (val == "") {
      setAllProducts([]);
      setLoading(false);
    } else {
      setAllProducts(result);
      setLoading(false);
    }
    console.log(result);
    if (result.length == 0) {
      setNoResults(val);
      setLoading(false);
    } else {
      setNoResults(null);
      setLoading(false);
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
                {loading? <i className="fa-solid fa-spinner fa-spin fs-6"></i>: 
                
                <i className="fa-solid fa-search fs-6"></i>
                }
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
                return <ProductCard product={ele} setLoading={setLoading} />;
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
