import { useState, createContext } from "react";

export const MyContext = createContext();

const Context = ({ children }) => {
  const [page, setPage] = useState(1);
  return (
    <MyContext.Provider value={{ page, setPage }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
