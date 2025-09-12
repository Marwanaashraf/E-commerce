import React from "react";
import errorImage from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <img className="w-50" src={errorImage} alt="error" />
    </div>
    </>
  );
}
