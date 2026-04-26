import { useState } from "react";
import {
  User,
  CalendarDays,
  Home,
  Pill,
  Syringe,
  ClipboardPen,
  CheckCircle,
  Eye,
  EyeOff,
  Bot,
} from "lucide-react";

import { FaPhoneAlt } from "react-icons/fa";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("clicksusUser")) || null,
  );
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  const [consultaAgendada, setConsultaAgendada] = useState(null);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
  const [retiradaMedicamento, setRetiradaMedicamento] = useState(null);
  const [vacinaSelecionada, setVacinaSelecionada] = useState(null);
  const [unidadeVacinaSelecionada, setUnidadeVacinaSelecionada] =
    useState(null);
  const [vacinaAgendada, setVacinaAgendada] = useState(null);

  const goHome = () => setPage("home");

  return (
    <div className="app">
      {page === "login" && (
        <Login setPage={setPage} setUser={setUser} goHome={goHome} />
      )}

      {page === "cadastro" && <Cadastro setPage={setPage} setUser={setUser} />}

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
        <SucessoConsulta
          setPage={setPage}
          consultaAgendada={consultaAgendada}
        />
      )}

      {page === "minhasConsultas" && <MinhasConsultas setPage={setPage} />}

      {page === "historicoConsultas" && (
        <HistoricoConsultas setPage={setPage} />
      )}

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
        <Vacinas
          setPage={setPage}
          setVacinaSelecionada={setVacinaSelecionada}
        />
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

      {page === "minhasVacinas" && <MinhasVacinas setPage={setPage} />}

      {page === "perfil" && (
        <Perfil setPage={setPage} user={user} setUser={setUser} />
      )}

      {page === "editarPerfil" && (
        <EditarPerfil setPage={setPage} user={user} setUser={setUser} />
      )}
    </div>
  );
}

function formatCPF(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }

  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

function formatCEP(value) {
  const somenteNumeros = value.replace(/[^0-9]/g, "").slice(0, 8);

  if (somenteNumeros.length <= 5) {
    return somenteNumeros;
  }

  return `${somenteNumeros.slice(0, 5)}-${somenteNumeros.slice(5)}`;
}

function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="logoArea">
        <div className="logoBox">✚</div>
        <span>ClickSUS</span>
      </div>

      <div>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
    </header>
  );
}

function GoogleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function Login({ setPage, setUser, goHome }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");

  function entrar() {
    const savedUser = JSON.parse(localStorage.getItem("clicksusUser"));

    if (cpf.length < 14 || senha.length < 4) {
      setErro("Digite um CPF válido e uma senha com pelo menos 4 caracteres.");
      return;
    }

    if (!savedUser) {
      setErro("Nenhum usuário cadastrado. Faça seu cadastro primeiro.");
      return;
    }

    if (savedUser.cpf !== cpf) {
      setErro("CPF não encontrado. Verifique ou faça seu cadastro.");
      return;
    }

    if (savedUser.senha !== senha) {
      setErro("Senha incorreta.");
      return;
    }

    setUser(savedUser);
    goHome();
  }

  function recuperarSenha() {
    const savedUser = JSON.parse(localStorage.getItem("clicksusUser"));

    if (!cpf) {
      setErro("Digite seu CPF para recuperar a senha.");
      return;
    }

    if (!savedUser || savedUser.cpf !== cpf) {
      setErro("CPF não encontrado para recuperação de senha.");
      return;
    }

    setErro("Enviamos as instruções de recuperação para o e-mail cadastrado.");
  }

  function entrarComGov() {
    const govUser = {
      nome: "Usuário gov.br",
      cpf: "000.000.000-00",
      email: "usuario@gov.br",
      telefone: "",
      endereco: "",
      senha: "",
      loginSocial: "gov.br",
    };

    localStorage.setItem("clicksusUser", JSON.stringify(govUser));
    setUser(govUser);
    goHome();
  }

  function entrarComGoogle() {
    const googleUser = {
      nome: "Usuário Google",
      cpf: "111.111.111-11",
      email: "usuario@gmail.com",
      telefone: "",
      endereco: "",
      senha: "",
      loginSocial: "Google",
    };

    localStorage.setItem("clicksusUser", JSON.stringify(googleUser));
    setUser(googleUser);
    goHome();
  }

  return (
    <>
      <Header title="ClickSUS" subtitle="LOGIN" />

      <main className="screen">
        <section className="card formCard loginCard">
          <span className="tag">Informações</span>

          <label>CPF *</label>
          <input
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            placeholder="123.456.789-10"
            inputMode="numeric"
          />

          <label>SENHA *</label>
          <div className="passwordBox">
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="********"
            />

            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button className="linkBtn" onClick={recuperarSenha}>
            Esqueci minha senha
          </button>

          <p className="centerText">Entrar com</p>

          <div className="socials">
            <button className="govBtn" onClick={entrarComGov}>
              <span className="govBlue">gov</span>
              <span className="govYellow">.</span>
              <span className="govGreen">br</span>
            </button>

            <button className="googleBtn" onClick={entrarComGoogle}>
              <GoogleIcon />
            </button>
          </div>

          <div className="watermark">✚</div>

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={entrar}>
            Entrar
          </button>

          <button className="linkBtn" onClick={() => setPage("cadastro")}>
            Não Possuo Login
          </button>

          <p className="lgpd">Lei Geral de Proteção de Dados (LGPD)</p>
        </section>
      </main>
    </>
  );
}

