import React, { useEffect, useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import { FaRobot, FaUserSecret, FaSpinner } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import {
  botQuestions,
  ChatMessages,
  fieldsNames,
  initialChat,
  initialValues,
  initialValuesTypes,
  keyGen,
  schemaArray,
} from "./extra";
import { fifthQuestion, firstQuestion, fourthQuestion, secondQuestion, thirdQuestion } from "./fields";
import dayjs from "dayjs";
import axios from "axios";

function renderBotMessage(chatHistory: ChatMessages[]) {
  const isDate = (text: string) => dayjs(text).isValid();

  return chatHistory.map((message) => {
    const messageText = isDate(message.text);
    let text = message.text;

    if (messageText) {
      text = dayjs(message.text).format("DD/MM/YYYY");
    }

    return (
      <div key={message.id} className={`${message.from}-message`}>
        <div className="icon">{message.from === "bot" ? <FaRobot /> : <FaUserSecret />}</div>
        <span>{text}</span>
      </div>
    );
  });
}

type Props = {
  onContinue: () => void;
  ufsList: any[];
};

/* const defaultUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

function handler(req, res) {
  const { ufcode } = req.query;
  return axios
    .get(`${defaultUrl}/${ufcode}/municipios`)
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(200).json([]);
    });
} */

export default function RegistrationForm({ onContinue, ufsList }: Props) {
  const [chatHistory, setChatHistory] = useState<ChatMessages[]>(initialChat);
  const [currentQuestion, setCurrentQuestion] = useState({ id: 0, field: "name" });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCities(ufcode: number) {
    if (ufcode !== 0) {
      const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufcode}/municipios`);
      setCities([].concat.apply([], res.data));
    }
  }

  async function handleSave(values: initialValuesTypes) {
    setLoading(true);
    const uf = ufsList.find((uf) => uf.id === +values.state);
    const city = cities.find((city) => city.id === +values.city);
    axios
      .post("https://6046c3abf0c6dc00177b2333.mockapi.io/signup", {
        name: values.name,
        birthday: values.birthday,
        state: uf.nome,
        city: city.nome,
        email: values.email,
      })
      .then(() => {
        setLoading(false);
      });
  }

  async function handleAnswer(values) {
    let text = values[currentQuestion.field];

    if (currentQuestion.field === "state") {
      getCities(+values[currentQuestion.field]);
      const uf = ufsList.find((uf) => uf.id === +values[currentQuestion.field]);
      text = uf.nome;
    }

    if (currentQuestion.field === "city") {
      const city = cities.find((city) => city.id === +values[currentQuestion.field]);
      text = city.nome;
    }

    const newHistory = [
      ...chatHistory,
      {
        id: keyGen(),
        from: "user",
        text,
      },
    ];

    if (currentQuestion.id <= 4) {
      if (currentQuestion.id === 4) {
        await handleSave(values);
      }

      newHistory.push(botQuestions(currentQuestion.id, text));
      setChatHistory(newHistory);
      setCurrentQuestion({ id: currentQuestion.id + 1, field: fieldsNames[currentQuestion.id + 1] });
    }

    let chatscreen = document.getElementById("content");
    chatscreen.scrollTop = chatscreen.scrollHeight;
  }

  return (
    <div className="registration">
      <div className="content" id="content">
        {renderBotMessage(chatHistory)}
      </div>

      {loading ? (
        <div className="form-spinner">
          <FaSpinner className="fa-spin" />
        </div>
      ) : (
        <>
          {currentQuestion.id <= 4 ? (
            <div className="form-input">
              <Formik
                onSubmit={handleAnswer}
                initialValues={initialValues}
                validationSchema={schemaArray[currentQuestion.id]}
              >
                {(props: FormikProps<initialValuesTypes>) => (
                  <Form>
                    {firstQuestion(props, currentQuestion)}
                    {secondQuestion(props, currentQuestion, ufsList)}
                    {thirdQuestion(props, currentQuestion, cities)}
                    {fourthQuestion(props, currentQuestion)}
                    {fifthQuestion(props, currentQuestion)}
                    <button type="submit">
                      <IoMdSend />
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <button className="finish-button" onClick={onContinue}>
              Continuar
            </button>
          )}
        </>
      )}
    </div>
  );
}
