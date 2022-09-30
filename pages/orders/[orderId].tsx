import Router from "next/router";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/useRequest";
import { IOrder, IUser } from "../../utils/typings";

type Props = {
  order: IOrder;
  user: IUser;
};

const Order = ({ order, user }: Props) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, []);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={(token) => doRequest({ token: token.id })}
        stripeKey="pk_test_51LnGW2Dxh2qeYghWYrD18PXZfOaLHyc9HjUHFbPdyRnPBZB1o1K4SVVLAYQsGpUjNyGgbifQ9exP6OZUCmaOLByn009prDPR6q"
        amount={order.ticket.price * 100}
        email={user.email}
      />
      {errors}
    </div>
  );
};

Order.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const res = await client.get(`/api/orders/${orderId}`);
  console.log(res.data);
  return {
    order: res.data.order,
  };
};

export default Order;