function Cadastro({ setPage, setUser }) {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
  });

  const [erro, setErro] = useState("");

  function updateField(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function cadastrar() {
    const camposVazios = Object.values(form).some((valor) => !valor);
    const savedUser = JSON.parse(localStorage.getItem("clicksusUser"));

    if (camposVazios) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.cpf.length < 14) {
      setErro("Digite um CPF válido.");
      return;
    }

    if (savedUser && savedUser.cpf === form.cpf) {
      setErro("Este CPF já está cadastrado. Faça login.");
      return;
    }

    localStorage.setItem("clicksusUser", JSON.stringify(form));
    setUser(form);
    setPage("sucesso");
  }

  return (
    <>
      <Header title="ClickSUS" subtitle="CADASTRO" />

      <main className="screen">
        <section className="card formCard">
          <span className="tag">Informações</span>

          <h3>Bem-vindo(a) ao ClickSUS</h3>

          <label>Nome *</label>
          <input
            value={form.nome}
            onChange={(e) => updateField("nome", e.target.value)}
            placeholder="Seu Nome"
          />

          <label>Endereço *</label>
          <input
            value={form.endereco}
            onChange={(e) => updateField("endereco", e.target.value)}
            placeholder="Av. Paulista"
          />

          <label>Email *</label>
          <input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="email@gmail.com"
            type="email"
          />

          <label>Telefone *</label>
          <input
            value={form.telefone}
            onChange={(e) =>
              updateField("telefone", formatPhone(e.target.value))
            }
            placeholder="(11) 4002-8922"
            inputMode="numeric"
          />

          <label>CPF *</label>
          <input
            value={form.cpf}
            onChange={(e) => updateField("cpf", formatCPF(e.target.value))}
            placeholder="123.456.789-10"
            inputMode="numeric"
          />

          <label>SENHA *</label>
          <input
            value={form.senha}
            onChange={(e) => updateField("senha", e.target.value)}
            placeholder="Digite sua senha"
            type="password"
          />

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={cadastrar}>
            Cadastrar
          </button>

          <button className="linkBtn" onClick={() => setPage("login")}>
            Entrar
          </button>

          <p className="lgpd">Lei Geral de Proteção de Dados (LGPD)</p>
        </section>
      </main>
    </>
  );
}

function Sucesso({ goHome }) {
  return (
    <>
      <Header title="ClickSUS" subtitle="Bem-vindo(a)" />

      <main className="screen">
        <section className="card successCard">
          <CheckCircle size={150} color="#00a6ac" />
          <h3>SUCESSO!</h3>
          <p>Seu cadastro foi concluído com Sucesso.</p>

          <button className="primaryBtn" onClick={goHome}>
            Continuar
          </button>
        </section>
      </main>
    </>
  );
}

function HomePage({ user, setPage }) {
  const nome = user?.nome || "Maria";

  return (
    <>
      <Header title="INÍCIO" />

      <main className="screen homeScreen">
        <section className="card welcomeCard">
          <div>
            <h3>
              Bem-Vindo(a),
              <span className="welcomeName">{nome}!</span>
            </h3>
            <p>Como podemos ajudar você hoje?</p>
          </div>

          <div className="doctor">👨‍⚕️</div>
        </section>

        <section className="grid">
          <MenuCard
            icon={<User />}
            title="Perfil"
            onClick={() => setPage("perfil")}
          />
          <MenuCard
            icon={<CalendarDays />}
            title="Consultas"
            onClick={() => setPage("consultas")}
          />
          <MenuCard
            icon={<ClipboardPen />}
            title="Cadastro"
            onClick={() => setPage("cadastro")}
          />
          <MenuCard
            icon={<Syringe />}
            title="Vacinas"
            onClick={() => setPage("vacinas")}
          />
        </section>

        <BottomNav setPage={setPage} active="home" />
      </main>
    </>
  );
}

