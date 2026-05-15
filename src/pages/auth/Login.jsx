import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Header from "../../components/Header";
import GoogleIcon from "../../components/GoogleIcon";
import { formatCPF } from "../../utils/formatters";

const DEMO_USER = {
  nome: "Maria da Silva",
  cpf: "123.456.789-09",
  email: "maria.silva@demo.com.br",
  telefone: "(11) 98765-4321",
  endereco: "Av. Paulista, 1578 – Bela Vista, São Paulo – SP",
  senha: "demo1234",
  tipoSanguineo: "O+",
  dataNascimento: "15/08/1985",
  loginSocial: "demo",
};

const DEMO_CONSULTAS = [
  {
    especialidade: "Clínico Geral",
    clinica: "UBS Jardim Paulista",
    endereco: "Rua Haddock Lobo, 595 – Jardim Paulista",
    data: "20/05",
    horario: "09:00",
    status: "Agendada",
  },
  {
    especialidade: "Cardiologista",
    clinica: "Centro de Especialidades Consulta Fácil",
    endereco: "Rua da Consolação, 1850 – Consolação",
    data: "21/05",
    horario: "10:30",
    status: "Agendada",
  },
];

const DEMO_VACINAS = [
  {
    vacina: "Influenza (Gripe)",
    unidade: "UBS Jardim Paulista",
    endereco: "Rua Haddock Lobo, 595 – Jardim Paulista",
    data: "19/05",
    horario: "07:30",
    status: "Agendada",
  },
];

const DEMO_RETIRADAS = [
  {
    medicamento: "Losartana Potássica 50mg",
    data: "16/05",
    unidade: "Farmácia Dose Certa – Centro",
  },
];

export default function Login({ setPage, setUser, goHome }) {
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

  function entrarModoDemo() {
    localStorage.setItem("clicksusUser", JSON.stringify(DEMO_USER));
    localStorage.setItem("clicksusConsultas", JSON.stringify(DEMO_CONSULTAS));
    localStorage.setItem("clicksusVacinas", JSON.stringify(DEMO_VACINAS));
    localStorage.setItem("clicksusRetiradas", JSON.stringify(DEMO_RETIRADAS));
    setUser(DEMO_USER);
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

          <button className="demoBtn" onClick={entrarModoDemo}>
            🎓 Entrar em modo demonstração
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
