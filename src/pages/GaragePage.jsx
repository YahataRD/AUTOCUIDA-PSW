import { useEffect, useState } from "react";
import { formatKm } from "../utils/maintenance";

export default function GaragePage({ vehicle, onUpdateOdometer, onBackToDashboard }) {
  const [odometer, setOdometer] = useState(String(vehicle.currentKm));
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setOdometer(String(vehicle.currentKm));
  }, [vehicle.currentKm]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFeedback("");

    const newOdometer = Number(odometer);

    if (!Number.isInteger(newOdometer) || newOdometer < 0) {
      setError("Informe uma quilometragem válida, usando apenas números inteiros.");
      return;
    }

    if (newOdometer < vehicle.currentKm) {
      setError(
        `A nova leitura não pode ser menor que ${formatKm(vehicle.currentKm)}.`,
      );
      return;
    }

    if (newOdometer === vehicle.currentKm) {
      setError("A nova leitura deve ser diferente da quilometragem atual.");
      return;
    }

    onUpdateOdometer(newOdometer);
    setFeedback(
      `Odômetro atualizado para ${formatKm(newOdometer)}. Os alertas foram recalculados.`,
    );
  }

  return (
    <main className="page-content">
      <div className="garage-grid">
        <section className="surface vehicle-identity" aria-labelledby="vehicle-data-title">
          <p className="identity-label" id="vehicle-data-title">
            Veículo cadastrado
          </p>
          <h2 className="identity-value">{vehicle.model}</h2>

          <div className="identity-details">
            <div className="identity-detail">
              <span>Placa</span>
              <strong>{vehicle.plate}</strong>
            </div>
            <div className="identity-detail">
              <span>Ano</span>
              <strong>{vehicle.year}</strong>
            </div>
            <div className="identity-detail">
              <span>Odômetro atual</span>
              <strong>{formatKm(vehicle.currentKm)}</strong>
            </div>
            <div className="identity-detail">
              <span>Situação</span>
              <strong>Ativo</strong>
            </div>
          </div>
        </section>

        <section className="surface odometer-form-card">
          <h2 className="form-title">Atualizar odômetro</h2>
          <p className="form-help">
            A nova leitura será usada para recalcular automaticamente o desgaste
            dos itens de manutenção.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label className="form-label" htmlFor="odometer">
              Nova quilometragem
            </label>
            <input
              className="form-control"
              id="odometer"
              name="odometer"
              type="number"
              min={vehicle.currentKm}
              step="1"
              inputMode="numeric"
              value={odometer}
              onChange={(event) => {
                setOdometer(event.target.value);
                setError("");
                setFeedback("");
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "odometer-error" : undefined}
            />

            {error && (
              <p className="field-error" id="odometer-error" role="alert">
                {error}
              </p>
            )}

            {feedback && (
              <p className="form-feedback" role="status">
                {feedback}
              </p>
            )}

            <button className="primary-button" type="submit">
              Atualizar quilometragem
            </button>
            {feedback && (
              <button
                className="secondary-button"
                type="button"
                onClick={onBackToDashboard}
              >
                Ver alertas atualizados
              </button>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
