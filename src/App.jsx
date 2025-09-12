import React, { useContext, useEffect } from "react";
import Home from "./Pages/Home/Home.jsx";
import GuardRouting from "./Component/Guard/GuardRouting.js";
import Layout from "./Pages/Layout/Layout.jsx";
import Categories from "./Pages/Categories/Categories.jsx";
import Products from "./Pages/Products/Products.jsx";
import SpecificCategory from "./Pages/SpecificCategory/SpecificCategory.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import SearchProducts from "./Pages/SearchProducts/SearchProducts.jsx";
import Brands from "./Pages/Brands/Brands.jsx";
import SpecificBrand from "./Pages/SpecificBrand/SpecificBrand.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Witchlist from "./Pages/Witchlist/Witchlist.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import PaymentMethod from "./Pages/PaymentMethod/PaymentMethod.jsx";
import AllOrders from "./Pages/AllOrders/AllOrders.jsx";
import EditProfile from "./Pages/EditProfile/EditProfile.jsx";
import UpdateLogedPassword from "./Pages/UpdateLogedPassword/UpdateLogedPassword.jsx";
import Login from "./Pages/auth/Login/Login.jsx";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import Signup from "./Pages/auth/Signup/Signup.jsx";
import ForgetPassword from "./Pages/auth/ForgetPassword/ForgetPassword.jsx";
import VerifyCode from "./Pages/auth/VerifyCode/VerifyCode.jsx";
import ResetPassword from "./Pages/auth/ResetPassword/ResetPassword.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./Context/userContext.js";
import { FavouriteProvider } from "./Context/FavouriteContext.js";
import { CartProvider } from "./Context/CartContext.js";
import { AllProductsProvider } from "./Context/AllProducts.js";
import { EmailProvider } from "./Context/emailContext.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


export default function App() {
  let Query = new QueryClient();
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: (
            <GuardRouting>
              <Home />
            </GuardRouting>
          ),
        },
        {
          path: "categories/:id",
          element: (
            <GuardRouting>
              <SpecificCategory />
            </GuardRouting>
          ),
        },
        {
          path: "categories",
          element: (
            <GuardRouting>
              <Categories />
            </GuardRouting>
          ),
        },
        {
          path: "product/:id",
          element: (
            <GuardRouting>
              <ProductDetails />
            </GuardRouting>
          ),
        },
        {
          path: "products",
          element: (
            <GuardRouting>
              <Products />
            </GuardRouting>
          ),
        },
        {
          path: "searchproducts",
          element: (
            <GuardRouting>
              <SearchProducts /> 
            </GuardRouting>
          ),
        },
        {
          path: "brands",
          element: (
            <GuardRouting>
              <Brands />
            </GuardRouting>
          ),
        },
        {
          path: "brands/:id",
          element: (
            <GuardRouting>
              <SpecificBrand />
            </GuardRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <GuardRouting>
              <Cart />
            </GuardRouting>
          ),
        },
        {
          path: "profile",
          element: (
            <GuardRouting>
              <Profile  />
            </GuardRouting>
          ),
        },
        {
          path: "witchlist",
          element: (
            <GuardRouting>
              <Witchlist />
            </GuardRouting>
          ),
        },
        {
          path: "checkout/:id/:payment",
          element: (
            <GuardRouting>
              <Checkout />
            </GuardRouting>
          ),
        },
        {
          path: "checkout/:id",
          element: (
            <GuardRouting>
              <PaymentMethod />
            </GuardRouting>
          ),
        },
        {
          path: "cart/allorders",
          element: (
            <GuardRouting>
              <AllOrders />
            </GuardRouting>
          ),
        },
        {
          path: "profile/editprofile",
          element: (
            <GuardRouting>
              <EditProfile />
            </GuardRouting>
          ),
        },
        {
          path: "profile/changepassword",
          element: (
            <GuardRouting>
              <UpdateLogedPassword />
            </GuardRouting>
          ),
        },
        { index: true, path: "login", element: <Login /> },
        { path: "E-commerce", element: <WelcomePage /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "forgetpassword/verifycode", element: <VerifyCode /> },
        {
          path: "forgetpassword/verifycode/resetpassword",
          element: <ResetPassword />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <div>
      <QueryClientProvider client={Query}>
        <UserProvider>
          <FavouriteProvider>
            <CartProvider>
              <AllProductsProvider>
                <EmailProvider>
                  <RouterProvider router={routes} />
                </EmailProvider>
              </AllProductsProvider>
            </CartProvider>
          </FavouriteProvider>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}
