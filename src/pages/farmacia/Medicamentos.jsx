import { useState } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { medicamentos } from "../../data/medicamentos";

export default function Medicamentos({ setPage, setMedicamentoSelecionado }) {
  const [modalMedicamento, setModalMedicamento] = useState(null);

  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <button className="backBtn" onClick={() => setPage("farmacia")}>
          ← Voltar para Farmácia
        </button>

        <h3 className="sectionTitle">Meus Medicamentos</h3>

        <section className="medicineList">
          {medicamentos.map((medicamento) => (
            <article className="medicineCard" key={medicamento.nome}>
              <div className="medicineIcon">💊</div>

              <div className="medicineContent">
                <h3>{medicamento.nome}</h3>
                <p>{medicamento.status}</p>
                <p>
                  <strong>Retirada:</strong> {medicamento.retirada}
                </p>
                <p>
                  <strong>Unidade:</strong> {medicamento.unidade}
                </p>

                <button onClick={() => setModalMedicamento(medicamento)}>
                  Ver detalhes
                </button>
              </div>
            </article>
          ))}
        </section>

        {modalMedicamento && (
          <div className="modalOverlay">
            <section className="medicineModal">
              <button
                className="closeModal"
                onClick={() => setModalMedicamento(null)}
              >
                ×
              </button>

              <h3>{modalMedicamento.nome}</h3>

              <p>
                <strong>Categoria:</strong> {modalMedicamento.categoria}
              </p>
              <p>
                <strong>Status:</strong> {modalMedicamento.status}
              </p>
              <p>
                <strong>Data de retirada:</strong> {modalMedicamento.retirada}
              </p>
              <p>
                <strong>Unidade:</strong> {modalMedicamento.unidade}
              </p>
              <p>
                <strong>Dosagem:</strong> {modalMedicamento.dosagem}
              </p>
              <p>
                <strong>Duração:</strong> {modalMedicamento.duracao}
              </p>
              {modalMedicamento.observacao && (
                <p>
                  <strong>Observação:</strong> {modalMedicamento.observacao}
                </p>
              )}

              <button
                className="primaryBtn"
                onClick={() => {
                  setMedicamentoSelecionado(modalMedicamento);
                  setModalMedicamento(null);
                  setPage("agendarRetirada");
                }}
              >
                Solicitar Retirada
              </button>
            </section>
          </div>
        )}

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}
