import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import { Helmet } from "react-helmet";
export default function Categories() {
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function getCategories() {
    setLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(data.data);
    setLoading(false);
    setCategories(data.data);
  }
  function getSpecificProducts(e) {
    let id = $(e.target).parent().attr("id");
    navigate(`${id}`);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Categories </title>
      </Helmet>
      {loading ? (
        <div className="loading d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 end-0 start-0 bg-dark">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container pt-5">
          <h1 className="text-main fw-bolder text-center">Categories</h1>
          <div className="row g-3 my-3">
            {categories.map((ele) => {
              return (
                <div className="col-md-3 col-6">
                  <div
                    id={ele._id}
                    onClick={getSpecificProducts}
                    className="category shadow rounded-3 h-100 cursor-pointer text-center"
                  >
                    <img
                      className="w-100"
                      src={ele.image}
                      alt={ele.name}
                      loading="lazy"
                    />
                    <div id={ele._id} className="p-2">
                      <p className="text-main">{ele.name}</p>
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
