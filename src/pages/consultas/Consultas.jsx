import { useState } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import ConsultaTabs from "../../components/ConsultaTabs";
import { especialidades } from "../../data/especialidades";

export default function Consultas({ setPage, setEspecialidadeSelecionada }) {
  const [busca, setBusca] = useState("");

  const resultados = especialidades.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <input
          className="searchInput"
          placeholder="Buscar especialidade..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <ConsultaTabs setPage={setPage} active="consultas" />

        <section className="specialtyList">
          {resultados.length > 0 ? (
            resultados.map((especialidade) => (
              <button
                key={especialidade.id}
                className="specialtyItem"
                onClick={() => {
                  setEspecialidadeSelecionada(especialidade.nome);
                  setPage("clinicas");
                }}
              >
                <span className="specialtyIcon">{especialidade.icone}</span>
                <strong>{especialidade.nome}</strong>
              </button>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#aaa", padding: "40px 0" }}>
              Nenhuma especialidade encontrada para "{busca}".
            </p>
          )}
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}
