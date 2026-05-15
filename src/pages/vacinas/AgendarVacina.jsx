import { useState } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import Spinner from "../../components/Spinner";

const datas = ["16/05", "17/05", "19/05", "20/05", "21/05"];
const horarios = ["07:30", "09:00", "10:30", "13:00", "14:30"];

export default function AgendarVacina({
  setPage,
  vacinaSelecionada,
  unidadeVacinaSelecionada,
  setVacinaAgendada,
}) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function confirmarAgendamento() {
    if (!dataSelecionada || !horarioSelecionado) {
      setErro("Selecione data e horário.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const novaVacina = {
        vacina: vacinaSelecionada?.nome,
        unidade: unidadeVacinaSelecionada?.nome,
        endereco: unidadeVacinaSelecionada?.endereco,
        telefone: unidadeVacinaSelecionada?.telefone,
        data: dataSelecionada,
        horario: horarioSelecionado,
        status: "Agendada",
      };

      const vacinasSalvas =
        JSON.parse(localStorage.getItem("clicksusVacinas")) || [];
      vacinasSalvas.push(novaVacina);
      localStorage.setItem("clicksusVacinas", JSON.stringify(vacinasSalvas));

      setVacinaAgendada(novaVacina);
      setLoading(false);
      setPage("sucessoVacina");
    }, 1800);
  }

  return (
    <>
      {loading && <Spinner />}

      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <button className="backBtn" onClick={() => setPage("unidadesVacina")}>
          ← Voltar para unidades
        </button>

        <section className="appointmentBox">
          <h3>Agendar Vacinação</h3>

          <p>
            <strong>Vacina:</strong> {vacinaSelecionada?.nome}
          </p>

          <p>
            <strong>Unidade:</strong> {unidadeVacinaSelecionada?.nome}
          </p>

          <p>
            <strong>Endereço:</strong> {unidadeVacinaSelecionada?.endereco}
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

          <button className="primaryBtn" onClick={confirmarAgendamento} disabled={loading}>
            Confirmar Agendamento
          </button>
        </section>

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}
