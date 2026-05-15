import { CheckCircle } from "lucide-react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function SucessoVacina({ setPage, vacinaAgendada }) {
  return (
    <>
      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <section className="card successCard">
          <CheckCircle size={145} color="#00a6ac" />

          <h3>Vacina Agendada!</h3>

          <p>
            Sua vacina <strong>{vacinaAgendada?.vacina}</strong> foi agendada
            com sucesso.
          </p>

          <p>
            <strong>Unidade:</strong> {vacinaAgendada?.unidade}
          </p>

          {vacinaAgendada?.endereco && (
            <p>
              <strong>Endereço:</strong> {vacinaAgendada.endereco}
            </p>
          )}

          <p>
            <strong>Data:</strong> {vacinaAgendada?.data} às{" "}
            {vacinaAgendada?.horario}
          </p>

          <button className="primaryBtn" onClick={() => setPage("home")}>
            Início
          </button>

          <button className="linkBtn" onClick={() => setPage("minhasVacinas")}>
            Ver Vacinas
          </button>
        </section>

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}
