// utils/tokenUtils.js
export const getToken = () => sessionStorage.getItem("accessToken");

export const setToken = (token, expiryTime) => {
  sessionStorage.setItem("accessToken", token);
  sessionStorage.setItem("accessTokenExpiry", expiryTime);
};

export const clearToken = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessTokenExpiry");
};
