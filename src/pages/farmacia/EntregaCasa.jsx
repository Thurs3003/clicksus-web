import { useState } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { formatCEP } from "../../utils/formatters";

export default function EntregaCasa({ setPage }) {
  const [cep, setCep] = useState("");
  const [resultado, setResultado] = useState("");
  const [erro, setErro] = useState("");

  function verificarEntrega() {
    if (cep.length < 9) {
      setErro("Digite um CEP válido.");
      setResultado("");
      return;
    }

    setErro("");
    setResultado("Entrega disponível para sua região. Prazo estimado: 3 a 5 dias úteis.");
  }

  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <button className="backBtn" onClick={() => setPage("farmacia")}>
          ← Voltar para Farmácia
        </button>

        <section className="appointmentBox">
          <h3>Entrega em Casa</h3>

          <p>
            Verifique se há disponibilidade de entrega de medicamentos para a
            sua região.
          </p>

          <label>CEP *</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(formatCEP(e.target.value))}
            placeholder="00000-000"
            maxLength={9}
            inputMode="numeric"
          />

          {erro && <p className="erro">{erro}</p>}

          {resultado && <p className="successMessage">{resultado}</p>}

          <button className="primaryBtn" onClick={verificarEntrega}>
            Verificar
          </button>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}