function MenuCard({ icon, title, onClick }) {
  return (
    <button className="menuCard" onClick={onClick}>
      {icon}
      <strong>{title}</strong>
    </button>
  );
}

function BottomNav({ setPage, active }) {
  return (
    <nav className="bottomNav">
      <button
        className={active === "perfil" ? "activeNav" : ""}
        onClick={() => setPage("perfil")}
      >
        <User />
      </button>

      <button
        className={active === "consultas" ? "activeNav" : ""}
        onClick={() => setPage("consultas")}
      >
        <CalendarDays />
      </button>

      <button
        className={active === "home" ? "activeNav" : ""}
        onClick={() => setPage("home")}
      >
        <Home />
      </button>

      <button
        className={active === "farmacia" ? "activeNav" : ""}
        onClick={() => setPage("farmacia")}
      >
        <Pill />
      </button>

      <button
        className={active === "vacinas" ? "activeNav" : ""}
        onClick={() => setPage("vacinas")}
      >
        <Syringe />
      </button>
    </nav>
  );
}
function Consultas({ setPage, setEspecialidadeSelecionada }) {
  const especialidades = [
    "Clínico Geral",
    "Pediatria",
    "Ortopedia",
    "Psicólogo",
    "Endócrino",
    "Dermatologista",
    "Psiquiatra",
  ];

  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <input className="searchInput" placeholder="Buscar..." />

        <section className="tabs">
          <button className="activeTab">Agendamentos</button>
          <button>Minhas Consultas</button>
          <button onClick={() => setPage("historicoConsultas")}>
            Histórico
          </button>
        </section>

        <section className="specialtyList">
          {especialidades.map((especialidade) => (
            <button
              key={especialidade}
              className="specialtyItem"
              onClick={() => {
                setEspecialidadeSelecionada(especialidade);
                setPage("clinicas");
              }}
            >
              <span className="specialtyIcon">👩‍⚕️</span>
              <strong>{especialidade}</strong>
            </button>
          ))}
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}

function Clinicas({
  setPage,
  especialidadeSelecionada,
  setClinicaSelecionada,
}) {
  const clinicas = [
    {
      nome: "Clínica da Família Saúde",
      especialidades: "clínico geral, ortopedia, otorrinolaringologia",
      distancia: "1,2 km",
      bairro: "Centro",
      horario: "Seg - sex: 07:00 às 18:00",
    },
    {
      nome: "Clínica de Especialidades Consulta Fácil",
      especialidades: "endocrinologia, cardiologia e atendimento preventivo",
      distancia: "0,4 km",
      bairro: "Vila Madalena",
      horario: "Seg - sex: 07:00 às 18:00",
    },
    {
      nome: "Centro de Excelência em Medicina",
      especialidades: "consultas médicas, acompanhamento clínico geral",
      distancia: "3,8 km",
      bairro: "Butantã",
      horario: "Seg - sex: 07:00 às 18:00",
    },
    {
      nome: "Hospital das Clínicas",
      especialidades: "cardiologia, neurologia e neurocirurgia",
      distancia: "7,0 km",
      bairro: "Tatuapé",
      horario: "Seg - sex: 07:00 às 18:00",
    },
  ];

  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <input className="searchInput" placeholder="Buscar clínica..." />

        <section className="tabs">
          <button>Minhas Consultas</button>
          <button className="activeTab">Agendamentos</button>
          <button>Histórico</button>
        </section>

        <button className="backBtn" onClick={() => setPage("consultas")}>
          ← Voltar para especialidades
        </button>

        <h3 className="sectionTitle">
          Clínicas para {especialidadeSelecionada || "consulta"}
        </h3>

        <section className="clinicList">
          {clinicas.map((clinica) => (
            <article className="clinicCard" key={clinica.nome}>
              <div className="clinicImage">🏥</div>

              <div className="clinicInfo">
                <h3>{clinica.nome}</h3>
                <p>Especialidades: {clinica.especialidades}</p>

                <div className="clinicDetails">
                  <span>
                    📍 {clinica.distancia} • {clinica.bairro}
                  </span>
                  <span>🕘 {clinica.horario}</span>
                </div>

                <button
                  onClick={() => {
                    setClinicaSelecionada(clinica);
                    setPage("dataHorario");
                  }}
                >
                  Agendar Consulta
                </button>
              </div>
            </article>
          ))}
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}

