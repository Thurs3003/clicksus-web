import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { medicamentos } from "../../data/medicamentos";

export default function Farmacia({ setPage }) {
  const proximoMed = medicamentos[0];

  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <h3 className="sectionPill">Acompanhe seus medicamentos</h3>

        <section className="pharmacyPanel">
          <article className="pharmacyCardLarge">
            <div>
              <h3>Meus Medicamentos</h3>
              <p>Acompanhe seus remédios e retiradas.</p>
            </div>

            <button onClick={() => setPage("medicamentos")}>Ver todos</button>

            <div className="medicineInfo">
              <p>Próxima Retirada:</p>
              <strong>{proximoMed.nome}</strong>
              <span>Data: {proximoMed.retirada}</span>
            </div>
          </article>

          <article className="pharmacyCardLarge">
            <div>
              <h3>Minhas Receitas Médicas</h3>
              <p>Acompanhe suas receitas</p>
            </div>

            <button onClick={() => setPage("receitas")}>Ver todas</button>

            <div className="medicineInfo">
              <p>Último envio: 12/05/2026 | 14:22</p>
              <span>Médico: Dra. Fernanda Rocha</span>
              <span>Validade: 12/06/2026</span>
            </div>
          </article>

          <section className="pharmacyGrid">
            <button onClick={() => setPage("medicamentos")}>
              <strong>Meus medicamentos</strong>
              <span>Veja seus medicamentos disponibilizados pelo SUS.</span>
            </button>

            <button onClick={() => setPage("unidadesFarmacia")}>
              <strong>Unidades de Farmácia</strong>
              <span>Encontre farmácias do SUS perto de você.</span>
            </button>

            <button onClick={() => setPage("receitas")}>
              <strong>Receitas</strong>
              <span>Envie suas receitas médicas aqui.</span>
            </button>

            <button onClick={() => setPage("entregaCasa")}>
              <strong>Entrega em casa</strong>
              <span>Verifique a disponibilidade de entrega.</span>
            </button>

            <button onClick={() => setPage("historicoRetiradas")}>
              <strong>Histórico de Retiradas</strong>
              <span>Veja todas as retiradas já realizadas.</span>
            </button>
          </section>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}
