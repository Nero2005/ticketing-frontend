import React, { useState } from "react";
import axios from "axios";
import { h, http } from "../utils/api";
import { UseRequest } from "../utils/typings";

const useRequest = ({ url, method, body, onSuccess }: UseRequest) => {
  const [errors, setErrors] = useState<JSX.Element>(null!);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const res = await h[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(res.data);
      }
      return res.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err.response?.data?.errors?.map((err, index) => (
              <li key={index + 1}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
export default useRequest;
