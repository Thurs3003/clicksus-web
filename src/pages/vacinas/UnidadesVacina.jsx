import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { unidadesVacina } from "../../data/unidades";

export default function UnidadesVacina({
  setPage,
  vacinaSelecionada,
  setUnidadeVacinaSelecionada,
}) {
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

        <div className="mapContainer">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6700%2C-23.5800%2C-46.5900%2C-23.5200&layer=mapnik"
            title="Mapa de postos de vacinação em São Paulo"
            loading="lazy"
          />
        </div>

        <section className="clinicList">
          {unidadesVacina.map((unidade) => (
            <article className="clinicCard" key={unidade.nome}>
              <div className="clinicImage">🏥</div>

              <div className="clinicInfo">
                <h3>{unidade.nome}</h3>
                <p>📍 {unidade.endereco}</p>
                <p>🕘 {unidade.horario}</p>
                <p>📞 {unidade.telefone}</p>
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
