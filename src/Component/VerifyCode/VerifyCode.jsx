import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./VerifyCode.css";
import { EmailContext } from "../../Context/emailContext.js";
import { Helmet } from "react-helmet";
export default function VerifyCode() {
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState(null);
  let { email, setEmail }= useContext(EmailContext)
 
  let verifyEmail = localStorage.getItem("verifyEmail")
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("code is required")
      .matches(/^[0-9]{4,6}$/, "code must be contain 4 to 6 numbers"),
  });
  async function submitForm(values) {
    console.log(values);
    setLoading(true);
    let req = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorMsg(error.response.data.message);
      });
    if (req.data.status == "Success") {
      setLoading(false);
      setErrorMsg(null);
      toast.success(req.data.status);
      navigate("resetpassword")
    }
   
    
  }
  let formik = useFormik({
    initialValues: {
      email:verifyEmail,    
      resetCode: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Code</title>
   
      </Helmet>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="forms ">
        <form onSubmit={formik.handleSubmit} className="contain-form py-5 ">
          <div className="my-3 text-center">
            <img className="" src={logo} alt="" />
            <h3 className="text-main">Code Verification</h3>
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
            <label htmlFor="resetCode">Code</label>
            <div className="form-input">
              <input
                type="text"
                name="resetCode"
                id="resetCode"
                className="form-control"
                placeholder="enter code sent to your email"
                maxLength={6}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <i class="fa-solid fa-code-compare"></i>
            </div>
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <p className="text-danger font-sm">
                <i className="fa-solid fa-circle-exclamation"></i>{" "}
                {formik.errors.resetCode}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="my-3 text-center">
            {loading ? (
              <button type="button" className="btn btn-success w-100">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (   
              <button
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
                className="btn btn-success w-100"
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
