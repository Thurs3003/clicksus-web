export default function ConsultaTabs({ setPage, active }) {
  const tabs = [
    { id: "consultas", label: "Agendamentos" },
    { id: "minhasConsultas", label: "Minhas Consultas" },
    { id: "historicoConsultas", label: "Histórico" },
  ];

  const activeIndex = tabs.findIndex((tab) => tab.id === active);

  return (
    <section className="tabs consultaTabs">
      <span
        className="tabIndicator"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={active === tab.id ? "tabButton activeText" : "tabButton"}
          onClick={() => setPage(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </section>
  );
}
