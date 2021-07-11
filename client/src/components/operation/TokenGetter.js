import axios from "axios";
const TokenGetter = async (Token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "/api/auth/refresh",
      { refreshToken: localStorage.getItem("refreshToken") },
      config
    );
    localStorage.setItem("accessToken", data.accessToken);
    return true;
  } catch (error) {
    return error;
  }
};

export default TokenGetter;
