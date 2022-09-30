import axios from "axios";
import Link from "next/link";
import React from "react";
import { http } from "../utils/api";
import { ITicket, IUser } from "../utils/typings";

type Props = {
  user: IUser;
  tickets: ITicket[];
};

const Home = ({ user, tickets }: Props) => {
  console.log(tickets);
  const ticketList = tickets?.map((ticket) => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
        <Link href={`/tickets/[ticketId]`} as={`/tickets/${ticket.id}`}>
          <a>View</a>
        </Link>
      </td>
    </tr>
  ));
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <td>Link</td>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

Home.getInitialProps = async ({ req }, client, user) => {
  const res = await client.get("/api/tickets");
  return {
    tickets: res.data.tickets as ITicket[],
  };
};

export default Home;
