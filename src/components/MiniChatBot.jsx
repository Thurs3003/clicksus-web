import { useState } from "react";

function gerarResposta(textoDigitado) {
  const texto = textoDigitado.toLowerCase();

  if (texto.includes("consulta") || texto.includes("agendar consulta")) {
    return "Para agendar uma consulta, acesse Consultas, escolha a especialidade, selecione uma clínica e depois a data e horário disponíveis.";
  }
  if (texto.includes("vacina") || texto.includes("agendar vacina")) {
    return "Para vacinas, acesse Vacinas, escolha a vacina desejada, selecione uma unidade de saúde e confirme o agendamento.";
  }
  if (texto.includes("remédio") || texto.includes("medicamento") || texto.includes("farmácia") || texto.includes("farmacia")) {
    return "Na aba Farmácia você pode ver seus medicamentos disponibilizados pelo SUS, enviar receitas, encontrar unidades e solicitar retiradas.";
  }
  if (texto.includes("perfil") || texto.includes("dados") || texto.includes("editar")) {
    return "No Perfil você pode visualizar e editar seus dados pessoais como nome, telefone, endereço e e-mail.";
  }
  if (texto.includes("histórico") || texto.includes("historico")) {
    return "Seu histórico de consultas fica disponível na aba Consultas > Histórico. Lá você encontra diagnósticos e prescrições anteriores.";
  }
  if (texto.includes("receita")) {
    return "Para enviar uma receita médica, acesse Farmácia > Receitas e informe o nome do médico e anexe o arquivo da receita.";
  }
  if (texto.includes("entrega") || texto.includes("casa")) {
    return "O serviço de entrega em casa está disponível em Farmácia > Entrega em Casa. Verifique a disponibilidade informando seu CEP.";
  }

  return "Posso te ajudar com consultas, vacinas, farmácia, receitas ou dados do seu perfil. Como posso ajudar?";
}

export default function MiniChatBot() {
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([
    {
      autor: "bot",
      texto: "Olá! Sou o assistente virtual do ClickSUS. Posso ajudar com consultas, vacinas, farmácia e perfil.",
    },
  ]);

  function enviarMensagem(textoRapido = mensagem) {
    if (!textoRapido.trim()) return;

    const resposta = gerarResposta(textoRapido);

    setChat((prev) => [
      ...prev,
      { autor: "user", texto: textoRapido },
      { autor: "bot", texto: resposta },
    ]);

    setMensagem("");
  }

  return (
    <section className="miniChatCard">
      <div className="miniChatHeader">
        <div className="botAvatar">🤖</div>

        <div>
          <h3>Assistente ClickSUS</h3>
          <p>Online agora • Respostas rápidas</p>
        </div>
      </div>

      <div className="quickSuggestions">
        <button onClick={() => enviarMensagem("Como agendar consulta?")}>
          Consulta
        </button>
        <button onClick={() => enviarMensagem("Como agendar vacina?")}>
          Vacina
        </button>
        <button onClick={() => enviarMensagem("Meus medicamentos")}>
          Farmácia
        </button>
      </div>

      <div className="miniChatMessages">
        {chat.map((msg, index) => (
          <div key={index} className={`miniMessage ${msg.autor}`}>
            {msg.autor === "bot" && <span className="messageIcon">✚</span>}
            <p>{msg.texto}</p>
          </div>
        ))}
      </div>

      <div className="miniChatInput">
        <input
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua dúvida..."
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
        />
        <button onClick={() => enviarMensagem()}>Enviar</button>
      </div>
    </section>
  );
}
