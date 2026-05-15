import { useState } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import Spinner from "../../components/Spinner";

const datas = ["16/05", "17/05", "19/05", "20/05", "21/05"];
const horarios = ["07:30", "09:00", "10:30", "13:00", "14:30", "16:00"];

export default function DataHorario({
  setPage,
  especialidadeSelecionada,
  clinicaSelecionada,
  setConsultaAgendada,
}) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function confirmar() {
    if (!dataSelecionada || !horarioSelecionado) {
      setErro("Selecione uma data e um horário.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const novaConsulta = {
        especialidade: especialidadeSelecionada,
        clinica: clinicaSelecionada?.nome,
        endereco: clinicaSelecionada?.endereco || clinicaSelecionada?.bairro,
        telefone: clinicaSelecionada?.telefone,
        data: dataSelecionada,
        horario: horarioSelecionado,
        status: "Agendada",
      };

      const consultasSalvas =
        JSON.parse(localStorage.getItem("clicksusConsultas")) || [];
      consultasSalvas.push(novaConsulta);
      localStorage.setItem("clicksusConsultas", JSON.stringify(consultasSalvas));

      setConsultaAgendada(novaConsulta);
      setLoading(false);
      setPage("sucessoConsulta");
    }, 1800);
  }

  return (
    <>
      {loading && <Spinner />}

      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <button className="backBtn" onClick={() => setPage("clinicas")}>
          ← Voltar para clínicas
        </button>

        <section className="appointmentBox">
          <h3>Escolha data e horário</h3>

          <p>
            <strong>Especialidade:</strong> {especialidadeSelecionada}
          </p>

          <p>
            <strong>Clínica:</strong> {clinicaSelecionada?.nome}
          </p>

          <h4>Data</h4>
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

          <h4>Horário</h4>
          <div className="optionGrid">
            {horarios.map((horario) => (
              <button
                key={horario}
                className={horarioSelecionado === horario ? "selectedOption" : ""}
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario}
              </button>
            ))}
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={confirmar} disabled={loading}>
            Confirmar
          </button>
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}
