import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/userContext.js";
import axios from "axios";
import Swal from "sweetalert2";
import { data } from "jquery";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function EditProfile() {
  let [loading, setLoading] = useState(false);
  let { setdecodingData } = useContext(UserContext);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "min length 3")
      .max(30, "max length 30"),
    email: Yup.string()
      .required("Email is required")
      .email("enter valid email"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "enter valid phone"),
  });
  async function updateProfile(values) {
    setLoading(true);
    let { data } = await axios
      .put("https://ecommerce.routemisr.com/api/v1/users/updateMe", values, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.errors.msg}`,
        });
      });
    if (data.message == "success") {
      setLoading(false);
      setdecodingData(data.user);
      toast.success("update profile successfully");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: updateProfile,
  });
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Profile </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="">
        <Toaster position="top-center" />
      </div>
      <div className="forms">
        <form onSubmit={formik.handleSubmit} className="contain-form pt-5">
          <div className="my-3 text-center">
            <h1 className="text-main my-1">Edit Your Profile</h1>
          </div>
          <div className="my-3 ">
            <label htmlFor="name">Name</label>
            <div className="form-input">
              <input
                type="text"
                className={
                  formik.errors.name && formik.touched.name
                    ? "form-control form-error"
                    : "form-control"
                }
                name="name"
                id="name"
                placeholder="enter your name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <i className="fa-solid fa-user"></i>
            </div>

            {formik.errors.name && formik.touched.name ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.name}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="email">Email</label>
            <div className="form-input">
              <input
                type="email"
                className={
                  formik.errors.email && formik.touched.email
                    ? "form-control form-error"
                    : "form-control"
                }
                name="email"
                id="email"
                placeholder="enter your email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.email}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="phone">Phone</label>
            <div className="form-input">
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
              <i className="fa-solid fa-phone"></i>
            </div>

            {formik.errors.phone && formik.touched.phone ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.phone}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-3 text-center">
            {loading ? (
              <button className="form-btn">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="form-btn"
                disabled={!(formik.dirty && formik.isValid)}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
