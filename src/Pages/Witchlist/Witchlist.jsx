import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavouriteContext } from "../../Context/FavouriteContext.js";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import Loading from "../../Component/Loading/Loading.jsx";
export default function Witchlist() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [removeLoading, setRemoveLoading] = useState({});

  //getCart
  let { getWishList, deleteInWishlist, setFavouriteList } =
    useContext(FavouriteContext);
  let navigate = useNavigate();
  async function getFavourites() {
    setLoading(true);
    let { data } = await getWishList().catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
    if (data.status == "success") {
      console.log(data.data);
      setProducts(data.data);
      setLoading(false);
    }
  }

  async function removeProduct(id) {
    setRemoveLoading({ status: true, productId: id });
    let { data } = await deleteInWishlist(id).catch((err) => {
      console.log(err);
      setRemoveLoading({ status: false, productId: id });
      toast.error("Something went wrong!");
    });
    if (data.status == "success") {
      getFavourites();
      setFavouriteList(data.data);
      setRemoveLoading({ status: false, productId: id });
      toast.success("product deleted in wishlist");
    }
  }

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Witchlist </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container pt-5">
          <div className="bg-body-tertiary rounded-3 my-3 p-4">
            <div className="d-flex justify-content-between">
              <h3 className="fw-bold">
                WishList (<span className="text-danger">{products.length}</span>
                )
              </h3>
            </div>
            <hr />
            {products.length == 0 ? (
              <div>
                <h4 className="fw-bold">YOUR WishList IS EMPTY.</h4>
                <p className="text-muted">
                  Be inspired and discover something new in our latest arrivals.
                </p>
              </div>
            ) : (
              <>
                <div className="row g-3 align-items-center my-3">
                  {products.map((ele) => {
                    return (
                      <>
                        <div key={ele.id} className="col-md-10">
                          <div className="row g-3 align-items-center">
                            <div className="col-md-2 col-4">
                              <div className="">
                                <img
                                  className="w-100"
                                  src={ele.imageCover}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-md-10 col-8">
                              <div className="">
                                <h5 className="fw-bolder">
                                  {ele.title.split(" ").slice(0, 4).join(" ")}
                                </h5>
                                <span className="font-sm">{ele.price}EGP</span>
                                <br />
                                {removeLoading.status === true &&
                                removeLoading.productId === ele._id ? (
                                  <button className="btn btn-danger my-2 font-xsm">
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      removeProduct(ele._id);
                                    }}
                                    className="btn btn-danger my-2 font-xsm"
                                  >
                                    <i className="fa-solid fa-trash"></i> Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
