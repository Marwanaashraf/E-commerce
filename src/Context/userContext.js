import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
//1-create context
export let UserContext = createContext();
//2-provide app
export function UserProvider({ children }) {
  let [token, setToken] = useState(null);
  let [decodingData, setdecodingData] = useState(null);
  useEffect(() => {
    if (token != null) {
      setdecodingData(jwtDecode(token));
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken ,decodingData, setdecodingData}}>
      {children}
    </UserContext.Provider>
  );
}
