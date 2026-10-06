import { useRef, useState } from "react";

// Ações fora de formulários também precisam bloquear cliques repetidos e
// consumir a rejeição da API, mantendo a mensagem junto dos controles.
export default function useActionFeedback() {
  const running = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  async function run(action, successMessage = "") {
    if (running.current) return false;
    running.current = true;
    setPending(true);
    setError("");
    setFeedback("");
    try {
      await action();
      setFeedback(successMessage);
      return true;
    } catch (cause) {
      setError(cause.message || "Não foi possível concluir a operação. Tente novamente.");
      return false;
    } finally {
      running.current = false;
      setPending(false);
    }
  }

  return { run, pending, error, feedback };
}
