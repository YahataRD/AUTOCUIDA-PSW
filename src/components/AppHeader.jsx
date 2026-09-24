import { formatKm } from "../utils/maintenance";

export default function AppHeader({ page, currentKm }) {
  const pageContent = {
    dashboard: {
      eyebrow: "AutoCUIDA",
      title: "Painel",
      description: "",
    },
    garage: {
      eyebrow: "Garagem",
      title: "Seu veículo",
      description:
        "Consulte os dados cadastrados e informe a leitura mais recente do odômetro.",
    },
    service: {
      eyebrow: "Serviço",
      title: "Registrar manutenção",
      description:
        "Informe o serviço realizado para encerrar o alerta e iniciar um novo ciclo.",
    },
    costs: {
      eyebrow: "Custos",
      title: "Relatório de custos",
      description:
        "Acompanhe as despesas e consulte o histórico de intervenções do veículo.",
    },
  }[page];
  const isDashboard = page === "dashboard";

  return (
    <header className="screen-header">
      <div>
        <p className="eyebrow">{pageContent.eyebrow}</p>
        <h1 className="screen-title">{pageContent.title}</h1>
        {pageContent.description && (
          <p className="screen-description">{pageContent.description}</p>
        )}
      </div>

      {isDashboard && (
        <p className="odometer-summary">
          <span>Odômetro atual</span>
          <strong>{formatKm(currentKm)}</strong>
        </p>
      )}
    </header>
  );
}
