import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/costs";
import { getToday } from "../data/validation";
import StateMessage from "../components/StateMessage";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServiceSchema } from "../data/formSchemas.js";

export default function ServicePage({
  vehicle,
  maintenanceItems,
  selectedMaintenanceItemId,
  onRegisterService,
  onNavigate,
  isSaving,
}) {
  const [confirmation, setConfirmation] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm({
    resolver: zodResolver(createServiceSchema(maintenanceItems)),
    defaultValues: {
      maintenanceType: "preventive",
      maintenanceItemId:
        selectedMaintenanceItemId ?? maintenanceItems[0]?.id ?? "",
      serviceKm: String(vehicle.currentKm),
      serviceDate: getToday(),
      amount: "",
      shop: "",
    },
  });
  const busy = isSaving || isSubmitting;
  const maintenanceType = watch("maintenanceType");
  useEffect(() => {
    // Uma reconsulta não deve sobrescrever a km retroativa digitada no formulário.
    if (!dirtyFields.serviceKm)
      setValue("serviceKm", String(vehicle.currentKm));
  }, [vehicle.currentKm, dirtyFields.serviceKm, setValue]);

  function selectType(type) {
    setValue("maintenanceType", type, {
      shouldDirty: true,
      shouldValidate: true,
    });
    clearErrors("root");
    setConfirmation(null);
  }

  async function submit(values) {
    if (isSaving) return;
    setConfirmation(null);
    try {
      const record = await onRegisterService(values);
      reset({ ...getValues(), amount: "", shop: "" });
      setConfirmation(record);
    } catch (error) {
      setError("root.server", { message: error.message });
    }
  }

  if (maintenanceItems.length === 0) {
    return (
      <main className="grid gap-[1.35rem] px-5 md:px-10">
        <StateMessage
          title="Nenhum item disponível"
          onAction={() => onNavigate("dashboard")}
          actionLabel="Ver painel"
        >
          Este veículo precisa de um item no plano de manutenção antes de
          registrar serviços.
        </StateMessage>
      </main>
    );
  }

  return (
    <main className="grid gap-[1.35rem] px-5 md:px-10">
      {confirmation && (
        <section className="surface confirmation-card grid grid-cols-[auto_minmax(0,1fr)] gap-[0.85rem] p-[1.1rem] md:p-[1.4rem]" role="status">
          <span className="confirmation-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <h2>Serviço registrado</h2>
            <p>
              O serviço de <strong>{confirmation.itemName}</strong> foi incluído
              no histórico. Os alertas e os custos foram recalculados.
            </p>
            <p className="confirmation-amount">
              Lançamento: {formatCurrency(confirmation.amount)}
            </p>
          </div>
          <div className="col-span-full grid grid-cols-2 gap-[0.65rem]">
            <button
              className="primary-button compact-button"
              type="button"
              onClick={() => onNavigate("dashboard")}
            >
              Ver painel
            </button>
            <button
              className="secondary-button compact-button"
              type="button"
              onClick={() => onNavigate("costs")}
            >
              Ver custos
            </button>
          </div>
        </section>
      )}

      <section className="surface p-5 md:p-[1.4rem]">
        <div
          className="mb-5 grid grid-cols-2 gap-[0.3rem] rounded-[0.8rem] bg-surface-soft p-[0.3rem]"
          role="group"
          aria-label="Tipo de manutenção"
        >
          <button
            disabled={busy}
            className={`segment-button ${maintenanceType === "preventive" ? "active" : ""}`}
            type="button"
            onClick={() => selectType("preventive")}
            aria-pressed={maintenanceType === "preventive"}
          >
            Preventiva
          </button>
          <button
            disabled={busy}
            className={`segment-button ${maintenanceType === "corrective" ? "active" : ""}`}
            type="button"
            onClick={() => selectType("corrective")}
            aria-pressed={maintenanceType === "corrective"}
          >
            Corretiva
          </button>
        </div>

        <form
          className="grid min-w-0 gap-4 md:grid-cols-2 [&_.primary-button]:mt-[0.2rem]"
          onSubmit={handleSubmit(submit, () => setConfirmation(null))}
          aria-busy={busy}
          onChange={() => {
            clearErrors("root");
            setConfirmation(null);
          }}
          noValidate
        >
          {errors.root?.server && (
            <p className="field-error md:col-span-2" role="alert">
              {errors.root?.server.message}
            </p>
          )}
          <div className="min-w-0 md:col-span-2">
            <label className="form-label" htmlFor="maintenance-item">
              Item de manutenção
            </label>
            <select
              disabled={busy}
              className="form-control"
              id="maintenance-item"
              {...register("maintenanceItemId")}
              aria-invalid={Boolean(errors.maintenanceItemId)}
              aria-describedby={
                errors.maintenanceItemId ? "error-itemId" : undefined
              }
            >
              {maintenanceItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.maintenanceItemId && (
              <p className="field-error" id="error-itemId" role="alert">
                {errors.maintenanceItemId.message}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label className="form-label" htmlFor="service-km">
              Quilometragem no serviço
            </label>
            <input
              disabled={busy}
              className="form-control"
              id="service-km"
              {...register("serviceKm")}
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              aria-invalid={Boolean(errors.serviceKm)}
              aria-describedby={
                errors.serviceKm ? "error-serviceKm" : undefined
              }
            />
            {errors.serviceKm && (
              <p className="field-error" id="error-serviceKm" role="alert">
                {errors.serviceKm.message}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label className="form-label" htmlFor="service-date">
              Data do serviço
            </label>
            <input
              disabled={busy}
              className="form-control"
              id="service-date"
              {...register("serviceDate")}
              type="date"
              max={getToday()}
              aria-invalid={Boolean(errors.serviceDate)}
              aria-describedby={
                errors.serviceDate ? "error-serviceDate" : undefined
              }
            />
            {errors.serviceDate && (
              <p className="field-error" id="error-serviceDate" role="alert">
                {errors.serviceDate.message}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label className="form-label" htmlFor="service-amount">
              Valor gasto
            </label>
            <input
              disabled={busy}
              className="form-control"
              id="service-amount"
              {...register("amount")}
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 350,00"
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? "error-amount" : undefined}
            />
            {errors.amount && (
              <p className="field-error" id="error-amount" role="alert">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label className="form-label" htmlFor="service-shop">
              Oficina ou mecânico
            </label>
            <input
              disabled={busy}
              className="form-control"
              id="service-shop"
              {...register("shop")}
              type="text"
              placeholder="Ex.: Auto Tech Car SP"
              aria-invalid={Boolean(errors.shop)}
              aria-describedby={errors.shop ? "error-shop" : undefined}
            />
            {errors.shop && (
              <p className="field-error" id="error-shop" role="alert">
                {errors.shop.message}
              </p>
            )}
          </div>

          <button
            className="primary-button md:col-span-2"
            type="submit"
            disabled={busy}
          >
            {busy ? "Salvando…" : "Registrar serviço"}
          </button>
        </form>
      </section>
    </main>
  );
}
