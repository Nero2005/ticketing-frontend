import Router from "next/router";
import React from "react";
import useRequest from "../../hooks/useRequest";
import { ITicket } from "../../utils/typings";

type Props = {
  ticket: ITicket;
};

const Ticket = ({ ticket }: Props) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess: (data) =>
      Router.push("/orders/[orderId]", `/orders/${data.order.id}`),
  });
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

Ticket.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const res = await client.get(`/api/tickets/${ticketId}`);
  return {
    ticket: res.data.ticket,
  };
};

export default Ticket;
