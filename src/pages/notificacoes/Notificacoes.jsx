import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

function gerarNotificacoes() {
  const consultas = JSON.parse(localStorage.getItem("clicksusConsultas")) || [];
  const vacinas = JSON.parse(localStorage.getItem("clicksusVacinas")) || [];
  const retiradas = JSON.parse(localStorage.getItem("clicksusRetiradas")) || [];

  const notifs = [
    {
      id: "boas-vindas",
      icone: "🏥",
      tipo: "info",
      titulo: "Bem-vindo(a) ao ClickSUS!",
      descricao: "Sua plataforma de saúde digital. Agende consultas, vacinas e gerencie seus medicamentos.",
      tempo: "Agora",
      lida: false,
    },
  ];

  consultas.forEach((c, i) => {
    notifs.push({
      id: `consulta-${i}`,
      icone: "📅",
      tipo: "success",
      titulo: "Consulta agendada",
      descricao: `${c.especialidade} em ${c.clinica} — ${c.data} às ${c.horario}.`,
      tempo: "Recentemente",
      lida: i > 0,
    });
  });

  vacinas.forEach((v, i) => {
    notifs.push({
      id: `vacina-${i}`,
      icone: "💉",
      tipo: "success",
      titulo: "Vacinação agendada",
      descricao: `${v.vacina} em ${v.unidade} — ${v.data} às ${v.horario}.`,
      tempo: "Recentemente",
      lida: true,
    });
  });

  retiradas.forEach((r, i) => {
    notifs.push({
      id: `retirada-${i}`,
      icone: "💊",
      tipo: "warning",
      titulo: "Medicamento para retirada",
      descricao: `${r.medicamento} disponível para retirada em ${r.data} — ${r.unidade}.`,
      tempo: "Pendente",
      lida: false,
    });
  });

  notifs.push({
    id: "vacinas-dia",
    icone: "🛡️",
    tipo: "info",
    titulo: "Mantenha suas vacinas em dia",
    descricao: "Verifique o calendário vacinal e agende suas próximas doses na aba Vacinas.",
    tempo: "Informativo",
    lida: true,
  });

  return notifs;
}

export default function Notificacoes({ setPage }) {
  const notificacoes = gerarNotificacoes();
  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <>
      <Header title="AVISOS" />

      <main className="screen notifScreen">
        <button className="backBtn" onClick={() => setPage("perfil")}>
          ← Voltar para Perfil
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 className="sectionTitle" style={{ margin: 0 }}>Notificações</h3>
          {naoLidas > 0 && (
            <span style={{
              background: "#00a6ac", color: "white", borderRadius: 999,
              padding: "4px 14px", fontWeight: "bold", fontSize: 14,
            }}>
              {naoLidas} nova{naoLidas > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {notificacoes.length === 0 ? (
          <div className="emptyNotif">
            <p>🔔</p>
            <p>Nenhuma notificação por enquanto.</p>
          </div>
        ) : (
          <div className="notifList">
            {notificacoes.map((notif) => (
              <div key={notif.id} className={`notifCard ${notif.lida ? "" : "unread"}`}>
                <div className={`notifIcon ${notif.tipo}`}>{notif.icone}</div>
                <div className="notifContent">
                  <strong>{notif.titulo}</strong>
                  <p>{notif.descricao}</p>
                  <span className="notifTime">{notif.tempo}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <BottomNav setPage={setPage} active="perfil" />
      </main>
    </>
  );
}
