import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { unidadesFarmacia } from "../../data/unidades";

export default function UnidadesFarmacia({ setPage }) {
  return (
    <>
      <Header title="FARMÁCIA" />

      <main className="screen farmaciaScreen">
        <button className="backBtn" onClick={() => setPage("farmacia")}>
          ← Voltar para Farmácia
        </button>

        <h3 className="sectionTitle">Unidades de Farmácia</h3>

        <div className="mapContainer">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6700%2C-23.5800%2C-46.5900%2C-23.5200&layer=mapnik"
            title="Mapa de farmácias em São Paulo"
            loading="lazy"
          />
        </div>

        <section className="clinicList">
          {unidadesFarmacia.map((unidade) => (
            <article className="clinicCard" key={unidade.nome}>
              <div className="clinicImage">🏥</div>

              <div className="clinicInfo">
                <h3>{unidade.nome}</h3>
                <p>📍 {unidade.endereco}</p>
                <p>🕘 {unidade.horario}</p>
                <p>📞 {unidade.telefone}</p>
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
