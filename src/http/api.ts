// import axios from "axios";
// import { SERVER_URL } from "@/http";
// import { useAuthStore } from "@/stores/auth.store";

// const api = axios.create({
//   baseURL: SERVER_URL,

// });

// api.interceptors.request.use((config) => {
//   const { access } = useAuthStore.getState();
//   if (access) {
//     config.headers.Authorization = `Bearer ${access}`;
//   }
//   return config;
// });


// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const { refresh } = useAuthStore.getState();
//         const { data } = await axios.post(`${SERVER_URL}/auth/token/refresh`, {
//           refresh,
//         });
//         useAuthStore.getState().setAccess(data.access);
//         originalRequest.headers.Authorization = `Bearer ${data.access}`;
//         return api(originalRequest); 
//       } catch (err) {
//         useAuthStore.getState().setIsAuth(false);
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
