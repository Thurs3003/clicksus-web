import { useState, useRef } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import ProfileAvatar from "../../components/ProfileAvatar";
import { formatCPF, formatPhone } from "../../utils/formatters";

const TIPOS_SANGUINEOS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Não sei"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EditarPerfil({ setPage, user, setUser }) {
  const usuarioAtual = user || JSON.parse(localStorage.getItem("clicksusUser"));
  const isSocialLogin = !!usuarioAtual?.loginSocial;
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    nome: usuarioAtual?.nome || "",
    endereco: usuarioAtual?.endereco || "",
    email: usuarioAtual?.email || "",
    telefone: usuarioAtual?.telefone || "",
    cpf: usuarioAtual?.cpf || "",
    senha: usuarioAtual?.senha || "",
    tipoSanguineo: usuarioAtual?.tipoSanguineo || "",
    dataNascimento: usuarioAtual?.dataNascimento || "",
    foto: usuarioAtual?.foto || "",
    loginSocial: usuarioAtual?.loginSocial || "",
  });

  const [erro, setErro] = useState("");

  function updateField(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => updateField("foto", ev.target.result);
    reader.readAsDataURL(file);
  }

  function salvarDados() {
    const camposObrigatorios = ["nome", "endereco", "email", "telefone", "cpf"];
    const camposVazios = camposObrigatorios.some((campo) => !form[campo]);

    if (camposVazios) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!EMAIL_REGEX.test(form.email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (!isSocialLogin && !form.senha) {
      setErro("Informe sua senha.");
      return;
    }

    localStorage.setItem("clicksusUser", JSON.stringify(form));
    setUser(form);
    setPage("perfil");
  }

  const selectStyle = {
    width: "100%", height: 56, borderRadius: 32,
    border: "1.5px solid #32c5ca", padding: "0 22px",
    fontSize: 18, outline: "none", background: "white",
    boxShadow: "4px 4px 0 #d3d3d3",
  };

  return (
    <>
      <Header title="PERFIL" />

      <main className="screen perfilScreen">
        <button className="backBtn" onClick={() => setPage("perfil")}>
          ← Voltar para Perfil
        </button>

        <section className="appointmentBox">
          <h3>Editar Dados</h3>

          {/* Foto de perfil */}
          <label>Foto de perfil</label>
          <div className="photoUploadBox">
            <ProfileAvatar user={form} size={72} />
            <div>
              <p style={{ margin: "0 0 8px", color: "#555", fontSize: 14 }}>
                {form.foto ? "Foto carregada" : "Nenhuma foto selecionada"}
              </p>
              <button
                className="photoUploadBtn"
                onClick={() => fileInputRef.current?.click()}
              >
                📷 Escolher foto
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

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
            inputMode="email"
          />

          <label>Telefone *</label>
          <input
            value={form.telefone}
            onChange={(e) => updateField("telefone", formatPhone(e.target.value))}
            inputMode="numeric"
          />

          <label>CPF *</label>
          <input
            value={form.cpf}
            onChange={(e) => updateField("cpf", formatCPF(e.target.value))}
            inputMode="numeric"
          />

          <label>Data de Nascimento</label>
          <input
            value={form.dataNascimento}
            onChange={(e) => updateField("dataNascimento", e.target.value)}
            placeholder="DD/MM/AAAA"
          />

          <label>Tipo Sanguíneo</label>
          <select
            value={form.tipoSanguineo}
            onChange={(e) => updateField("tipoSanguineo", e.target.value)}
            style={selectStyle}
          >
            <option value="">Selecione...</option>
            {TIPOS_SANGUINEOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {!isSocialLogin && (
            <>
              <label>Senha *</label>
              <input
                value={form.senha}
                onChange={(e) => updateField("senha", e.target.value)}
                type="password"
              />
            </>
          )}

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
