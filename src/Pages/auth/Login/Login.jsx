import React, { useContext, useState } from "react";
import logo from "../../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { Helmet } from "react-helmet";
import { UserContext } from "../../../Context/userContext.js";
export default function Login() {
  //loading button
  let [loading, setLoading] = useState(false);
  //alert if error
  let [errorMsg, setErrorMsg] = useState(null);
  let { setToken ,decodingData, setdecodingData} = useContext(UserContext);
  let navigate = useNavigate();
  //schema
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[\w!@#$%^&*]{8,20}[A-Z]+$/,
        "password has from 8 to 20 character or number and contain at least capital charcter in last"
      ),
  });
  async function loginForm(values) {
    //1-start loading button
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setLoading(false);
        toast.error(error.response.data.message);
      });
    if (data.message == "success") {
      //2-stop loading
      setLoading(false);
      //3-remove error msg
      setErrorMsg(null);
      //4-set token in context
      setToken(data.token);
      //5-store token in local storage
      localStorage.setItem("userToken", data.token);
      //data(profile)
      setdecodingData(data.user)
      //6-go to home
      navigate("/home");
      window.location.reload()
      //7-toast hello
      setTimeout(() => {
        toast.success(`Hello ${data.user.name}`, {
          icon: "🎉",
          style: {
            fontSize: "18px",
          },
        });
      }, 500);
    }
  }
  //formik
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginForm,
    validationSchema,
  });
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
   
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="forms">
        <form onSubmit={formik.handleSubmit} className="contain-form">
          <div className="my-3 text-center">
            {/* <img src={logo} alt="" /> */}
            <h1 className="text-main my-1 fw-semibold">Login</h1>
          </div>
          {errorMsg ? (
            <div className="my-3">
              <div className="alert alert-danger">
                <p className="font-sm">
                  <i className="fa-solid fa-triangle-exclamation"></i> {errorMsg}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
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
              <p className="text-danger font-sm">
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
              <p className="text-danger">
                <i class="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.password}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <NavLink className="forgetpass-link" to="/forgetpassword">
              Forget password..?
            </NavLink>
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
                Login
              </button>
            )}
          </div>
          <div className="my-2">
            <p className="text-center fw-semibold">
              Don't have an account?{" "}
              <span
                className="text-decoration-underline text-main cursor-pointer"
              onClick={()=>{navigate("/Signup")}}
              >
                SignUp
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
