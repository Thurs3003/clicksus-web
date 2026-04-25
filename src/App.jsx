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
} from "lucide-react";

import {FaPhoneAlt } from "react-icons/fa";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("clicksusUser")) || null
  );
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);

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
          />
      )}

      {["perfil", "farmacia", "vacinas"].includes(page) && (
        <Placeholder title={page} setPage={setPage} />
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
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
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
    setErro("Senha incorreta.")
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
    email:"usuario@gov.br",
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
            onChange={(e) => updateField("telefone", formatPhone(e.target.value))}
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
            <h3>Bem-Vindo(a), {nome}!</h3>
            <p>Como podemos ajudar você hoje?</p>
          </div>

          <div className="doctor">👨‍⚕️</div>
        </section>

        <section className="grid">
          <MenuCard icon={<User />} title="Perfil" onClick={() => setPage("perfil")} />
          <MenuCard icon={<CalendarDays />} title="Consultas" onClick={() => setPage("consultas")} />
          <MenuCard icon={<ClipboardPen />} title="Cadastro" onClick={() => setPage("cadastro")} />
          <MenuCard icon={<Syringe />} title="Vacinas" onClick={() => setPage("vacinas")} />
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
          <button>Histórico</button>
        </section>

        <section className="specialtyList">
          {especialidades.map((especialidade) => (
            <button
              key={especialidade}
              className="specialtyItem"
              onClick={() => {
                setEspecialidadeSelecionada(especialidade)
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

function Clinicas({ setPage, especialidadeSelecionada, setClinicaSelecionada }) {
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
                  <span>📍 {clinica.distancia} • {clinica.bairro}</span>
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
  )
}

function DataHorario({ setPage, especialidadeSelecionada, clinicaSelecionada }) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [erro, setErro] = useState("");

  const datas = ["12/05", "13/05", "14/05", "15/05", "16/05"];
  const horarios = ["08:00", "09:30", "10:00", "13:30", "15:00", "16:30"];

  function confirmar() {
    if (!dataSelecionada || !horarioSelecionado) {
      setErro("Selecione uma data e um horário.");
      return;
    }

    alert(
      `Consulta selecionada:\n${especialidadeSelecionada}\n${clinicaSelecionada?.nome}\n${dataSelecionada} às ${horarioSelecionado}`
    );
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
                className={horarioSelecionado === horario ? "selectedOption" : ""}
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