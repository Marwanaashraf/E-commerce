import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext.js";
import toast, { Toaster } from "react-hot-toast";
import "./Products.css";
import axios from "axios";
import $ from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.js";
import Swal from "sweetalert2";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
import { Helmet } from "react-helmet";
import ProductCard from "../../Component/ProductCard/ProductCard.jsx";
import Loading from "../../Component/Loading/Loading.jsx";
export default function Products() {
  //display products
  let [products, setProducts] = useState([]);
  //metadata(pagination)
  let [metaData, setMetaData] = useState({});

  //loading
  let [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  let { token } = useContext(UserContext);
  let navigate = useNavigate();
  //get products display in home
  async function getProducts(page = 1) {
    setLoading(true);
    let req = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
    setLoading(false);
    setProducts(req.data.data);
    setMetaData(req.data.metadata);
  }

  //pagination
  let pages = [];
  for (let i = 1; i <= metaData.numberOfPages; i++) {
    pages.push(i);
  }
  function getPage(e) {
    let pageNum = e.target.getAttribute("page-num");
    getProducts(pageNum);
    setPage(pageNum);
  }
  function previousPage() {
    let currentPage = metaData.currentPage;
    if (currentPage - 1 != 0) {
      getProducts(--currentPage);
      setPage(currentPage);
    }
  }
  function nextPage() {
    let currentPage = metaData.currentPage;
    let numberOfPages = metaData.numberOfPages;
    if (currentPage != numberOfPages) {
      getProducts(++currentPage);
      setPage(currentPage);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products </title>
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      {loading ? (
        <Loading/>
      ) : (
        <div className="container py-5">
          <div className="products row g-3">
            {products.map((ele) => {
              return <ProductCard product={ele} setLoading={setLoading} />;
            })}
          </div>
          <nav aria-label="...">
            <ul className="pagination my-5 justify-content-center">
              <li onClick={previousPage} className="page-item">
                <a className="page-link cursor-pointer" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {pages.map((ele) => {
                return (
                  <li
                    onClick={getPage}
                    className={ele == page ? "page-item active" : "page-item"}
                  >
                    <a page-num={ele} className="page-link cursor-pointer">
                      {ele}
                    </a>
                  </li>
                );
              })}
              <li onClick={nextPage} className="page-item">
                <a className="page-link cursor-pointer" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
