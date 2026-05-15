import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function Carteirinha({ setPage, user }) {
  const usuario = user || JSON.parse(localStorage.getItem("clicksusUser")) || {};
  const vacinas = JSON.parse(localStorage.getItem("clicksusVacinas")) || [];

  return (
    <>
      <Header title="CARTEIRINHA" />

      <main className="screen perfilScreen">
        <button className="backBtn" onClick={() => setPage("perfil")}>
          ← Voltar para Perfil
        </button>

        <div className="carteiraWrapper">
          <div className="carteiraCard">
            <p className="carteiraLogo">✚ ClickSUS — Carteirinha de Saúde</p>

            <div className="tipoSanguineo">
              {usuario.tipoSanguineo || "—"}
            </div>

            <p className="carteiraName">{usuario.nome || "Paciente ClickSUS"}</p>
            <p style={{ margin: "0 0 4px", opacity: 0.85, fontSize: 15 }}>
              Paciente cadastrado no sistema SUS
            </p>

            <div className="carteiraInfo">
              <div className="carteiraField">
                <label>CPF</label>
                <strong>{usuario.cpf || "—"}</strong>
              </div>

              <div className="carteiraField">
                <label>Data de Nascimento</label>
                <strong>{usuario.dataNascimento || "—"}</strong>
              </div>

              <div className="carteiraField">
                <label>Telefone</label>
                <strong>{usuario.telefone || "—"}</strong>
              </div>

              <div className="carteiraField">
                <label>Tipo Sanguíneo</label>
                <strong>{usuario.tipoSanguineo || "Não informado"}</strong>
              </div>
            </div>
          </div>

          <div className="carteiraVaccinesSection">
            <h3>💉 Vacinas Agendadas</h3>

            {vacinas.length > 0 ? (
              vacinas.map((v, i) => (
                <div className="vaccineEntry" key={i}>
                  <div className="vaccineDot" />
                  <div className="vaccineEntryInfo">
                    <strong>{v.vacina}</strong>
                    <span>
                      {v.data} às {v.horario} — {v.unidade}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#aaa", margin: 0 }}>
                Nenhuma vacina agendada ainda.{" "}
                <button
                  className="linkBtn"
                  style={{ display: "inline", padding: 0 }}
                  onClick={() => setPage("vacinas")}
                >
                  Agendar agora
                </button>
              </p>
            )}
          </div>
        </div>

        <BottomNav setPage={setPage} active="perfil" />
      </main>
    </>
  );
}
