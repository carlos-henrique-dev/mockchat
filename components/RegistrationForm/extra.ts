import * as Yup from "yup";

const schemaErrorMessage = "Preencha corretamente.";
const nameSchema = Yup.object().shape({
  name: Yup.string().required(schemaErrorMessage),
});

const stateSchema = Yup.object().shape({
  state: Yup.string().required(schemaErrorMessage),
});
const citySchema = Yup.object().shape({
  city: Yup.string().required(schemaErrorMessage),
});
const birthdaySchema = Yup.object().shape({
  birthday: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(schemaErrorMessage),
});
const emailSchema = Yup.object().shape({
  email: Yup.string().email("Insira um email válido").required(schemaErrorMessage),
});

export const schemaArray = [nameSchema, stateSchema, citySchema, birthdaySchema, emailSchema];

export const keyGen = () => Math.random().toString(36).substring(7);

export type ChatMessages = {
  id: string;
  from: string;
  text: string;
};

export type initialValuesTypes = {
  name: string;
  state: string;
  city: string;
  birthday: string;
  email: string;
};

export const initialValues: initialValuesTypes = {
  name: "",
  state: "",
  city: "",
  birthday: "",
  email: "",
};

export const initialChat: ChatMessages[] = [
  {
    id: keyGen(),
    from: "bot",
    text: "Olá, eu sou o mockinho, tudo bem? Para começarmos, preciso saber o seu nome.",
  },
];

export const fieldsNames = ["name", "state", "city", "birthday", "email"];

export const botQuestions = (questionId: number, answer: string) => {
  const text = [
    `Prazer em te conhecer, ${answer}. Agora que sei seu nome, de qual estado você é?`,
    `${answer}... que legal! e de qual cidade?`,
    `Olha só! ${answer}, minha terra natal... E agora, sobre seu aniversário, quando foi que você nasceu?`,
    `Ta na jovem ainda... E, pra finalizar, qual o seu melhor email?`,
    `Muito bom! Obrigado pelas informações, guardarei elas com muito cuidado. Agora clique em CONTINUAR para salvar e ir para a tela principal`,
  ];

  return {
    id: keyGen(),
    from: "bot",
    text: text[questionId],
  };
};
