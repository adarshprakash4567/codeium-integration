import axios from "axios";
import axiosInstance from "../apiInterceptor";

const base = "http://10.5.17.141:8000";



export const login = async (formData) => {
  try {
    const response = await axiosInstance.post(`/authorize/login`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signup = async (formData) => {
  
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const response = await axios.post(`${base}/register/`, formData, config);
    return response;
  } catch (error) {
    throw error;
  }
};
export const ReferFriendRegistration = async (formData) => {
  
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const response = await axios.post(`${base}/members/refer-friend-registration`, formData, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get(
    '/members/user-details'
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserList = async (page_size, page) => {
  try {
    const response = await axiosInstance.get(
      `/members/view-all-user-details?page_size=${page_size}&page=${page}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const EditUserDetail = async (formData) => {
  
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const response = await axiosInstance.put(`/members/update-user-details`, formData, config);
    return response;
  } catch (error) {
    throw error;
  }
};
export const ReferFriend = async (data) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const response = await axiosInstance.post(
    'members/refer-friend',data,config
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const EditPassword = async (data) => {
  try {
    const response = await axiosInstance.put(
    'members/edit-password',data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

