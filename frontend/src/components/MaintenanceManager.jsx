import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMaintenanceItemSchema } from "../data/formSchemas.js";

const empty = { name: "", intervalKm: "", intervalMonths: "", initialDate: "", initialKm: "" };

export default function MaintenanceManager({ vehicle, items, isSaving, onCreate, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(createMaintenanceItemSchema()), defaultValues: empty });
  const busy = isSaving || isSubmitting;

  function edit(item) {
    setEditing(item.id);
    reset({ name: item.name, intervalKm: String(item.intervalKm), intervalMonths: String(item.intervalMonths),
      initialDate: item.initialReference.date, initialKm: String(item.initialReference.km) });
  }
  function cancel() { setEditing(null); reset(empty); }
  async function submit(values) {
    try {
      if (editing) await onUpdate(editing, values);
      else await onCreate(values);
      cancel();
    } catch (error) { setError("root.server", { message: error.message }); }
  }

  return (
    <section className="surface">
      <h2 className="form-title">{editing ? "Editar item de manutenção" : "Adicionar item de manutenção"}</h2>
      <form className="service-form" onSubmit={handleSubmit(submit)} noValidate>
        {errors.root?.server && <p className="field-error" role="alert">{errors.root.server.message}</p>}
        <div className="form-field"><label className="form-label" htmlFor="maintenance-name">Nome</label>
          <input id="maintenance-name" className="form-control" disabled={busy} {...register("name")} />
          {errors.name && <p className="field-error" role="alert">{errors.name.message}</p>}</div>
        <div className="form-field"><label className="form-label" htmlFor="maintenance-km">Intervalo em km</label>
          <input id="maintenance-km" className="form-control" type="number" min="0" disabled={busy} {...register("intervalKm")} /></div>
        <div className="form-field"><label className="form-label" htmlFor="maintenance-months">Intervalo em meses</label>
          <input id="maintenance-months" className="form-control" type="number" min="0" disabled={busy} {...register("intervalMonths")} /></div>
        <div className="form-field"><label className="form-label" htmlFor="maintenance-date">Referência de data</label>
          <input id="maintenance-date" className="form-control" type="date" disabled={busy} {...register("initialDate")} /></div>
        <div className="form-field"><label className="form-label" htmlFor="maintenance-reference-km">Referência em km</label>
          <input id="maintenance-reference-km" className="form-control" type="number" min="0" disabled={busy} {...register("initialKm")} /></div>
        <button className="primary-button" disabled={busy}>{editing ? "Salvar item" : "Adicionar item"}</button>
        {editing && <button className="secondary-button" type="button" onClick={cancel} disabled={busy}>Cancelar</button>}
      </form>
      {items.map((item) => (
        <div className="breakdown-row" key={item.id}>
          <span>{item.name}</span>
          <span>
            <button className="secondary-button compact-button" type="button" onClick={() => edit(item)} disabled={busy}>Editar</button>
            <button className="secondary-button compact-button" type="button" onClick={() => window.confirm(`Remover ${item.name}?`) && onRemove(item.id)} disabled={busy}>Remover</button>
          </span>
        </div>
      ))}
      {items.length === 0 && <p>Nenhum item ativo para este veículo.</p>}
      <small>Veículo: {vehicle.model}</small>
    </section>
  );
}
