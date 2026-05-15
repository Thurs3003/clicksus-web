import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

const membros = [
  { nome: "Arthur de Assis Matos", ra: "852141669", papel: "Desenvolvimento Front-end" },
  { nome: "Lucas Simões Silva", ra: "826183140", papel: "Apresentação e Conteúdo" },
  { nome: "Maria Eduarda Figueiredo Da Fonseca Silva", ra: "8261100503", papel: "Design & UX" },
  { nome: "Marcus Vinícius Lima de Araujo Goes", ra: "8261106287", papel: "Design & UX" },
  { nome: "Icaro Rafael Borges", ra: "825228115", papel: "Pesquisa e Documentação" },
  { nome: "Ludanio Francisco Antônio", ra: "826187216", papel: "Apresentação e Conteúdo" },
];

const tecnologias = ["React 19", "Vite", "JavaScript", "CSS3", "lucide-react", "localStorage"];

export default function SobreClickSUS({ setPage }) {
  return (
    <>
      <Header title="SOBRE" />

      <main className="screen perfilScreen">
        <button className="backBtn" onClick={() => setPage("perfil")}>
          ← Voltar para Perfil
        </button>

        <div className="sobreHero">
          <div className="sobreLogo">✚</div>
          <h2>ClickSUS</h2>
          <p>Interface digital aprimorada para o Sistema Único de Saúde</p>
        </div>

        <div className="sobreSection">
          <h3>📋 Sobre o Projeto</h3>
          <p>
            O ClickSUS é uma interface digital desenvolvida com o objetivo de
            tornar os serviços do SUS mais acessíveis, intuitivos e modernos
            para todos os cidadãos brasileiros.
          </p>
          <p>
            O projeto permite agendar consultas médicas, vacinas e gerenciar
            medicamentos de forma simples e rápida, diretamente pelo celular ou
            computador — sem filas ou ligações.
          </p>
        </div>

        <div className="sobreSection">
          <h3>🎓 Contexto Acadêmico</h3>
          <p>
            Projeto A3 — Atividade de Avaliação Integrada desenvolvido como
            trabalho interdisciplinar do curso de graduação.
          </p>
          <p>
            Disciplinas envolvidas: Desenvolvimento de Sistemas, Interface
            Humano-Computador e Inovação Tecnológica.
          </p>
        </div>

        <div className="sobreSection">
          <h3>⚙️ Tecnologias Utilizadas</h3>
          <div className="sobreTechList">
            {tecnologias.map((tech) => (
              <span key={tech} className="techChip">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="sobreSection">
          <h3>👥 Equipe</h3>
          {membros.map((membro) => (
            <div className="memberCard" key={membro.ra}>
              <div className="memberAvatar">
                {membro.nome[0]}
              </div>
              <div className="memberInfo">
                <strong>{membro.nome}</strong>
                <span>{membro.papel} • RA: {membro.ra}</span>
              </div>
            </div>
          ))}
        </div>

        <BottomNav setPage={setPage} active="perfil" />
      </main>
    </>
  );
}
