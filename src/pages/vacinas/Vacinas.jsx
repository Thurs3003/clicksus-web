import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { vacinas } from "../../data/vacinas";

export default function Vacinas({ setPage, setVacinaSelecionada }) {
  return (
    <>
      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <h3 className="sectionTitle">Agendar Vacina</h3>

        <section className="vaccineList">
          {vacinas.map((vacina) => (
            <article className="vaccineCard" key={vacina.nome}>
              <div className="vaccineIcon">💉</div>

              <div className="vaccineContent">
                <h3>{vacina.nome}</h3>
                <p>{vacina.descricao}</p>
                <p>
                  <strong>Dose:</strong> {vacina.dose}
                </p>
                <p>
                  <strong>Público:</strong> {vacina.publico}
                </p>
                <span>{vacina.status}</span>

                <button
                  onClick={() => {
                    setVacinaSelecionada(vacina);
                    setPage("unidadesVacina");
                  }}
                >
                  Agendar Vacina
                </button>
              </div>
            </article>
          ))}
        </section>

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}
