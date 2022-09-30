import React from "react";
import { IOrder } from "../../utils/typings";

type Props = {
  orders: IOrder[];
};

const Orders = ({ orders }: Props) => {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
};

Orders.getInitialProps = async ({ req }, client, user) => {
  const res = await client.get("/api/orders");
  return {
    orders: res.data.orders as IOrder[],
  };
};

export default Orders;
