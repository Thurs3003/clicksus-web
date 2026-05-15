import { User, CalendarDays, Home, Pill, Syringe } from "lucide-react";

export default function BottomNav({ setPage, active }) {
  return (
    <nav className="bottomNav">
      <button
        className={active === "perfil" ? "activeNav" : ""}
        onClick={() => setPage("perfil")}
      >
        <User />
      </button>

      <button
        className={active === "consultas" ? "activeNav" : ""}
        onClick={() => setPage("consultas")}
      >
        <CalendarDays />
      </button>

      <button
        className={active === "home" ? "activeNav" : ""}
        onClick={() => setPage("home")}
      >
        <Home />
      </button>

      <button
        className={active === "farmacia" ? "activeNav" : ""}
        onClick={() => setPage("farmacia")}
      >
        <Pill />
      </button>

      <button
        className={active === "vacinas" ? "activeNav" : ""}
        onClick={() => setPage("vacinas")}
      >
        <Syringe />
      </button>
    </nav>
  );
}
