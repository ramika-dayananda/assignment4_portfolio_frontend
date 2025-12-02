import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "./axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Load user on first render if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axiosClient.get("/auth/me");
        setUser(res.data); // user data from backend
      } catch (err) {
        // token invalid → clear everything
        setUser(null);
        localStorage.removeItem("token");
        setToken(null);
      }

      setLoading(false);
    };

    loadUser();
  }, [token]);

  // LOGIN
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
