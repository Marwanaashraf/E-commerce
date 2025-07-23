import React, { useContext, useEffect } from "react";
import Layout from "./Component/Layout/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home/Home.jsx";
import Categories from "./Component/Categories/Categories.jsx";
import Products from "./Component/Products/Products.jsx";
import Brands from "./Component/Brands/Brands.jsx";
import Cart from "./Component/Cart/Cart.jsx";
import Profile from "./Component/Profile/Profile.jsx";
import Login from "./Component/Login/Login.jsx";
import Signup from "./Component/Signup/Signup.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword.jsx";
import { UserContext, UserProvider } from "./Context/userContext.js";
import GuardRouting from "./Component/Guard/GuardRouting.js";
import VerifyCode from "./Component/VerifyCode/VerifyCode.jsx";
import { EmailProvider } from "./Context/emailContext.js";
import ResetPassword from "./Component/ResetPassword/ResetPassword.jsx";
import SpecificCategory from "./Component/SpecificCategory/SpecificCategory.jsx";
import SpecificBrand from "./Component/SpecificBrand/SpecificBrand.jsx";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartProvider } from "./Context/CartContext.js";
import Checkout from "./Component/Checkout/Checkout.jsx";
import AllOrders from "./Component/AllOrders/AllOrders.jsx";
import EditProfile from "./Component/EditProfile/EditProfile.jsx";
import UpdateLogedPassword from "./Component/UpdateLogedPassword/UpdateLogedPassword.jsx";
import { FavouriteProvider } from "./Context/FavouriteContext.js";
import Witchlist from "./Component/Witchlist/Witchlist.jsx";
import { AllProductsProvider } from "./Context/AllProducts.js";
import SearchProducts from "./Component/SearchProducts/SearchProducts.jsx";
import PaymentMethod from "./Component/PaymentMethod/PaymentMethod.jsx";
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
              <Profile />
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
