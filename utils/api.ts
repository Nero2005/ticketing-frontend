import axios from "axios";

// export const http = axios.create({
//   baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
//   withCredentials: true,
// });

export const http = ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_SERVER!,
      headers: req.headers,
      withCredentials: true,
    });
  } else {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT!,
      withCredentials: true,
    });
  }
};

export const h = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT!,
  withCredentials: true,
});
