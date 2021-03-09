import React from "react";
import Layout from "../components/Layout";
import { AiFillSetting, AiOutlineHistory } from "react-icons/ai";
import { BsChatFill } from "react-icons/bs";

function Home() {
  return (
    <Layout>
      <div className="title">
        <h1>MockChat</h1>
      </div>
      <div className="home-container">
        <div className="menu">
          <span>
            <BsChatFill />
            Conversas
          </span>
          <span>
            <AiFillSetting />
            Stories
          </span>
          <span>
            <AiOutlineHistory />
            Configurações
          </span>
        </div>
        <div className="content">
          <p>Você ainda não tem nenhuma conversa.</p>
        </div>
      </div>
    </Layout>
  );
}
/* 
export async function getServerSideProps() {
  return { props: {} };
}
 */
export default Home;
