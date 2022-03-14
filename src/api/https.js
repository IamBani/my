import axios from "axios";
import Vue from 'vue'
import config from "../Config";
const instance = axios.create({
    
  baseURL: config.baseUrl,
  // baseURL: "/api",
  timeout: 8000,
  headers: {
    // "Content-Type": "multipart/form-data",
    // "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {

    let token =
      localStorage.getItem("token") &&
      JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 请求响应器
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  (error) => {
    return Promise.reject(error.response);
  }
);

export const fetchApi = (opt) => {
  const { data, headers, method, url, isToast = true, page } = opt;
  return new Promise((resolve, reject) => {
    let pages = page ? `?pageNo=${page}` : "";
    return instance({
      method: method || "post",
      url: url + pages,
      headers,
      data,
    })
      .then((res) => {
        // 错误提示处理
        if (isToast) {
          if (!res.success && res.Msg) Vue.prototype.$message.error(res.Msg);
        }

        resolve(res);
      })
      .catch((err) => {
        if (isToast && err.status != 500) {
          Vue.prototype.$message.error("服务器错误!");
        }
        resolve(err);
      });
  });
};

export const fetchApiGet = (opt) => {
  const { data, headers, url, isToast = true } = opt;
  return new Promise((resolve, reject) => {
    return instance({
      method: "get",
      url,
      headers,
      params: data,
    })
      .then((res) => {
        // 错误提示处理
        if (isToast) {
          if (!res.success && res.Msg) Vue.prototype.$message.error(res.Msg);
        }

        resolve(res);
      })
      .catch((err) => {
        if (isToast && err.status != 500) {
          Vue.prototype.$message.error("服务器错误!");
        }
        resolve(err);
      });
  });
};
