import { CheckCircle } from "lucide-react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function SucessoConsulta({ setPage, consultaAgendada }) {
  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <section className="card successCard">
          <CheckCircle size={145} color="#00a6ac" />

          <h3>Consulta Agendada!</h3>

          <p>
            Sua consulta de <strong>{consultaAgendada?.especialidade}</strong>{" "}
            foi agendada com sucesso.
          </p>

          <p>
            <strong>Clínica:</strong> {consultaAgendada?.clinica}
          </p>

          {consultaAgendada?.endereco && (
            <p>
              <strong>Endereço:</strong> {consultaAgendada.endereco}
            </p>
          )}

          <p>
            <strong>Data:</strong> {consultaAgendada?.data} às{" "}
            {consultaAgendada?.horario}
          </p>

          <button className="primaryBtn" onClick={() => setPage("home")}>
            Início
          </button>

          <button className="linkBtn" onClick={() => setPage("minhasConsultas")}>
            Ver Consultas
          </button>
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}
