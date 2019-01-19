import axios from "axios";
import Auth from "../common/auth.common";

axios.defaults.baseURL = "https://backend-mloidi.herokuapp.com";

axios.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err.response)
);

const getAuthHeader = () => ({ Authorization: `Bearer ${Auth.getToken()}` });

export const BlogService = {
  getPublicBlogs: async () => {
    return await axios.get("/blog");
  },

  getBlogs: async () => {
    return await axios.get("/secure/blog", {
      headers: getAuthHeader()
    });
  },

  getBlog: async blogId => {
    return await axios.get(`/blog/${blogId}`);
  },

  getBlogSecure: async blogId => {
    return await axios.get(`/secure/blog/${blogId}`, {
      headers: getAuthHeader()
    });
  },

  saveBlog: async blog => {
    return await axios.patch(
      "/secure/blog/",
      { blog },
      {
        headers: getAuthHeader()
      }
    );
  },

  newBlog: async blog => {
    return await axios.post(
      "/secure/blog/",
      { blog },
      {
        headers: getAuthHeader()
      }
    );
  }
};
