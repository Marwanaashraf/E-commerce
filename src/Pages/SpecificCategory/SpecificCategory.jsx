import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AllProductsContext } from "../../Context/AllProducts.js";
import { Helmet } from "react-helmet";
import ProductCard from "../../Component/ProductCard/ProductCard.jsx";
import Loading from "../../Component/Loading/Loading.jsx";
export default function SpecificCategory() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(null);
  let [noProducts, setNoProducts] = useState(false);
  let { id } = useParams();
  let navigate = useNavigate();
  let { getAllProducts } = useContext(AllProductsContext);
  async function getProducts() {
    //1-loading
    setLoading(true);
    //2-get all products
    let products = await getAllProducts();
    //3-filter products
    let result = products.filter((ele) => ele.category._id == id);
    console.log(result);
    //4-set displayProducts
    setProducts(result);
    if (result.length == 0) {
      setNoProducts(true);
    }
    //5-stop loading
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container pt-5">
          {noProducts ? (
            <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
              >
                <rect
                  x="50"
                  y="50"
                  width="120"
                  height="120"
                  rx="8"
                  fill="#fff"
                  stroke="#CBD5E1"
                  strokeWidth="3"
                />
                <rect
                  x="65"
                  y="70"
                  width="90"
                  height="8"
                  rx="4"
                  fill="#E5E7EB"
                />
                <rect
                  x="65"
                  y="95"
                  width="70"
                  height="8"
                  rx="4"
                  fill="#E5E7EB"
                />
                <rect
                  x="65"
                  y="120"
                  width="50"
                  height="8"
                  rx="4"
                  fill="#E5E7EB"
                />
                <text
                  x="110"
                  y="190"
                  text-anchor="middle"
                  font-family="Inter, Arial"
                  font-size="14"
                  fill="#94A3B8"
                ></text>
              </svg>
              <p className="text-muted fw-semibold">
                Sorry, No products available in this category at the moment
              </p>
            </div>
          ) : (
            <div className="products row g-3">
              {products.map((ele) => {
                return (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-6"
                    key={ele._id}
                  >
                    <ProductCard product={ele} setLoading={setLoading} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
