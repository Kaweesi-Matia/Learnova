import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("learnhub_user")); } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("learnhub_token");
    if (!token) return setLoading(false);
    api.get("/auth/me").then(({ data }) => {
      setUser(data.user);
      localStorage.setItem("learnhub_user", JSON.stringify(data.user));
    }).catch(() => {
      localStorage.removeItem("learnhub_token");
      localStorage.removeItem("learnhub_user");
      setUser(null);
    }).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("learnhub_token", data.token);
    localStorage.setItem("learnhub_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("learnhub_token", data.token);
    localStorage.setItem("learnhub_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("learnhub_token");
    localStorage.removeItem("learnhub_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
