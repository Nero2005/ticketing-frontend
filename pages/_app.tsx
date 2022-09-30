// import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { h, http } from "../utils/api";
import { IUser } from "../utils/typings";

interface AppP extends AppProps {
  user: IUser;
}

function MyApp({ Component, pageProps, user }: AppP) {
  return (
    <div>
      <Header user={user} />
      <div className="container">
        <Component {...pageProps} user={user} />
      </div>
    </div>
  );
}
MyApp.getInitialProps = async (appCtx) => {
  try {
    const client = http(appCtx.ctx);
    const res = await client.get("/api/users/currentuser");
    let pageProps = {};
    if (appCtx.Component.getInitialProps) {
      pageProps = await appCtx.Component.getInitialProps(
        appCtx.ctx,
        client,
        res.data.user
      );
    }
    return {
      pageProps,
      user: res.data.user as IUser,
    };
  } catch (err) {
    console.log(err.message);
    return {};
  }
};
export default MyApp;
