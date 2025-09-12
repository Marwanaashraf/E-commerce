import React, { useContext, useState } from "react";
import logo from "../../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function ResetPassword() {
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState(null);
  let [form, setForm] = useState(false);
  let verifyEmail = localStorage.getItem("verifyEmail");
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[\w!@#$%^&*]{8,20}[A-Z]+$/,
        "password has from 8 to 20 character or number and contain at least capital charcter in last"
      ),
  });
  async function submitForm(values) {
    console.log(values);
    setLoading(true);
    let req = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error.response.data.message);
      });
    if (req.status == 200) {
      setLoading(false);
      setErrorMsg(null);
      localStorage.removeItem("verifyEmail");
      toast.success("Reset password successfully");
      setForm(true);
    }
    console.log(req);
  }
  function goToLogin() {
    navigate("/");
  }
  let formik = useFormik({
    initialValues: {
      email: verifyEmail,
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
   
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      {form ? (
        <div className="forms py-5">
          <div className="contain-form py-5">
            <h1 className="text-main">Password Updated</h1>
            <h5 className="text-muted my-3">
              Your password has been successfully updated.
            </h5>
            <button onClick={goToLogin} className="form-btn">
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="forms">
          <form onSubmit={formik.handleSubmit} className="contain-form py-5 ">
            <div className="my-3 text-center">
              <h1 className="text-main">Reset Password</h1>
            </div>
            {errorMsg ? (
              <div className="my-3">
                <div className="alert alert-danger">
                  <p>
                    <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                    {errorMsg}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="my-4">
              <label htmlFor="newPassword">New Password</label>
              <div className="form-input">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="form-control"
                  placeholder="enter your New Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <i className="fa-solid fa-lock"></i>
              </div>
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <p className="text-danger font-sm">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {formik.errors.newPassword}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="my-3 text-center">
              {loading ? (
                <button type="button" className="form-btn">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className="form-btn"
                >
                  Reset Password
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
