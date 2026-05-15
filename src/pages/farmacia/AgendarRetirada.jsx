import { useState } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import Spinner from "../../components/Spinner";

const datas = ["16/05", "17/05", "19/05", "20/05", "21/05"];

export default function AgendarRetirada({
  setPage,
  medicamentoSelecionado,
  setRetiradaMedicamento,
}) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function confirmarRetirada() {
    if (!dataSelecionada) {
      setErro("Selecione uma data para retirada.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const retirada = {
        medicamento: medicamentoSelecionado?.nome,
        data: dataSelecionada,
        unidade: medicamentoSelecionado?.unidade,
      };

      const retiradasSalvas =
        JSON.parse(localStorage.getItem("clicksusRetiradas")) || [];
      retiradasSalvas.push(retirada);
      localStorage.setItem("clicksusRetiradas", JSON.stringify(retiradasSalvas));

      setRetiradaMedicamento(retirada);
      setLoading(false);
      setPage("sucessoRetirada");
    }, 1800);
  }

  return (
    <>
      {loading && <Spinner />}

      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <button className="backBtn" onClick={() => setPage("medicamentos")}>
          ← Voltar para medicamentos
        </button>

        <section className="appointmentBox">
          <h3>Escolha a data de retirada</h3>

          <p>
            <strong>Medicamento:</strong> {medicamentoSelecionado?.nome}
          </p>

          <p>
            <strong>Unidade:</strong> {medicamentoSelecionado?.unidade}
          </p>

          <div className="optionGrid">
            {datas.map((data) => (
              <button
                key={data}
                className={dataSelecionada === data ? "selectedOption" : ""}
                onClick={() => setDataSelecionada(data)}
              >
                {data}
              </button>
            ))}
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={confirmarRetirada} disabled={loading}>
            Confirmar Retirada
          </button>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}
