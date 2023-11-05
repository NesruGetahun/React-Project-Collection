import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children, userInit, userReducer }) => {
  return (
    <UserContext.Provider value={useReducer(userReducer, userInit)}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
