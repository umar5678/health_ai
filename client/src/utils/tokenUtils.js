// utils/tokenUtils.js
export const getToken = () => sessionStorage.getItem("accessToken");

export const setToken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

export const clearToken = () => {
  sessionStorage.removeItem("accessToken");
};
