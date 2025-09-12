import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/freshcart-logo.svg";
import "./Signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function Signup() {
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  async function registerForm(values) {
    //1-start loading
    setLoading(true);
    //2-post
    let {data} = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setLoading(false);
        toast.error(err.response.data.message);
        
      });
    setErrorMsg("");
    if (data.message == "success") {
      //3-stop loading
      setLoading(false);
      toast.success("Create Account Successfully");
      //4-navigate to login
      setTimeout(()=>{
        navigate("/login")
      },1500)
    }
    console.log(data);
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "min length 3")
      .max(30, "max length 30"),
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[\w@#$%^&*]{8,20}[A-Z]+$/,
        "password has from 8 to 20 character or number and contain at least capital charcter in last "
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "repassword not match with password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "enter valid phone"),
  });
  let formik = useFormik({
    //object post api
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: registerForm,
    validationSchema,
  });
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Signup</title>
   
      </Helmet>
      <div className="toaster">
        <Toaster position="top-center" />
      </div>
      <div className="forms">

      <form onSubmit={formik.handleSubmit} className="contain-form mt-5">
        <div className="my-3 text-center">
          <h1 className="text-main text-capitalize my-1 fw-semibold">create New Account</h1>
        </div>
        {errorMsg != "" ? (
          <div className="my-4">
            <div className="alert alert-danger">
              <p className="font-sm">
                <i className="fa-solid fa-triangle-exclamation"></i> {errorMsg}</p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="my-3">
          <label className="" htmlFor="name">
            Name
          </label>
          <div className="form-input ">
            <input
              className={
                formik.errors.name && formik.touched.name
                  ? "form-control form-error"
                  : "form-control"
              }
              type="text"
              name="name"
              id="name"
              placeholder="enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i className="fa-solid fa-user"></i>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <p className="font-sm  text-danger">
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {formik.errors.name}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label className="" htmlFor="email">
            Email
          </label>
          <div className="form-input">
            <input
              className={
                formik.errors.email && formik.touched.email
                  ? "form-control form-error"
                  : "form-control"
              }
              type="email"
              name="email"
              id="email"
              placeholder="enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i className="fa-solid fa-envelope"></i>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <p className="font-sm  text-danger">
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {formik.errors.email}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label className="" htmlFor="password">
            Password
          </label>
          <div className="form-input">
            <input
              className={
                formik.errors.password && formik.touched.password
                  ? "form-control form-error"
                  : "form-control"
              }
              type="password"
              name="password"
              id="password"
              placeholder="enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <p className="font-sm  text-danger">
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {formik.errors.password}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label className="" htmlFor="rePassword">
            rePassword
          </label>
          <div className="form-input">
            <input
              className={
                formik.errors.rePassword && formik.touched.rePassword
                  ? "form-control form-error"
                  : "form-control"
              }
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="enter your rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="font-sm  text-danger">
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {formik.errors.rePassword}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label className="" htmlFor="phone">
            Phone
          </label>
          <div className="form-input">
            <input
              className={
                formik.errors.phone && formik.touched.phone
                  ? "form-control form-error"
                  : "form-control"
              }
              type="tel"
              name="phone"
              id="phone"
              placeholder="enter your phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i className="fa-solid fa-phone"></i>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <p className="font-sm  text-danger">
              <i className="fa-solid fa-circle-exclamation"></i>{" "}
              {formik.errors.phone}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3 ">
          {loading == true ? (
            <button type="button" className="form-btn">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="form-btn"
              disabled={!(formik.dirty && formik.isValid)}
            >
              SignUp
            </button>
          )}
        </div>
        <div className="my-2">
          <p className="text-center fw-semibold">
            Already have an account? <span
              className="text-decoration-underline text-main cursor-pointer"
              onClick={()=>{navigate("/login")}}
            > 
              Login
            </span>
          </p>
        </div>
      </form>
      </div>
    </>
  );
}
