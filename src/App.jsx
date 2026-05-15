import { useState } from "react";

import Login from "./pages/auth/Login";
import Cadastro from "./pages/auth/Cadastro";
import Sucesso from "./pages/auth/Sucesso";
import HomePage from "./pages/home/HomePage";
import Consultas from "./pages/consultas/Consultas";
import Clinicas from "./pages/consultas/Clinicas";
import DataHorario from "./pages/consultas/DataHorario";
import SucessoConsulta from "./pages/consultas/SucessoConsulta";
import MinhasConsultas from "./pages/consultas/MinhasConsultas";
import HistoricoConsultas from "./pages/consultas/HistoricoConsultas";
import Farmacia from "./pages/farmacia/Farmacia";
import Medicamentos from "./pages/farmacia/Medicamentos";
import AgendarRetirada from "./pages/farmacia/AgendarRetirada";
import SucessoRetirada from "./pages/farmacia/SucessoRetirada";
import UnidadesFarmacia from "./pages/farmacia/UnidadesFarmacia";
import Receitas from "./pages/farmacia/Receitas";
import EntregaCasa from "./pages/farmacia/EntregaCasa";
import HistoricoRetiradas from "./pages/farmacia/HistoricoRetiradas";
import Vacinas from "./pages/vacinas/Vacinas";
import UnidadesVacina from "./pages/vacinas/UnidadesVacina";
import AgendarVacina from "./pages/vacinas/AgendarVacina";
import SucessoVacina from "./pages/vacinas/SucessoVacina";
import MinhasVacinas from "./pages/vacinas/MinhasVacinas";
import Perfil from "./pages/perfil/Perfil";
import EditarPerfil from "./pages/perfil/EditarPerfil";
import Carteirinha from "./pages/carteirinha/Carteirinha";
import Notificacoes from "./pages/notificacoes/Notificacoes";
import SobreClickSUS from "./pages/sobre/SobreClickSUS";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("clicksusUser")) || null
  );
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  const [consultaAgendada, setConsultaAgendada] = useState(null);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
  const [retiradaMedicamento, setRetiradaMedicamento] = useState(null);
  const [vacinaSelecionada, setVacinaSelecionada] = useState(null);
  const [unidadeVacinaSelecionada, setUnidadeVacinaSelecionada] = useState(null);
  const [vacinaAgendada, setVacinaAgendada] = useState(null);

  const goHome = () => setPage("home");

  return (
    <div className="app">
      {page === "login" && (
        <Login setPage={setPage} setUser={setUser} goHome={goHome} />
      )}
      {page === "cadastro" && (
        <Cadastro setPage={setPage} setUser={setUser} />
      )}
      {page === "sucesso" && <Sucesso goHome={goHome} />}
      {page === "home" && <HomePage user={user} setPage={setPage} />}

      {page === "consultas" && (
        <Consultas
          setPage={setPage}
          setEspecialidadeSelecionada={setEspecialidadeSelecionada}
        />
      )}
      {page === "clinicas" && (
        <Clinicas
          setPage={setPage}
          especialidadeSelecionada={especialidadeSelecionada}
          setClinicaSelecionada={setClinicaSelecionada}
        />
      )}
      {page === "dataHorario" && (
        <DataHorario
          setPage={setPage}
          especialidadeSelecionada={especialidadeSelecionada}
          clinicaSelecionada={clinicaSelecionada}
          setConsultaAgendada={setConsultaAgendada}
        />
      )}
      {page === "sucessoConsulta" && (
        <SucessoConsulta setPage={setPage} consultaAgendada={consultaAgendada} />
      )}
      {page === "minhasConsultas" && <MinhasConsultas setPage={setPage} />}
      {page === "historicoConsultas" && <HistoricoConsultas setPage={setPage} />}

      {page === "farmacia" && <Farmacia setPage={setPage} />}
      {page === "medicamentos" && (
        <Medicamentos
          setPage={setPage}
          setMedicamentoSelecionado={setMedicamentoSelecionado}
        />
      )}
      {page === "unidadesFarmacia" && <UnidadesFarmacia setPage={setPage} />}
      {page === "receitas" && <Receitas setPage={setPage} />}
      {page === "entregaCasa" && <EntregaCasa setPage={setPage} />}
      {page === "historicoRetiradas" && <HistoricoRetiradas setPage={setPage} />}
      {page === "agendarRetirada" && (
        <AgendarRetirada
          setPage={setPage}
          medicamentoSelecionado={medicamentoSelecionado}
          setRetiradaMedicamento={setRetiradaMedicamento}
        />
      )}
      {page === "sucessoRetirada" && (
        <SucessoRetirada
          setPage={setPage}
          retiradaMedicamento={retiradaMedicamento}
        />
      )}

      {page === "vacinas" && (
        <Vacinas setPage={setPage} setVacinaSelecionada={setVacinaSelecionada} />
      )}
      {page === "unidadesVacina" && (
        <UnidadesVacina
          setPage={setPage}
          vacinaSelecionada={vacinaSelecionada}
          setUnidadeVacinaSelecionada={setUnidadeVacinaSelecionada}
        />
      )}
      {page === "agendarVacina" && (
        <AgendarVacina
          setPage={setPage}
          vacinaSelecionada={vacinaSelecionada}
          unidadeVacinaSelecionada={unidadeVacinaSelecionada}
          setVacinaAgendada={setVacinaAgendada}
        />
      )}
      {page === "sucessoVacina" && (
        <SucessoVacina setPage={setPage} vacinaAgendada={vacinaAgendada} />
      )}
      {page === "minhasVacinas" && (
        <MinhasVacinas setPage={setPage} user={user} />
      )}

      {page === "perfil" && (
        <Perfil setPage={setPage} user={user} setUser={setUser} />
      )}
      {page === "editarPerfil" && (
        <EditarPerfil setPage={setPage} user={user} setUser={setUser} />
      )}
      {page === "carteirinha" && (
        <Carteirinha setPage={setPage} user={user} />
      )}
      {page === "notificacoes" && <Notificacoes setPage={setPage} />}
      {page === "sobreClickSUS" && <SobreClickSUS setPage={setPage} />}
    </div>
  );
}

export default App;
