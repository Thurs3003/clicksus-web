import { useState } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function MinhasVacinas({ setPage, user }) {
  const vacinas = JSON.parse(localStorage.getItem("clicksusVacinas")) || [];
  const [view, setView] = useState("lista");
  const usuario = user || JSON.parse(localStorage.getItem("clicksusUser")) || {};

  return (
    <>
      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <button className="backBtn" onClick={() => setPage("vacinas")}>
          ← Voltar para Vacinas
        </button>

        <h3 className="sectionTitle">Minhas Vacinas</h3>

        {vacinas.length > 0 && (
          <div className="viewToggle">
            <button
              className={view === "lista" ? "activeView" : ""}
              onClick={() => setView("lista")}
            >
              📋 Lista
            </button>
            <button
              className={view === "carnê" ? "activeView" : ""}
              onClick={() => setView("carnê")}
            >
              📘 Carnê de Vacinação
            </button>
          </div>
        )}

        {vacinas.length > 0 ? (
          view === "lista" ? (
            <section className="historyList">
              {vacinas.map((vacina, index) => (
                <article className="myAppointmentCard" key={index}>
                  <div className="appointmentDate">
                    <strong>{vacina.data}</strong>
                    <span>{vacina.horario}</span>
                  </div>

                  <div>
                    <h3>{vacina.vacina}</h3>
                    <p>{vacina.unidade}</p>
                    {vacina.endereco && <p>📍 {vacina.endereco}</p>}
                    <p>Status: {vacina.status}</p>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <div className="vaccinationBook">
              <h3>Carnê de Vacinação</h3>
              <span className="bookSubtitle">{usuario.nome || "Paciente ClickSUS"}</span>

              {vacinas.map((vacina, index) => (
                <div className="vaccBookEntry" key={index}>
                  <span className="vaccBookIcon">💉</span>
                  <div>
                    <p className="vaccBookName">{vacina.vacina}</p>
                    <p className="vaccBookDate">
                      {vacina.data} às {vacina.horario} — {vacina.unidade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <section className="appointmentBox">
            <p>Nenhuma vacina agendada no momento.</p>

            <button className="primaryBtn" onClick={() => setPage("vacinas")}>
              Agendar
            </button>
          </section>
        )}

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}
