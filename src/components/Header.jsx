export default function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="logoArea">
        <div className="logoBox">✚</div>
        <span>ClickSUS</span>
      </div>

      <div>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
    </header>
  );
}
