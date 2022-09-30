import React, { useState } from "react";
import axios from "axios";
import { http } from "../../utils/api";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { name, email, password },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default Signup;