function DataHorario({
  setPage,
  especialidadeSelecionada,
  clinicaSelecionada,
  setConsultaAgendada,
}) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [erro, setErro] = useState("");

  const datas = ["12/05", "13/05", "14/05", "15/05", "16/05"];
  const horarios = ["08:00", "09:30", "10:00", "13:30", "15:00", "16:30"];

  function confirmar() {
    if (!dataSelecionada || !horarioSelecionado) {
      setErro("Selecione uma data e um horário");
      return;
    }

    const novaConsulta = {
      especialidade: especialidadeSelecionada,
      clinica: clinicaSelecionada?.nome,
      endereco: clinicaSelecionada?.bairro,
      data: dataSelecionada,
      horario: horarioSelecionado,
      status: "Agendada",
    };

    const consultasSalvas =
      JSON.parse(localStorage.getItem("clicksusConsultas")) || [];

    consultasSalvas.push(novaConsulta);

    localStorage.setItem("clicksusConsultas", JSON.stringify(consultasSalvas));

    setConsultaAgendada(novaConsulta);
    setPage("sucessoConsulta");
  }

  return (
    <>
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
                className={
                  horarioSelecionado === horario ? "selectedOption" : ""
                }
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario}
              </button>
            ))}
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={confirmar}>
            Confirmar
          </button>
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}

function SucessoConsulta({ setPage, consultaAgendada }) {
  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <section className="card successCard">
          <CheckCircle size={145} color="#00a6ac" />

          <h3>Consulta Agendada!</h3>

          <p>
            Sua consulta de <strong>{consultaAgendada?.especialidade}</strong>{" "}
            foi agendada com sucesso.
          </p>

          <p>
            <strong>Clínica:</strong> {consultaAgendada?.clinica}
          </p>

          <p>
            <strong>Data:</strong> {consultaAgendada?.data} às{" "}
            {consultaAgendada?.horario}
          </p>

          <button className="primaryBtn" onClick={() => setPage("home")}>
            Início
          </button>

          <button
            className="linkBtn"
            onClick={() => setPage("minhasConsultas")}
          >
            Ver Consultas
          </button>
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}

