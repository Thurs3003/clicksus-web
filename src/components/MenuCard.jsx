export default function MenuCard({ icon, title, onClick }) {
  return (
    <button className="menuCard" onClick={onClick}>
      {icon}
      <strong>{title}</strong>
    </button>
  );
}
