import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err?.message);
    }
  };

  return logout;
};

export default useLogout;
