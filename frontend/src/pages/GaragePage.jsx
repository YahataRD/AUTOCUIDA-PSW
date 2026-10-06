import { useEffect, useState } from "react";
import { formatKm } from "../utils/maintenance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOdometerSchema } from "../data/formSchemas.js";
import VehicleRegistration from "../components/VehicleRegistration";
import VehicleEdit from "../components/VehicleEdit";
import MaintenanceManager from "../components/MaintenanceManager";
import useActionFeedback from "../hooks/useActionFeedback";

export default function GaragePage({
  vehicle,
  onUpdateOdometer,
  onBackToDashboard,
  onRegisterVehicle,
  justRegistered,
  isSaving,
  onUpdateVehicle,
  onDeactivateVehicle,
  maintenanceItems,
  onCreateMaintenanceItem,
  onUpdateMaintenanceItem,
  onRemoveMaintenanceItem,
}) {
  const [feedback, setFeedback] = useState("");
  const [editingVehicle, setEditingVehicle] = useState(false);
  const deactivation = useActionFeedback();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createOdometerSchema(vehicle?.currentKm ?? 0)),
    defaultValues: { currentKm: String(vehicle?.currentKm ?? "") },
  });
  const busy = isSaving || isSubmitting || deactivation.pending;
  useEffect(() => {
    reset({ currentKm: String(vehicle?.currentKm ?? "") });
  }, [vehicle?.currentKm, reset]);

  async function submit({ currentKm }) {
    if (isSaving) return;
    setFeedback("");
    try {
      await onUpdateOdometer(currentKm);
      setFeedback(
        `Odômetro atualizado para ${formatKm(currentKm)}. Os alertas foram recalculados.`,
      );
    } catch (error) {
      setError("root.server", { message: error.message });
    }
  }

  async function deactivate() {
    if (busy || !window.confirm("Inativar este veículo? O histórico será preservado.")) return;
    await deactivation.run(() => onDeactivateVehicle(vehicle.id));
  }

  return (
    <main className="grid gap-[1.35rem] px-5 md:px-10">
      {justRegistered && (
        <p className="form-feedback" role="status">
          Veículo cadastrado e selecionado.
        </p>
      )}
      <VehicleRegistration onRegister={onRegisterVehicle} isSaving={busy} />
      {vehicle && (
        <div className="grid items-start gap-4 md:grid-cols-2">
          <section
            className="surface p-5 md:p-[1.4rem]"
            aria-labelledby="vehicle-data-title"
          >
            <p className="identity-label" id="vehicle-data-title">
              Veículo cadastrado
            </p>
            <h2 className="identity-value">{vehicle.model}</h2>

            <div className="mt-4 grid grid-cols-2 gap-[0.8rem]">
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

          <section className="surface p-5 md:p-[1.4rem]">
            <h2 className="form-title">Atualizar odômetro</h2>
            <p className="form-help">
              A nova leitura será usada para recalcular automaticamente o
              desgaste dos itens de manutenção.
            </p>

            <form
              onSubmit={handleSubmit(submit)}
              aria-busy={busy}
              onChange={() => {
                clearErrors("root");
                setFeedback("");
              }}
              noValidate
            >
              <label className="form-label" htmlFor="odometer">
                Nova quilometragem
              </label>
              <input
                disabled={busy}
                className="form-control"
                id="odometer"
                {...register("currentKm")}
                type="number"
                min={vehicle.currentKm}
                step="1"
                inputMode="numeric"
                aria-invalid={Boolean(errors.currentKm)}
                aria-describedby={
                  errors.currentKm ? "odometer-error" : undefined
                }
              />
              {errors.currentKm && (
                <p className="field-error" id="odometer-error" role="alert">
                  {errors.currentKm.message}
                </p>
              )}
              {errors.root?.server && (
                <p className="field-error" role="alert">
                  {errors.root.server.message}
                </p>
              )}

              {feedback && (
                <p className="form-feedback" role="status">
                  {feedback}
                </p>
              )}

              <button className="primary-button" type="submit" disabled={busy}>
                {busy ? "Salvando…" : "Atualizar quilometragem"}
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
          {!editingVehicle ? (
            <section className="surface p-6" aria-busy={deactivation.pending}>
              {deactivation.error && <p className="field-error" role="alert">{deactivation.error}</p>}
              <button className="secondary-button" type="button" disabled={busy} onClick={() => setEditingVehicle(true)}>
                Editar veículo
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={deactivate}
                disabled={busy}
              >
                {deactivation.pending ? "Inativando…" : "Inativar veículo"}
              </button>
            </section>
          ) : (
            <VehicleEdit vehicle={vehicle} isSaving={busy} onSave={(input) => onUpdateVehicle(vehicle.id, input)} onCancel={() => setEditingVehicle(false)} />
          )}
          <MaintenanceManager
            vehicle={vehicle}
            items={maintenanceItems}
            isSaving={busy}
            onCreate={(input) => onCreateMaintenanceItem(vehicle.id, input)}
            onUpdate={(id, input) => onUpdateMaintenanceItem(id, input)}
            onRemove={onRemoveMaintenanceItem}
          />
        </div>
      )}
    </main>
  );
}
