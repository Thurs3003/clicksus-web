import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import ConsultaTabs from "../../components/ConsultaTabs";

export default function MinhasConsultas({ setPage }) {
  const consultas = JSON.parse(localStorage.getItem("clicksusConsultas")) || [];

  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <ConsultaTabs setPage={setPage} active="minhasConsultas" />

        <h3 className="sectionTitle">Minhas Consultas</h3>

        {consultas.length > 0 ? (
          <section className="historyList">
            {consultas.map((consulta, index) => (
              <article className="myAppointmentCard" key={index}>
                <div className="appointmentDate">
                  <strong>{consulta.data}</strong>
                  <span>{consulta.horario}</span>
                </div>

                <div>
                  <h3>{consulta.especialidade}</h3>
                  <p>{consulta.clinica}</p>
                  {consulta.endereco && <p>📍 {consulta.endereco}</p>}
                  <p>Status: {consulta.status}</p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="appointmentBox">
            <p>Nenhuma consulta agendada no momento.</p>

            <button className="primaryBtn" onClick={() => setPage("consultas")}>
              Agendar
            </button>
          </section>
        )}

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}
