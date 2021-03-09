import { FormikProps, Field } from "formik";
import React from "react";
import { initialValuesTypes } from "./extra";

/**
 * Renders the boot first question (about the name)
 * @param props the formik props to me passed to the field
 * @param currentQuestion question id to determine if the input should be displayed or not
 * @returns an formik input and an alert in case the user answers it incorreclty or try to leave it blank
 */
export const firstQuestion = (props: FormikProps<initialValuesTypes>, currentQuestion) => {
  const { errors } = props;

  if (currentQuestion.id === 0) {
    return (
      <div className="form-field">
        <span className={`error-message ${errors.name ? "show" : ""}`}>{errors.name}</span>
        <Field name="name" placeholder="Digite sua resposta" />
      </div>
    );
  }
};

/**
 * Renders the boot second question (about the state)
 * @param props the formik props to me passed to the field
 * @param currentQuestion question id to determine if the input should be displayed or not
 * @param ufsList the list of Brazil's states to be renders as options on the field
 * @returns an formik input and an alert in case the user answers it incorreclty or try to leave it blank
 */
export const secondQuestion = (props: FormikProps<initialValuesTypes>, currentQuestion, ufsList) => {
  const { errors } = props;

  if (currentQuestion.id === 1) {
    return (
      <div className="form-field">
        <span className={`error-message ${errors.state ? "show" : ""}`}>{errors.state}</span>
        <Field as="select" name="state">
          {/* renders this as first option to force the user to select one and not leave it blank */}
          <option key="1" value={null}>
            Escolha um estado
          </option>
          {ufsList
            .sort(function (a, b) {
              var textA = a.nome.toUpperCase();
              var textB = b.nome.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            .map((uf) => (
              <option key={uf.id} value={uf.id}>
                {uf.nome}
              </option>
            ))}
        </Field>
      </div>
    );
  }
};

/**
 * Renders the boot third question (about the city)
 * @param props the formik props to me passed to the field
 * @param currentQuestion question id to determine if the input should be displayed or not
 * @param cities the list of the selected state's cities
 * @returns an formik input and an alert in case the user answers it incorreclty or try to leave it blank
 */
export const thirdQuestion = (props: FormikProps<initialValuesTypes>, currentQuestion, cities) => {
  const { errors } = props;

  if (currentQuestion.id === 2) {
    return (
      <div className="form-field">
        <span className={`error-message ${errors.city ? "show" : ""}`}>{errors.city}</span>
        <Field as="select" name="city">
          {/* renders this as first option to force the user to select one and not leave it blank */}
          <option key="1" value={null}>
            Escolha uma cidade
          </option>
          {cities
            .sort(function (a, b) {
              var textA = a.nome.toUpperCase();
              var textB = b.nome.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            .map((city) => (
              <option key={city.id} value={city.id}>
                {city.nome}
              </option>
            ))}
        </Field>
      </div>
    );
  }
};

/**
 * Renders the boot fourth question (about the birthday)
 * the input is changed to "date" type so it let the user choose to either type the date or select it
 * @param props the formik props to me passed to the field
 * @param currentQuestion question id to determine if the input should be displayed or not
 * @returns an formik input and an alert in case the user answers it incorreclty or try to leave it blank
 */
export const fourthQuestion = (props: FormikProps<initialValuesTypes>, currentQuestion) => {
  const { errors } = props;

  if (currentQuestion.id === 3) {
    return (
      <div className="form-field">
        <span className={`error-message ${errors.birthday ? "show" : ""}`}>{errors.birthday}</span>
        <Field type="date" name="birthday" placeholder="Digite sua resposta" />
      </div>
    );
  }
};

/**
 * Renders the boot fith question (about the email)
 * it is an input of type "email" to help to identify if the user is typing an valid email or not
 * @param props the formik props to me passed to the field
 * @param currentQuestion question id to determine if the input should be displayed or not
 * @returns an formik input and an alert in case the user answers it incorreclty or try to leave it blank
 */
export const fifthQuestion = (props: FormikProps<initialValuesTypes>, currentQuestion) => {
  const { errors } = props;

  if (currentQuestion.id === 4) {
    return (
      <div className="form-field">
        <span className={`error-message ${errors.email ? "show" : ""}`}>{errors.email}</span>
        <Field name="email" placeholder="Digite sua resposta" />
      </div>
    );
  }
};
