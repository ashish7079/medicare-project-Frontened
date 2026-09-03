import axios from "axios";

// const axiosInstance = axios.create({

//   baseURL: "http://localhost:8080",

// });

const axiosInstance = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

});

// =========================
// REQUEST INTERCEPTOR
// =========================

axiosInstance.interceptors.request.use(

  (config) => {

    const token =
          localStorage.getItem(
            "token"
          );

    // TOKEN SEND
    if (token) {

      config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    console.log(
      "REQUEST ERROR:",
      error
    );

    return Promise.reject(error);
  }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================

axiosInstance.interceptors.response.use(

  (response) => {

    return response;
  },

  (error) => {

    console.log(
      "FULL ERROR:",
      error
    );

    console.log(
      "ERROR RESPONSE:",
      error.response
    );

    console.log(
      "ERROR STATUS:",
      error?.response?.status
    );

    console.log(
      "ERROR DATA:",
      error?.response?.data
    );

    // =========================
    // AUTO LOGOUT ONLY 403
    // =========================

    if (

      error.response &&

      error.response.status === 403

    ) {

      console.log(
        "403 ERROR - LOGOUT"
      );

      localStorage.clear();

      window.location.href =
            "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;