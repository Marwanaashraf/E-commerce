import React, { useContext, useState } from "react";
import logo from "../../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { EmailContext } from "../../../Context/emailContext.js";
export default function ForgetPassword() {
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState(null);
  let { email, setEmail } = useContext(EmailContext);

  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("enter valid email"),
  });
  async function submitForm(values) {
    setLoading(true);
    let req = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error.response.data.message);
      });
    if (req.data.statusMsg == "success") {
      setLoading(false);
      setErrorMsg(null);
      setEmail(values.email);
      localStorage.setItem("verifyEmail", values.email);
      toast.success(req.data.message);
      navigate("verifycode");
    }
  }
  function canselProcess() {
    navigate("/login");
  }
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="forms ">
        <form onSubmit={formik.handleSubmit} className="contain-form py-5 ">
          <div className="my-3 text-center">
            <h1 className="text-main my-1 fw-semibold">Forget Password</h1>
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
          <div className="my-3">
            <label htmlFor="email">Email</label>
            <div className="form-input">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
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
                Send Otp
              </button>
            )}
            <button
              onClick={canselProcess}
              className="btn btn-secondary w-100 my-2"
            >
              Cansel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
