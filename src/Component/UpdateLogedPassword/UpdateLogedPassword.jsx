import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/userContext.js";
import axios from "axios";
import Swal from "sweetalert2";
import { data } from "jquery";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function UpdateLogedPassword() {
  let [loading, setLoading] = useState(false);
  let { setToken } = useContext(UserContext);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("currentPassword is required")
      .matches(
        /^[\w@#$%^&*]{8,20}[A-Z]+$/,
        "password has from 8 to 20 character or number and contain at least capital charcter in last "
      ),
    password: Yup.string()
      .required("New Password is required")
      .matches(
        /^[\w@#$%^&*]{8,20}[A-Z]+$/,
        "password has from 8 to 20 character or number and contain at least capital charcter in last "
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "repassword not match with password"),
  });
  async function updatePassword(values) {
    setLoading(true);
    let { data } = await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.errors.msg}`,
        });
      });
    if (data.message == "success") {
      setLoading(false);
      toast.success("update password successfully");
      setTimeout(() => {
        setToken(null);
        localStorage.removeItem("userToken");
        navigate("/login");
      }, 1000);
    }
  }
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: updatePassword,
  });
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Update Password</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="">
        <Toaster position="top-center" />
      </div>
      <div className="forms">
        <form onSubmit={formik.handleSubmit} className="contain-form pt-5">
          <div className="my-3 text-center">
            <img src={logo} alt="" />
            <h1 className="text-main my-1">Change Your Password</h1>
          </div>
          <div className="my-3">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="form-input">
              <input
                type="password"
                className={
                  formik.errors.currentPassword &&
                  formik.touched.currentPassword
                    ? "form-control form-error"
                    : "form-control"
                }
                name="currentPassword"
                id="currentPassword"
                placeholder="enter your Current Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            {formik.errors.currentPassword && formik.touched.currentPassword ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.currentPassword}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="password">New Password</label>
            <div className="form-input">
              <input
                type="password"
                className={
                  formik.errors.password && formik.touched.password
                    ? "form-control form-error"
                    : "form-control"
                }
                name="password"
                id="password"
                placeholder="enter your New Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.password}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label htmlFor="rePassword">rePassword</label>
            <div className="form-input">
              <input
                type="password"
                className={
                  formik.errors.rePassword && formik.touched.rePassword
                    ? "form-control form-error"
                    : "form-control"
                }
                name="rePassword"
                id="rePassword"
                placeholder="enter your rePassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.rePassword}
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
              <button className="btn btn-outline-success w-100">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success w-100"
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
