import Head from "next/head";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Layout({ children }: Props) {
  return (
    <div className="container">
      <Head>
        <title>MockChat Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">{children}</main>

      <footer className="footer">
        Made with<span>&#9829;</span>by Carlos Henrique
      </footer>
    </div>
  );
}
