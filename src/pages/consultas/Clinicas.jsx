import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import ConsultaTabs from "../../components/ConsultaTabs";
import { clinicas } from "../../data/clinicas";

export default function Clinicas({ setPage, especialidadeSelecionada, setClinicaSelecionada }) {
  return (
    <>
      <Header title="CONSULTAS" />

      <main className="screen consultasScreen">
        <input className="searchInput" placeholder="Buscar clínica..." />

        <ConsultaTabs setPage={setPage} active="consultas" />

        <button className="backBtn" onClick={() => setPage("consultas")}>
          ← Voltar para especialidades
        </button>

        <h3 className="sectionTitle">
          Clínicas para {especialidadeSelecionada || "consulta"}
        </h3>

        <div className="mapContainer">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6700%2C-23.5800%2C-46.5900%2C-23.5200&layer=mapnik"
            title="Mapa de clínicas em São Paulo"
            loading="lazy"
          />
        </div>

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
                  {clinica.telefone && <span>📞 {clinica.telefone}</span>}
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
