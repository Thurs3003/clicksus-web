import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function HistoricoRetiradas({ setPage }) {
  const retiradas = JSON.parse(localStorage.getItem("clicksusRetiradas")) || [];

  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <button className="backBtn" onClick={() => setPage("farmacia")}>
          ← Voltar para Farmácia
        </button>

        <h3 className="sectionTitle">Histórico de Retiradas</h3>

        {retiradas.length > 0 ? (
          <div className="historyList">
            {retiradas.map((retirada, index) => (
              <div className="retiradaCard" key={index}>
                <div className="retiradaDate">
                  <strong>{retirada.data}</strong>
                </div>

                <div className="retiradaInfo">
                  <h3>{retirada.medicamento}</h3>
                  <p>📍 {retirada.unidade}</p>
                  <p>✅ Retirada confirmada</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section className="appointmentBox">
            <p>Nenhuma retirada registrada ainda.</p>

            <button className="primaryBtn" onClick={() => setPage("medicamentos")}>
              Ver Medicamentos
            </button>
          </section>
        )}

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}
