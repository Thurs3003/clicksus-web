const CORES = ["#00a6ac", "#55d1d1", "#008d96", "#3dc8c8", "#16aeb8"];

export default function ProfileAvatar({ user, size = 115 }) {
  const foto = user?.foto;
  const nome = user?.nome || "";

  if (foto) {
    return (
      <img
        src={foto}
        alt="Foto de perfil"
        className="profileAvatarImg"
        style={{ width: size, height: size }}
      />
    );
  }

  const cor = CORES[(nome.charCodeAt(0) || 0) % CORES.length];
  const iniciais = nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  return (
    <div
      className="profileAvatarInitials"
      style={{ background: cor, width: size, height: size, minWidth: size, fontSize: size * 0.37 }}
    >
      {iniciais}
    </div>
  );
}
