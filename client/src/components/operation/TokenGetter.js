import axios from "axios";
const TokenGetter = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post(
    "/api/auth/refresh",
    { refreshToken: localStorage.getItem("refreshToken") },
    config
  );
  localStorage.setItem("accessToken", data.accessToken);
};

export default TokenGetter;
