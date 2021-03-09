import * as Yup from "yup";

/**
 * Create the yup schema separately
 * so it can be accessed  one by one, since the inputs appear only one at the time
 */
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

/**
 * Just a random key generator for the chat messasges
 * @returns A random 7 char string
 */
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

/**
 * defines a initial message for the bot
 */
export const initialChat: ChatMessages[] = [
  {
    id: keyGen(),
    from: "bot",
    text: "Olá, eu sou o mockinho, tudo bem? Para começarmos, preciso saber o seu nome.",
  },
];

/**
 * defines the sequence of the questions to make it easier to know in what step the bot is in and what to do
 */
export const fieldsNames = ["name", "state", "city", "birthday", "email"];

/**
 * Based on the question id (steop) the user is, this function returns the bot's question
 * @param questionId It's the quesiton id after the last answer
 * @param answer The last previous answer to be displayed on the next question
 * @returns A string with the bot's next question
 */
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
