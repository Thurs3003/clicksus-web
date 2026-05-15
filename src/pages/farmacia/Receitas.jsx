import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function Receitas({ setPage }) {
  const [nomeMedico, setNomeMedico] = useState("");
  const [arquivo, setArquivo] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  function enviarReceita() {
    if (!nomeMedico || !arquivo) {
      setErro("Informe o nome do médico e selecione um arquivo.");
      return;
    }

    setErro("");
    setEnviado(true);
  }

  if (enviado) {
    return (
      <>
        <Header title="FARMÁCIA" />

        <main className="screen farmaciaScreen">
          <section className="card successCard">
            <CheckCircle size={145} color="#00a6ac" />

            <h3>Receita Enviada!</h3>

            <p>
              A receita do <strong>{nomeMedico}</strong> foi enviada com sucesso
              e está em análise.
            </p>

            <button className="primaryBtn" onClick={() => setPage("farmacia")}>
              Voltar à Farmácia
            </button>
          </section>

          <BottomNav setPage={setPage} active="farmacia" />
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <button className="backBtn" onClick={() => setPage("farmacia")}>
          ← Voltar para Farmácia
        </button>

        <section className="appointmentBox">
          <h3>Enviar Receita</h3>

          <label>Nome do médico *</label>
          <input
            value={nomeMedico}
            onChange={(e) => setNomeMedico(e.target.value)}
            placeholder="Ex: Dra. Fernanda Rocha"
          />

          <label>Arquivo da receita *</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setArquivo(e.target.files[0]?.name || "")}
          />

          {arquivo && (
            <p style={{ fontSize: "0.85rem", color: "#555" }}>
              Arquivo selecionado: {arquivo}
            </p>
          )}

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={enviarReceita}>
            Enviar
          </button>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}
