import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServiceSchema } from "../data/formSchemas.js";
import { getToday } from "../data/validation.js";

const fields = [
  { name: "serviceKm", label: "Quilometragem no serviço", type: "number" },
  { name: "serviceDate", label: "Data do serviço", type: "date" },
  { name: "amount", label: "Valor gasto", type: "text", inputMode: "decimal" },
  { name: "shop", label: "Oficina ou mecânico", type: "text" },
];

export default function ServiceEditForm({ record, items, isSaving, onSave, onCancel }) {
  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } =
    useForm({
      resolver: zodResolver(createServiceSchema(items)),
      defaultValues: {
        maintenanceType: record.maintenanceType,
        maintenanceItemId: record.maintenanceItemId,
        serviceKm: String(record.serviceKm),
        serviceDate: record.serviceDate,
        amount: String(record.amount).replace(".", ","),
        shop: record.shop,
      },
    });
  const busy = isSaving || isSubmitting;
  const idFor = (name) => `service-edit-${record.id}-${name}`;

  async function submit(values) {
    if (busy) return;
    clearErrors("root");
    try { await onSave(values); onCancel(); }
    catch (error) { setError("root.server", { message: error.message }); }
  }

  return (
    <form className="grid w-full min-w-0 gap-4 md:grid-cols-2 [&_.primary-button]:mt-[0.2rem]"
      onSubmit={handleSubmit(submit)} onChange={() => clearErrors("root")} aria-busy={busy} noValidate>
      <h3 className="form-title md:col-span-2">Editar serviço</h3>
      {errors.root?.server && <p className="field-error md:col-span-2" role="alert">{errors.root.server.message}</p>}
      {[
        { name: "maintenanceItemId", label: "Item de manutenção", options: items.map((item) => [item.id, item.name]) },
        { name: "maintenanceType", label: "Tipo de manutenção", options: [["preventive", "Preventiva"], ["corrective", "Corretiva"]] },
      ].map(({ name, label, options }) => (
        <div className="min-w-0" key={name}>
          <label className="form-label" htmlFor={idFor(name)}>{label}</label>
          <select id={idFor(name)} className="form-control" disabled={busy}
            aria-invalid={Boolean(errors[name])}
            aria-describedby={errors[name] ? `${idFor(name)}-error` : undefined}
            {...register(name)}>
            {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
          </select>
          {errors[name] && <p id={`${idFor(name)}-error`} className="field-error" role="alert">{errors[name].message}</p>}
        </div>
      ))}
      {fields.map(({ name, label, type, inputMode }) => (
        <div className="min-w-0" key={name}>
          <label className="form-label" htmlFor={idFor(name)}>{label}</label>
          <input id={idFor(name)} className="form-control" type={type} inputMode={inputMode}
            min={type === "number" ? 0 : undefined} step={type === "number" ? 1 : undefined}
            max={type === "date" ? getToday() : undefined} disabled={busy}
            aria-invalid={Boolean(errors[name])}
            aria-describedby={errors[name] ? `${idFor(name)}-error` : undefined}
            {...register(name)} />
          {errors[name] && <p id={`${idFor(name)}-error`} className="field-error" role="alert">{errors[name].message}</p>}
        </div>
      ))}
      <button className="primary-button compact-button" disabled={busy}>{busy ? "Salvando…" : "Salvar"}</button>
      <button className="secondary-button compact-button" type="button" onClick={onCancel} disabled={busy}>Cancelar</button>
    </form>
  );
}
