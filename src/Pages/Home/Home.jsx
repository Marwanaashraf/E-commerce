import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext.js";
import toast, { Toaster } from "react-hot-toast";
import "./Home.css";
import axios from "axios";
import $ from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.js";
import Swal from "sweetalert2";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
import { Helmet } from "react-helmet";
import MainSlider from "../../Component/MainSlider/MainSlider.jsx";
import CategoriesSlider from "../../Component/CategoriesSlider/CategoriesSlider.jsx";
import ProductCard from "../../Component/ProductCard/ProductCard.jsx";
import Loading from "../../Component/Loading/Loading.jsx";
export default function Home() {
  //display products
  let [products, setProducts] = useState([]);
  //loading
  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  //get products display in home
  async function getProducts() {
    setLoading(true);
    let req = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=30`
    );
    setLoading(false);
    setProducts(req.data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home </title>
      </Helmet>

      <Toaster position="top-center" />

      {loading ? (
        <Loading/>
      ) : (
        <>
          <MainSlider />
          <CategoriesSlider />
          <div className="container py-5">
            <div className="products row g-3">
              {products.map((ele) => {
                return <div className="col-xl-2 col-lg-3 col-md-4 col-6" key={ele._id}>
                  <ProductCard product={ele} setLoading={setLoading} /> 
                </div> ;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
