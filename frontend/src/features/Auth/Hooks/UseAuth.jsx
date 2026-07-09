import { data } from "react-router";
import { setUser, setLoading, setError } from "../Auth.slice.js";
import { login, register, getMe, logout } from "../Services/Auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    const data = await register({ email, username, password });

    return data;
  }

  async function handleLogin({ email, password }) {
    const response = await login({ email, password });

    localStorage.setItem("token", response.token);

    dispatch(setUser(response.user));

    return response;
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
      dispatch(setLoading(false));
      return data;
    } catch (err) {
      dispatch(setError(err.response?.data?.message));
      dispatch(setLoading(false));
      throw err;
    }
  }

  async function handleLogout() {
    try {
      dispatch(setLoading(true));
      await logout();
    } catch (err) {
      console.error("Logout request failed", err);
    } finally {
      localStorage.removeItem("token");
      dispatch(setUser(null));
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin, handleGetMe, handleLogout };
};