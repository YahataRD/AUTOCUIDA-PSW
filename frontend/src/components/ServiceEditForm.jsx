import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServiceSchema } from "../data/formSchemas.js";

export default function ServiceEditForm({ record, items, isSaving, onSave, onCancel }) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } =
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
  async function submit(values) {
    try { await onSave(values); onCancel(); }
    catch (error) { setError("root.server", { message: error.message }); }
  }
  return (
    <form className="grid w-full min-w-0 gap-4 md:grid-cols-2 [&_.primary-button]:mt-[0.2rem]" onSubmit={handleSubmit(submit)} noValidate>
      {errors.root?.server && <p className="field-error" role="alert">{errors.root.server.message}</p>}
      <select className="form-control" disabled={busy} {...register("maintenanceItemId")}>
        {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <select className="form-control" disabled={busy} {...register("maintenanceType")}>
        <option value="preventive">Preventiva</option><option value="corrective">Corretiva</option>
      </select>
      <input className="form-control" type="number" disabled={busy} {...register("serviceKm")} />
      <input className="form-control" type="date" disabled={busy} {...register("serviceDate")} />
      <input className="form-control" inputMode="decimal" disabled={busy} {...register("amount")} />
      <input className="form-control" disabled={busy} {...register("shop")} />
      {Object.values(errors).filter((error) => error?.message).map((error, index) => (
        <p className="field-error" role="alert" key={index}>{error.message}</p>
      ))}
      <button className="primary-button compact-button" disabled={busy}>Salvar</button>
      <button className="secondary-button compact-button" type="button" onClick={onCancel} disabled={busy}>Cancelar</button>
    </form>
  );
}
