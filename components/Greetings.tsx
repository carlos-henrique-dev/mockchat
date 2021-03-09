type Props = {
  onClick: () => void;
};

export default function Greetings({ onClick }: Props) {
  return (
    <div className="greetings">
      <div className="content">
        <h1>
          Olá, seja bem vindo(a) ao <span>MockChat!</span>
        </h1>
        <h3>Antes de você começar a usar nosso chat, precisamos de algumas informações.</h3>
        <p>
          Clique em <span>AVANÇAR</span> para iniciar o seu registro.
        </p>
      </div>
      <button className="next-btn" onClick={onClick}>
        AVANÇAR
      </button>
    </div>
  );
}
