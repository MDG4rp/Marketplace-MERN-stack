import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";

const refresh = createRefresh({
  interval: 300000,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post("/refresh", param, {
        headers: { Authorization: `Bearer ${param.authToken}` },
      });

      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 900000,
        newRefreshTokenExpiresIn: 86400000,
      };
    } catch (error) {
      console.error("Token refresh failed:", error);
      return {
        isSuccess: false,
        newAuthToken: "",
        newAuthTokenExpireIn: 0,
        newRefreshTokenExpiresIn: 0,
      };
    }
  },
});

export default refresh;
