import axios from "axios";
import React, { useEffect, useState } from "react";
import $ from "jquery"
import "./Brands.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../../Component/Loading/Loading.jsx";
export default function Brands() {
  let [brands, setBrands] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate()
  async function getBrands() {
    setLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .catch((err) => {
        console.log(err);
      });
    console.log(data.data);
    setLoading(false);
    setBrands(data.data);
  }
  function getSpecificProducts(e) {
    let id = $(e.target).parent().attr("id")
    navigate(`${id}`)
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
     <Helmet>
            <meta charSet="utf-8" />
            <title>Brands </title>
          </Helmet>
      {loading ? (
        <Loading/>
      ) : (
        <div className="container py-5">
          <h1 className="text-main fw-bolder text-center">Brands</h1>
          <div className="row g-2 my-3">
            {brands.map((ele) => {
              return (
                <div className="col-lg-3 col-md-4 col-6">
                  <div
                    id={ele._id}
                    onClick={getSpecificProducts}
                    className="brand rounded-3 h-100 cursor-pointer text-center"
                  >
                    <img
                      className="w-100"
                      src={ele.image}
                      alt={ele.name}
                      loading="lazy"
                    />
                    <div id={ele._id} className="">
                      <p>{ele.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
