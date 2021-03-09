import axios from "axios";
import React, { useState } from "react";
import Greetings from "../components/Greetings";
import Layout from "../components/Layout";
import RegistrationForm from "../components/RegistrationForm";
import { useRouter } from "next/router";

export default function Index({ ufs }) {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const onclick = () => setShowForm(!showForm);

  const onContinue = () => {
    router.push("/home");
  };

  return (
    <Layout>
      {!showForm ? <Greetings onClick={onclick} /> : <RegistrationForm onContinue={onContinue} ufsList={ufs} />}
    </Layout>
  );
}

export async function getStaticProps() {
  const defaultUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  let ufs = [];
  await axios
    .get(defaultUrl)
    .then((result) => {
      ufs = result.data;
    })
    .catch((err) => {
      ufs = [];
    });

  return {
    props: { ufs },
  };
}
