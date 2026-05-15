import { useState } from "react";
import Header from "../../components/Header";
import { formatCPF, formatPhone } from "../../utils/formatters";

const TIPOS_SANGUINEOS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Não sei"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Cadastro({ setPage, setUser }) {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    tipoSanguineo: "",
    dataNascimento: "",
  });

  const [erro, setErro] = useState("");

  function updateField(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function cadastrar() {
    const camposObrigatorios = ["nome", "endereco", "email", "telefone", "cpf", "senha"];
    const camposVazios = camposObrigatorios.some((campo) => !form[campo]);

    if (camposVazios) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.cpf.length < 14) {
      setErro("Digite um CPF válido.");
      return;
    }

    if (!EMAIL_REGEX.test(form.email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("clicksusUser"));
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
            placeholder="Seu Nome Completo"
          />

          <label>Endereço *</label>
          <input
            value={form.endereco}
            onChange={(e) => updateField("endereco", e.target.value)}
            placeholder="Av. Paulista, 1000 – Bela Vista"
          />

          <label>Email *</label>
          <input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="email@exemplo.com"
            type="email"
            inputMode="email"
          />

          <label>Telefone *</label>
          <input
            value={form.telefone}
            onChange={(e) => updateField("telefone", formatPhone(e.target.value))}
            placeholder="(11) 98765-4321"
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

          <label>Data de Nascimento</label>
          <input
            value={form.dataNascimento}
            onChange={(e) => updateField("dataNascimento", e.target.value)}
            placeholder="DD/MM/AAAA"
            inputMode="numeric"
          />

          <label>Tipo Sanguíneo</label>
          <select
            value={form.tipoSanguineo}
            onChange={(e) => updateField("tipoSanguineo", e.target.value)}
            style={{
              width: "100%", height: 56, borderRadius: 32,
              border: "1.5px solid #32c5ca", padding: "0 22px",
              fontSize: 18, outline: "none", background: "white",
              boxShadow: "4px 4px 0 #d3d3d3",
            }}
          >
            <option value="">Selecione...</option>
            {TIPOS_SANGUINEOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {erro && <p className="erro">{erro}</p>}

          <button className="primaryBtn" onClick={cadastrar}>
            Cadastrar
          </button>

          <button className="linkBtn" onClick={() => setPage("login")}>
            Já tenho cadastro
          </button>

          <p className="lgpd">Lei Geral de Proteção de Dados (LGPD)</p>
        </section>
      </main>
    </>
  );
}
