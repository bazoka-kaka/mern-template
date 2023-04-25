import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        const { accessToken, user, roles } = response?.data;
        console.log(JSON.stringify(prev));
        console.log(accessToken, user, roles);
        return { ...prev, accessToken, user, roles };
      });
    } catch (err) {
      console.error(err?.message);
    }
  };

  return refresh;
};

export default useRefreshToken;
