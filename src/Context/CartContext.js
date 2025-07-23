import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let CartContext = createContext();
export function CartProvider({ children }) {
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  async function getUserCart() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  async function addCart(id) {
    let body = {
      productId: id,
    };
    return await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      body,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }
  async function deleteProductInCart(id) {
    return await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }
  async function updateProductQuantity(id, count) {
    let body = {
      count,
    };
    return await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      body,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }
  async function clearCart() {
    return await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addCart,
        getUserCart,
        deleteProductInCart,
        updateProductQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
