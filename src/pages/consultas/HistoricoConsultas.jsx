import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import ConsultaTabs from "../../components/ConsultaTabs";

const historico = [
  {
    data: "10/03/2026",
    clinica: "UBS Jardim Paulista",
    medico: "Dr. Carlos Eduardo Lima",
    especialidade: "Cardiologista",
    diagnostico: "Hipertensão Arterial Sistêmica",
    prescricao: "Losartana Potássica 50mg — uso contínuo",
  },
  {
    data: "22/02/2026",
    clinica: "Centro de Saúde Consolação",
    medico: "Dra. Fernanda Rocha",
    especialidade: "Clínico Geral",
    diagnostico: "Infecção respiratória aguda",
    prescricao: "Amoxicilina 500mg por 7 dias + repouso",
  },
  {
    data: "05/01/2026",
    clinica: "UBS Vila Madalena",
    medico: "Dra. Ana Paula Mendes",
    especialidade: "Dermatologista",
    diagnostico: "Dermatite de contato",
    prescricao: "Hidrocortisona creme 1% + Loratadina 10mg",
  },
  {
    data: "14/11/2025",
    clinica: "Clínica de Saúde da Família Pinheiros",
    medico: "Dr. Roberto Alves",
    especialidade: "Ortopedia",
    diagnostico: "Lombalgia crônica",
    prescricao: "Fisioterapia 2x/semana + Ibuprofeno 600mg se necessário",
  },
];

export default function HistoricoConsultas({ setPage }) {
  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <ConsultaTabs setPage={setPage} active="historicoConsultas" />

        <h3 className="sectionTitle">Histórico de Consultas</h3>

        <section className="historyList">
          {historico.map((item, index) => (
            <article className="historyCard" key={index}>
              <span className="historyDate">{item.data}</span>

              <h3>{item.clinica}</h3>

              <p>🏥 {item.medico}</p>
              <p>❤️ {item.especialidade}</p>
              <p>💉 Diagnóstico: {item.diagnostico}</p>
              <p>💊 Prescrição: {item.prescricao}</p>
            </article>
          ))}
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}
