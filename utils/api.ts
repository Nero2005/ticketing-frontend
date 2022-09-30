import axios from "axios";

// export const http = axios.create({
//   baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
//   withCredentials: true,
// });

export const http = ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://localhost",
      headers: req.headers,
      withCredentials: true,
    });
  } else {
    return axios.create({
      baseURL: "http://localhost",
      withCredentials: true,
    });
  }
};

export const h = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
});
