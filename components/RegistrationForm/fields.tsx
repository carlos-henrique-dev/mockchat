import { FormikProps, Field } from "formik";
import React from "react";
import { initialValuesTypes } from "./extra";

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
export const secondQuestion = (props: FormikProps<initialValuesTypes>, currentQuestion, ufsList) => {
  const { errors } = props;

  if (currentQuestion.id === 1) {
    return (
      <div className="form-field">
        <span className={`error-message ${errors.state ? "show" : ""}`}>{errors.state}</span>
        <Field as="select" name="state">
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

export const thirdQuestion = (props: FormikProps<initialValuesTypes>, currentQuestion, cities) => {
  const { errors } = props;

  if (currentQuestion.id === 2) {
    return (
      <div className="form-field">
        <span className={`error-message ${errors.city ? "show" : ""}`}>{errors.city}</span>
        <Field as="select" name="city">
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
