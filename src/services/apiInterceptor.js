import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://10.5.17.141:8000";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token " + localStorage.getItem("token"),
  },
});

// Request interceptor for axiosInstance
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, such as adding headers or tokens
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for axiosInstance
axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle the response data here
    return response.data;
  },
  (error) => {
    // You can handle errors here
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access error
      toast.error("Token Expired. Please login again.");
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // Handle other errors
      console.log("An error occurred");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