function MinhasConsultas({ setPage }) {
  const consultas = JSON.parse(localStorage.getItem("clicksusConsultas")) || [];

  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <section className="tabs">
          <button className="activeTab">Minhas Consultas</button>
          <button onClick={() => setPage("consultas")}>Agendamentos</button>
          <button>Histórico</button>
        </section>

        <h3 className="sectionTitle">Minhas Consultas</h3>

        {consultas.length > 0 ? (
          <section className="historyList">
            {consultas.map((consulta, index) => (
              <article className="myAppointmentCard" key={index}>
                <div className="appointmentDate">
                  <strong>{consulta.data}</strong>
                  <span>{consulta.horario}</span>
                </div>

                <div>
                  <h3>{consulta.especialidade}</h3>
                  <p>{consulta.clinica}</p>
                  <p>Status: {consulta.status}</p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="appointmentBox">
            <p>Nenhuma consulta agendada no momento.</p>

            <button className="primaryBtn" onClick={() => setPage("consultas")}>
              Agendar
            </button>
          </section>
        )}

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}

function HistoricoConsultas({ setPage }) {
  const historico = [
    {
      data: "12/05/2024",
      clinica: "Clínica de Especialidades Consulta Fácil",
      medico: "Dr. João Souza",
      especialidade: "Cardiologista",
      diagnostico: "Hipertensão Arterial",
      prescricao: "Dipirona 50 mg",
    },
    {
      data: "12/05/2024",
      clinica: "Clínica da Família Saúde",
      medico: "Dr. Paulo César",
      especialidade: "Dermatologista",
      diagnostico: "Acne",
      prescricao: "Roacutan",
    },
  ];

  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <section className="tabs">
          <button onClick={() => setPage("minhasConsultas")}>
            Minhas Consultas
          </button>
          <button onClick={() => setPage("consultas")}>Agendamentos</button>
          <button className="activeTab">Histórico</button>
        </section>

        <h3 className="sectionTitle">Histórico de Consultas</h3>

        <section className="historyList">
          {historico.map((item, index) => (
            <article className="historyCard" key={index}>
              <span className="historyDate">{item.data}</span>

              <h3>{item.clinica}</h3>

              <p>🏥 {item.medico}</p>
              <p>❤️ {item.especialidade}</p>
              <p>💉 Diagnóstico: {item.diagnostico}</p>
              <p>💼 Prescrição: {item.prescricao}</p>
            </article>
          ))}
        </section>

        <BottomNav setPage={setPage} active="consultas" />
      </main>
    </>
  );
}

function Farmacia({ setPage }) {
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
              <strong>Losartana 50mg</strong>
              <span>Data: 10/04/2026 às 08:30</span>
            </div>
          </article>

          <article className="pharmacyCardLarge">
            <div>
              <h3>Minhas receita Médicas</h3>
              <p>Acompanhe suas receitas</p>
            </div>

            <button>Ver todos</button>

            <div className="medicineInfo">
              <p>Último envio:09/04/2026 | 17:34 horas</p>
              <span>Médico: Doutor Ramon</span>
              <span>Validade: 09/05/2026</span>
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
          </section>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}

function Medicamentos({ setPage, setMedicamentoSelecionado }) {
  const [modalMedicamento, setModalMedicamento] = useState(null);

  const medicamentos = [
    {
      nome: "Losartana 50mg",
      retirada: "10/04/2026 às 08:30",
      unidade: "Farmácia Popular - Centro",
      status: "Disponível para retirada",
    },
    {
      nome: "Dipirona 500mg",
      retirada: "12/04/2026 às 10:00",
      unidade: "UBS Vila Madalena",
      status: "Aguardando confirmação",
    },
  ];

  return (
    <>
      <Header title="Farmácia" />

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
                <strong>Status:</strong> {modalMedicamento.status}
              </p>

              <p>
                <strong>Data de retirada:</strong> {modalMedicamento.retirada}
              </p>

              <p>
                <strong>Unidade:</strong> {modalMedicamento.unidade}
              </p>

              <p>
                <strong>Dosagem:</strong> 1 comprimido a cada 12 horas
              </p>

              <p>
                <strong>Duração:</strong> Uso contínuo
              </p>

              <button
                className="primaryBtn"
                onClick={() => {
                  setMedicamentoSelecionado(modalMedicamento);
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

function AgendarRetirada({
  setPage,
  medicamentoSelecionado,
  setRetiradaMedicamento,
}) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [erro, setErro] = useState("");

  const datas = ["10/04", "11/04", "12/04", "13/04", "14/04"];

  function confirmarRetirada() {
    if (!dataSelecionada) {
      setErro("Selecione uma data para retirada.");
      return;
    }

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
    setPage("sucessoRetirada");
  }

  return (
    <>
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

          <button className="primaryBtn" onClick={confirmarRetirada}>
            Confirmar Retirada
          </button>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}

function SucessoRetirada({ setPage, retiradaMedicamento }) {
  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <section className="card successCard">
          <CheckCircle size={145} color="#00a6ac" />

          <h3>Retirada Confirmada!</h3>

          <p>
            Seu medicamento <strong>{retiradaMedicamento?.medicamento}</strong>{" "}
            estará disponível para retirada em:
          </p>

          <p>
            <strong>{retiradaMedicamento?.data}</strong>
          </p>

          <p>{retiradaMedicamento?.unidade}</p>

          <button className="primaryBtn" onClick={() => setPage("farmacia")}>
            Voltar à Farmácia
          </button>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}

function UnidadesFarmacia({ setPage }) {
  const unidades = [
    {
      nome: "Farmácia Popular - Centro",
      endereco: "Rua das Flores, 120 - Centro",
      horario: "Seg a Sex: 08:00 às 17:00",
      distancia: "1,2 km",
    },
    {
      nome: "UBS Vila Madalena",
      endereco: "Av. Saúde, 455 - Vila Madalena",
      horario: "Seg a Sex: 07:00 às 18:00",
      distancia: "2,4 km",
    },
    {
      nome: "Farmácia SUS - Butantã",
      endereco: "Rua Esperança, 88 - Butantã",
      horario: "Seg a Sáb: 08:00 às 16:00",
      distancia: "3,1 km",
    },
  ];

  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <button className="backBtn" onClick={() => setPage("farmacia")}>
          ← Voltar para Farmácia
        </button>

        <h3 className="sectionTitle">Unidades de Farmácia</h3>

        <section className="clinicList">
          {unidades.map((unidade) => (
            <article className="clinicCard" key={unidade.nome}>
              <div className="clinicImage">🏥</div>

              <div className="clinicInfo">
                <h3>{unidade.nome}</h3>
                <p>📍 {unidade.endereco}</p>
                <p>🕘 {unidade.horario}</p>
                <p>Distância: {unidade.distancia}</p>
              </div>
            </article>
          ))}
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}

function Receitas({ setPage }) {
  const [nomeMedico, setNomeMedico] = useState("");
  const [arquivo, setArquivo] = useState("");
  const [erro, setErro] = useState("");

  function enviarReceita() {
    if (!nomeMedico || !arquivo) {
      setErro("Informe o nome do médico e selecione um arquivo.");
      return;
    }

    setErro("");
    alert("Receita enviada com sucesso!");
    setPage("farmacia");
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
            placeholder="Dr. Ramon"
          />

          <label>Arquivo da receita *</label>
          <input
            type="file"
            onChange={(e) => setArquivo(e.target.files[0]?.name || "")}
          />

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

function EntregaCasa({ setPage }) {
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
    setResultado("Entrega disponível para sua região.");
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

          <p>Verifique se há disponibilidade de entrega para sua região.</p>

          <label>CEP *</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => {
              const valorFormatado = formatCEP(e.target.value);
              setCep(valorFormatado);
            }}
            placeholder="00000-000"
            maxLength={9}
          />

          {erro && <p className="erro">{erro}</p>}

          {resultado && <p className="seccessMessage">{resultado}</p>}

          <button className="primaryBtn" onClick={verificarEntrega}>
            Verificar
          </button>
        </section>

        <BottomNav setPage={setPage} active="farmacia" />
      </main>
    </>
  );
}

function Vacinas({ setPage, setVacinaSelecionada }) {
  const vacinas = [
    {
      nome: "COVID-19",
      descricao: "Vacina contra coronavírus.",
      status: "Disponível",
    },
    {
      nome: "Influenza",
      descricao: "Vacina contra gripe sazonal.",
      status: "Disponível",
    },
    {
      nome: "Hepatite B",
      descricao: "Prevenção contra hepatite B.",
      status: "Disponível",
    },
    {
      nome: "Febre Amarela",
      descricao: "Proteção contra febre amarela.",
      status: "Disponível",
    },
  ];

  return (
    <>
      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <h3 className="sectionTitle">Agendar Vacina</h3>

        <section className="vaccineList">
          {vacinas.map((vacina) => (
            <article className="vaccineCard" key={vacina.nome}>
              <div className="vaccineIcon">💉</div>

              <div className="vaccineContent">
                <h3>{vacina.nome}</h3>
                <p>{vacina.descricao}</p>
                <span>{vacina.status}</span>

                <button
                  onClick={() => {
                    setVacinaSelecionada(vacina);
                    setPage("unidadesVacina");
                  }}
                >
                  Agendar Vacina
                </button>
              </div>
            </article>
          ))}
        </section>

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}

function UnidadesVacina({
  setPage,
  vacinaSelecionada,
  setUnidadeVacinaSelecionada,
}) {
  const unidades = [
    {
      nome: "UBS Centro",
      endereco: "Rua das Flores, 120 - Centro",
      horario: "Seg a Sex: 08:00 às 17:00",
      distancia: "1,2 km",
    },
    {
      nome: "UBS Vila Madalena",
      endereco: "Av. Saúde, 455 - Vila Madalena",
      horario: "Seg a Sex: 07:00 às 18:00",
      distancia: "2,4 km",
    },
    {
      nome: "Posto de Vacinação Butantã",
      endereco: "Rua Esperança, 88 - Butantã",
      horario: "Seg a Sáb: 08:00 às 16:00",
      distancia: "3,1 km",
    },
  ];

  return (
    <>
      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <button className="backBtn" onClick={() => setPage("vacinas")}>
          ← Voltar para vacinas
        </button>

        <h3 className="sectionTitle">
          Unidades para {vacinaSelecionada?.nome}
        </h3>

        <section className="clinicList">
          {unidades.map((unidade) => (
            <article className="clinicCard" key={unidade.nome}>
              <div className="clinicImage">🏥</div>

              <div className="clinicInfo">
                <h3>{unidade.nome}</h3>
                <p>📍 {unidade.endereco}</p>
                <p>🕘 {unidade.horario}</p>
                <p>Distância: {unidade.distancia}</p>

                <button
                  onClick={() => {
                    setUnidadeVacinaSelecionada(unidade);
                    setPage("agendarVacina");
                  }}
                >
                  Escolher Unidade
                </button>
              </div>
            </article>
          ))}
        </section>

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}

function AgendarVacina({
  setPage,
  vacinaSelecionada,
  unidadeVacinaSelecionada,
  setVacinaAgendada,
}) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [erro, setErro] = useState("");

  const datas = ["20/04", "21/04", "22/04", "23/04", "24/04"];
  const horarios = ["08:00", "09:30", "10:00", "13:30", "15:00"];

  function confirmarAgendamento() {
    if (!dataSelecionada || !horarioSelecionado) {
      setErro("Selecione data e horário.");
      return;
    }

    const novaVacina = {
      vacina: vacinaSelecionada?.nome,
      unidade: unidadeVacinaSelecionada?.nome,
      endereco: unidadeVacinaSelecionada?.endereco,
      data: dataSelecionada,
      horario: horarioSelecionado,
      status: "Agendada",
    };

    const vacinasSalvas =
      JSON.parse(localStorage.getItem("clicksusVacinas")) || [];

    vacinasSalvas.push(novaVacina);

    localStorage.setItem("clicksusVacinas", JSON.stringify(vacinasSalvas));
    setVacinaAgendada(novaVacina);
    setPage("sucessoVacina");
  }

  return (
    <>
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
                className={
                  horarioSelecionado === horario ? "selectedOption" : ""
                }
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario}
              </button>
            ))}
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={confirmarAgendamento}>
            Confirmar Agendamento
          </button>
        </section>

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}

function SucessoVacina({ setPage, vacinaAgendada }) {
  return (
    <>
      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <section className="card successCard">
          <CheckCircle size={145} color="#00a6ac" />

          <h3>Vacina Agendada!</h3>

          <p>
            Sua vacina <strong>{vacinaAgendada?.vacina}</strong> foi agendada
            com sucesso.
          </p>

          <p>
            <strong>Unidade:</strong> {vacinaAgendada?.unidade}
          </p>

          <p>
            <strong>Data:</strong> {vacinaAgendada?.data} às{" "}
            {vacinaAgendada?.horario}
          </p>

          <button className="primaryBtn" onClick={() => setPage("home")}>
            Início
          </button>

          <button className="linkBtn" onClick={() => setPage("minhasVacinas")}>
            Ver Vacinas
          </button>
        </section>

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}

function MinhasVacinas({ setPage }) {
  const vacinas = JSON.parse(localStorage.getItem("clicksusVacinas")) || [];
  return (
    <>
      <Header title="VACINAS" />

      <main className="screen consultasScreen">
        <button className="backBtn" onClick={() => setPage("vacinas")}>
          ← Voltar para Vacinas
        </button>

        <h3 className="sectionTitle">Minhas Vacinas</h3>

        {vacinas.length > 0 ? (
          <section className="historyList">
            {vacinas.map((vacina, index) => (
              <article className="myAppointmentCard" key={index}>
                <div className="appointmentDate">
                  <strong>{vacina.data}</strong>
                  <span>{vacina.horario}</span>
                </div>

                <div>
                  <h3>{vacina.vacina}</h3>
                  <p>{vacina.unidade}</p>
                  <p>Status: {vacina.status}</p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="appointmentBox">
            <p>Nenhuma vacina agendada no momento.</p>

            <button className="primaryBtn" onClick={() => setPage("vacinas")}>
              Agendar
            </button>
          </section>
        )}

        <BottomNav setPage={setPage} active="vacinas" />
      </main>
    </>
  );
}

function Perfil({ setPage, user, setUser }) {
  const usuario = user || JSON.parse(localStorage.getItem("clicksusUser"));

  function sairDaConta() {
    setUser(null);
    setPage("login");
  }

  return (
    <>
      <Header title="PERFIL" />

      <main className="screen perfilScreen">
        <section className="profileHero">
          <div className="profileAvatar">
            <User />
          </div>

          <div>
            <h3>{usuario?.nome || "Usuário ClickSUS"}</h3>
            <p>Paciente cadastrado no ClickSUS</p>
          </div>
        </section>

        <section className="profileDetails">
          <h3>Dados pessoais</h3>

          <div className="profileRow">
            <span>CPF</span>
            <strong>{usuario?.cpf || "Não informado"}</strong>
          </div>

          <div className="profileRow">
            <span>Telefone</span>
            <strong>{usuario?.telefone || "Não informado"}</strong>
          </div>

          <div className="profileRow">
            <span>Email</span>
            <strong>{usuario?.email || "Não informado"}</strong>
          </div>

          <div className="profileRow">
            <span>Endereço</span>
            <strong>{usuario?.endereco || "Não informado"}</strong>
          </div>
        </section>

        <section className="profileActions">
          <button onClick={() => setPage("editarPerfil")}>Editar Dados</button>
          <button onClick={() => setPage("minhasConsultas")}>
            Minhas Consultas
          </button>
          <button onClick={() => setPage("minhasVacinas")}>
            Minhas Vacinas
          </button>
          <button className="logoutBtn" onClick={sairDaConta}>
            Sair da Conta
          </button>
        </section>

        <MiniChatBot />
        <BottomNav setPage={setPage} active="perfil" />
      </main>
    </>
  );
}

function MiniChatBot() {
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([
    {
      autor: "bot",
      texto:
        "Olá! Sou o assistente virtual do ClickSUS. Posso ajudar com consultas, vacinas, farmácia e perfil.",
    },
  ]);

  function gerarResposta(textoDigitado) {
    const texto = textoDigitado.toLowerCase();

    if (texto.includes("consulta")) {
      return "Para agendar uma consulta, acesse Consultas e escolha especialidade, clínica, data e horário.";
    }

    if (texto.includes("vacina")) {
      return "Para vacinas, acesse Vacinas, escolha a vacina desejada e selecione uma unidade.";
    }

    if (texto.includes("remédio") || texto.includes("medicamento")) {
      return "Na aba Farmácia você pode ver medicamentos, receitas, unidades e retirada.";
    }

    if (texto.includes("perfil") || texto.includes("dados")) {
      return "No Perfil você pode visualizar e editar seus dados pessoais.";
    }

    return "Posso te ajudar com consultas, vacinas, farmácia ou dados do perfil.";
  }

  function enviarMensagem(textoRapido = mensagem) {
    if (!textoRapido.trim()) return;

    const resposta = gerarResposta(textoRapido);

    setChat([
      ...chat,
      { autor: "user", texto: textoRapido },
      { autor: "bot", texto: resposta },
    ]);

    setMensagem("");
  }

  return (
    <section className="miniChatCard">
      <div className="miniChatHeader">
        <div className="botAvatar">🤖</div>

        <div>
          <h3>Assistente ClickSUS</h3>
          <p>Online agora • Respostas rápidas</p>
        </div>
      </div>

      <div className="quickSuggestions">
        <button onClick={() => enviarMensagem("Como agendar consulta?")}>
          Consulta
        </button>
        <button onClick={() => enviarMensagem("Como agendar vacina?")}>
          Vacina
        </button>
        <button onClick={() => enviarMensagem("Meus medicamentos")}>
          Farmácia
        </button>
      </div>

      <div className="miniChatMessages">
        {chat.map((msg, index) => (
          <div key={index} className={`miniMessage ${msg.autor}`}>
            {msg.autor === "bot" && <span className="messageIcon">✚</span>}
            <p>{msg.texto}</p>
          </div>
        ))}
      </div>

      <div className="miniChatInput">
        <input
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua dúvida..."
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
        />

        <button onClick={() => enviarMensagem()}>Enviar</button>
      </div>
    </section>
  );
}

function EditarPerfil({ setPage, user, setUser }) {
  const usuarioAtual = user || JSON.parse(localStorage.getItem("clicksusUser"));

  const [form, setForm] = useState({
    nome: usuarioAtual?.nome || "",
    endereco: usuarioAtual?.endereco || "",
    email: usuarioAtual?.email || "",
    telefone: usuarioAtual?.telefone || "",
    cpf: usuarioAtual?.cpf || "",
    senha: usuarioAtual?.senha || "",
  });

  const [erro, setErro] = useState("");

  function updateField(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function salvarDados() {
    const camposVazios = Object.values(form).some((valor) => !valor);

    if (camposVazios) {
      setErro("Preencha todos os campos.");
      return;
    }

    localStorage.setItem("clicksusUser", JSON.stringify(form));
    setUser(form);
    setPage("perfil");
  }

  return (
    <>
      <Header title="PERFIL" />

      <main className="screen perfilScreen">
        <button className="backBtn" onClick={() => setPage("perfil")}>
          ← Voltar para Perfil
        </button>

        <section className="appointmentBox">
          <h3>Editar Dados</h3>

          <label>Nome *</label>
          <input
            value={form.nome}
            onChange={(e) => updateField("nome", e.target.value)}
          />

          <label>Endereço *</label>
          <input
            value={form.endereco}
            onChange={(e) => updateField("endereco", e.target.value)}
          />

          <label>Email *</label>
          <input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            type="email"
          />

          <label>Telefone *</label>
          <input
            value={form.telefone}
            onChange={(e) =>
              updateField("telefone", formatPhone(e.target.value))
            }
            inputMode="numeric"
          />

          <label>CPF *</label>
          <input
            value={form.cpf}
            onChange={(e) => updateField("cpf", formatCPF(e.target.value))}
            inputMode="numeric"
          />

          <label>Senha *</label>
          <input
            value={form.senha}
            onChange={(e) => updateField("senha", e.target.value)}
            type="password"
          />

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={salvarDados}>
            Salvar
          </button>
        </section>

        <BottomNav setPage={setPage} active="perfil" />
      </main>
    </>
  );
}

function Placeholder({ title, setPage }) {
  return (
    <>
      <Header title={title.toUpperCase()} />

      <main className="screen">
        <section className="card successCard">
          <h3>{title}</h3>
          <p>Essa tela será desenvolvida na próxima etapa.</p>

          <button className="primaryBtn" onClick={() => setPage("home")}>
            Voltar ao início
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
