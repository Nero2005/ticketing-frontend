import Router from "next/router";
import React, { useState } from "react";
import useRequest from "../../hooks/useRequest";
import { IUser } from "../../utils/typings";

type Props = {
  user: IUser;
};

const NewTicket = ({ user }: Props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string | number>("");

  const onBlur = () => {
    const value = parseFloat(price as string);
    if (isNaN(value)) return;
    setPrice(value.toFixed(2));
  };

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price: parseFloat(price as string),
    },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      doRequest();
    } else {
      Router.push("/auth/signin");
    }
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
