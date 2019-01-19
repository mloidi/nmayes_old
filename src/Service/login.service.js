import axios from "axios";
// import Auth from "./auth.common";

axios.defaults.baseURL = "https://backend-mloidi.herokuapp.com";

// axios.interceptors.response.use(
//   res => res.data,
//   err => Promise.reject(err.response)
// );

// const getAuthHeader = () => ({ Authorization: `Bearer ${Auth.getToken()}` });

export const LoginService = {
  login: async (email, password) => {
    return await axios.post("/auth", { email, password });
  }
};
