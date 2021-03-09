import axios from "axios";

const defaultUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

export default function handler(req, res) {
  const { ufcode } = req.query;
  return axios
    .get(`${defaultUrl}/${ufcode}/municipios`)
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(200).json([]);
    });
}
