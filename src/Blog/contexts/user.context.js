import { createContext, useReducer, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children, init_value, reducer }) => {
  return (
    <UserContext.Provider value={useReducer(reducer, init_value)}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
