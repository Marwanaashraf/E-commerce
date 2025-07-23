import { createContext, useState } from "react";

export let EmailContext = createContext();
export function EmailProvider({ children }) {
  let [email, setEmail] = useState("");
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}
