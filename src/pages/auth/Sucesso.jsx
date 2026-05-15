import { CheckCircle } from "lucide-react";
import Header from "../../components/Header";

export default function Sucesso({ goHome }) {
  return (
    <>
      <Header title="ClickSUS" subtitle="Bem-vindo(a)" />

      <main className="screen">
        <section className="card successCard">
          <CheckCircle size={150} color="#00a6ac" />
          <h3>SUCESSO!</h3>
          <p>Seu cadastro foi concluído com sucesso.</p>

          <button className="primaryBtn" onClick={goHome}>
            Continuar
          </button>
        </section>
      </main>
    </>
  );
}
