import axios from "axios";
import { createContext } from "react";
//1-create context
export let AllProductsContext = createContext();
//2-provide app
export function AllProductsProvider({ children }) {
  async function getAllProducts() {
    let req1 = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products?page=1"
    );
    let req2 = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products?page=2"
    );
    return [...req1.data.data, ...req2.data.data];
  }
  return (
    <AllProductsContext.Provider value={{ getAllProducts }}>
      {children}
    </AllProductsContext.Provider>
  );
}
