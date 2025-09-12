import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../../Context/CartContext.js";
import { Helmet } from "react-helmet";
import "./Checout.css";
import Loading from "../../Component/Loading/Loading.jsx";
export default function Checkout() {
  let navigate = useNavigate();
  //loading btn
  let [loading, setLoading] = useState(false);
  //cartId from params
  let { id, payment } = useParams();
  //url back if you finish payment
  let url = "https://Marwanaashraf.github.io/E-commerce/cart";
  let { setNumOfCartItems, cartItems, setCartItems } = useContext(CartContext);
  let validationSchema = Yup.object({
    details: Yup.string()
      .required("Details is required")
      .matches(/^[\w!@#$%^&*-/]{4,30}$/, "enter your address"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "enter valid phone"),
    city: Yup.string()
      .required("City is required")
      .matches(/^[a-zA-Z]{4,20}$/, "enter valid city"),
  });
  async function submitForm(values) {
    let body = {
      shippingAddress: values,
    };
    let options = {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    };
    if (payment == "card") {
      setLoading(true);
      let { data } = await axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
          body,
          options
        )
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
      if (data.status == "success") {
        setLoading(false);
        window.location.href = data.session.url;
      }
    } else if (payment == "cash") {
      setLoading(true);
      let { data } = await axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
          body,
          options
        )
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
      if (data.status == "success") {
        setLoading(false);
        setNumOfCartItems(0);
        setCartItems({});
        navigate("/cart/allorders");
      }
    }
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  console.log();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout: {payment}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      {Object.keys(cartItems).length > 0 ? (
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={formik.handleSubmit} className="p-2 my-4">
                <div className="my-3 text-center">
                  <h1 className="my-1">Checkout</h1>
                </div>
                <div className="my-3">
                  <label htmlFor="details">Details</label>
                  <input
                    type="text"
                    className={
                      formik.errors.details && formik.touched.details
                        ? "form-control form-error"
                        : "form-control"
                    }
                    name="details"
                    id="details"
                    placeholder="enter details"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.details && formik.touched.details ? (
                    <p className="text-danger">
                      <i className="fa-solid fa-circle-exclamation"></i>{" "}
                      {formik.errors.details}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="my-3">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    className={
                      formik.errors.phone && formik.touched.phone
                        ? "form-control form-error"
                        : "form-control"
                    }
                    name="phone"
                    id="phone"
                    placeholder="enter your phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <p className="text-danger">
                      <i className="fa-solid fa-circle-exclamation"></i>{" "}
                      {formik.errors.phone}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="my-3">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className={
                      formik.errors.city && formik.touched.city
                        ? "form-control form-error"
                        : "form-control"
                    }
                    name="city"
                    id="city"
                    placeholder="enter your city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.city && formik.touched.city ? (
                    <p className="text-danger">
                      <i className="fa-solid fa-circle-exclamation"></i>{" "}
                      {formik.errors.city}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                {payment == "cash" ? (
                  <div className="my-3 text-center">
                    {loading ? (
                      <button className="btn btn-success w-100">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={!(formik.dirty && formik.isValid)}
                      >
                        <i className="fa-solid fa-money-bill-wave"></i> Cash
                        payment
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="my-2 text-center">
                    {loading ? (
                      <button className="btn btn-primary w-100">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={!(formik.dirty && formik.isValid)}
                      >
                        <i className="fa-brands fa-cc-visa"></i> Card payment
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
            <div className="col-md-6 checkout-details border-secondary-subtle">
              <div className="p-2">
                {cartItems?.products?.map((ele) => {
                  return (
                    <div
                      key={ele.product._id}
                      className="d-flex justify-content-between align-items-center my-3 fw-medium"
                    >
                      <div className="d-flex align-items-center ">
                        <div className="position-relative">
                          <img
                            className="check-img shadow-sm"
                            src={ele.product?.imageCover}
                            alt={ele.product?.title}
                          />
                          <div className="quantity-product">
                            <span className="fw-medium">{ele.count}</span>
                          </div>
                        </div>
                        <p className="ms-3   fw-semibold">
                          {ele.product?.title?.split(" ").slice(0, 4).join(" ")}
                        </p>
                      </div>
                      <div>
                        <p>{ele.price}EGP</p>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-between align-items-center my-3">
                  <h5 className="fw-fw-medium">
                    Subtotal . {cartItems?.products?.length} items
                  </h5>
                  <p className="">{cartItems.totalCartPrice}EGP</p>
                </div>
                <div className="d-flex justify-content-between align-items-center my-3 ">
                  <h5 className="">Shipping</h5>
                  <p className="text-uppercase ">Free</p>
                </div>
                <div className="d-flex justify-content-between align-items-center my-3">
                  <h5 className="fw-semibold">
                    Total {cartItems?.products?.length} items
                  </h5>
                  <p className="fw-semibold">{cartItems.totalCartPrice}EGP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
