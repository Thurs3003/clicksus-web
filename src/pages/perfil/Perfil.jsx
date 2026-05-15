import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import MiniChatBot from "../../components/MiniChatBot";
import ProfileAvatar from "../../components/ProfileAvatar";

export default function Perfil({ setPage, user, setUser }) {
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
          <ProfileAvatar user={usuario} size={115} />

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
            <span>Nascimento</span>
            <strong>{usuario?.dataNascimento || "Não informado"}</strong>
          </div>

          <div className="profileRow">
            <span>Tipo Sanguíneo</span>
            <strong>{usuario?.tipoSanguineo || "Não informado"}</strong>
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
          <button onClick={() => setPage("editarPerfil")}>✏️ Editar Dados</button>
          <button onClick={() => setPage("carteirinha")}>🪪 Carteirinha de Saúde</button>
          <button onClick={() => setPage("minhasConsultas")}>📅 Minhas Consultas</button>
          <button onClick={() => setPage("minhasVacinas")}>💉 Minhas Vacinas</button>
          <button onClick={() => setPage("notificacoes")}>🔔 Notificações</button>
          <button onClick={() => setPage("sobreClickSUS")}>ℹ️ Sobre o ClickSUS</button>
          <button className="logoutBtn" onClick={sairDaConta}>🚪 Sair da Conta</button>
        </section>

        <MiniChatBot />
        <BottomNav setPage={setPage} active="perfil" />
      </main>
    </>
  );
}
