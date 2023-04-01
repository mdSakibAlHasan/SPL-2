import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:3001/api/login", inputs);
    Cookies.set(res.data, 'my_cookies', { expires: 1 });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:3001/api/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
