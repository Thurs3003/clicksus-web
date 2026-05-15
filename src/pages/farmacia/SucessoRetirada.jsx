import { CheckCircle } from "lucide-react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function SucessoRetirada({ setPage, retiradaMedicamento }) {
  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <section className="card successCard">
          <CheckCircle size={145} color="#00a6ac" />

          <h3>Retirada Confirmada!</h3>

          <p>
            Seu medicamento{" "}
            <strong>{retiradaMedicamento?.medicamento}</strong> estará
            disponível para retirada em:
          </p>

          <p>
            <strong>{retiradaMedicamento?.data}</strong>
          </p>

          <p>{retiradaMedicamento?.unidade}</p>

          <button className="primaryBtn" onClick={() => setPage("farmacia")}>
            Voltar à Farmácia
          </button>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}
