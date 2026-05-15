import { User, CalendarDays, Pill, Syringe } from "lucide-react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import MenuCard from "../../components/MenuCard";

export default function HomePage({ user, setPage }) {
  const nome = user?.nome || "Paciente";

  return (
    <>
      <Header title="INÍCIO" />

      <main className="screen homeScreen">
        <section className="card welcomeCard">
          <div>
            <h3>
              Bem-Vindo(a),
              <span className="welcomeName"> {nome}!</span>
            </h3>
            <p>Como podemos ajudar você hoje?</p>
          </div>

          <div className="doctor">👨‍⚕️</div>
        </section>

        <section className="grid">
          <MenuCard
            icon={<User />}
            title="Perfil"
            onClick={() => setPage("perfil")}
          />
          <MenuCard
            icon={<CalendarDays />}
            title="Consultas"
            onClick={() => setPage("consultas")}
          />
          <MenuCard
            icon={<Pill />}
            title="Farmácia"
            onClick={() => setPage("farmacia")}
          />
          <MenuCard
            icon={<Syringe />}
            title="Vacinas"
            onClick={() => setPage("vacinas")}
          />
        </section>

        <BottomNav setPage={setPage} active="home" />
      </main>
    </>
  );
}
