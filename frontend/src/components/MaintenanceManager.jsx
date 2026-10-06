import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMaintenanceItemSchema } from "../data/formSchemas.js";
import { getToday } from "../data/validation.js";
import useActionFeedback from "../hooks/useActionFeedback";

const empty = { name: "", intervalKm: "", intervalMonths: "", initialDate: "", initialKm: "" };
const fields = [
  { name: "name", label: "Nome", type: "text" },
  { name: "intervalKm", label: "Intervalo em km", type: "number" },
  { name: "intervalMonths", label: "Intervalo em meses", type: "number" },
  { name: "initialDate", label: "Referência de data", type: "date" },
  { name: "initialKm", label: "Referência em km", type: "number" },
];

export default function MaintenanceManager({ vehicle, items, isSaving, onCreate, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(null);
  const [feedback, setFeedback] = useState("");
  const removal = useActionFeedback();
  const schema = createMaintenanceItemSchema().refine(
    (value) => value.initialKm <= vehicle.currentKm,
    { path: ["initialKm"], message: "A referência não pode superar o odômetro." },
  );
  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema), defaultValues: empty });
  const busy = isSaving || isSubmitting || removal.pending;

  function edit(item) {
    setFeedback("");
    setEditing(item.id);
    reset({
      name: item.name, intervalKm: String(item.intervalKm), intervalMonths: String(item.intervalMonths),
      initialDate: item.initialReference.date, initialKm: String(item.initialReference.km),
    });
  }
  function cancel() { setEditing(null); reset(empty); }

  async function submit(values) {
    if (busy) return;
    setFeedback("");
    clearErrors("root");
    try {
      if (editing) await onUpdate(editing, values);
      else await onCreate(values);
      setFeedback(editing ? "Item atualizado." : "Item adicionado ao plano de manutenção.");
      cancel();
    } catch (error) {
      setError("root.server", { message: error.message });
    }
  }

  async function remove(item) {
    if (busy || !window.confirm(`Remover ${item.name} do plano? O histórico será preservado.`)) return;
    setFeedback("");
    const removed = await removal.run(() => onRemove(item.id), "Item removido do plano. O histórico foi preservado.");
    if (removed && editing === item.id) cancel();
  }

  return (
    <section className="surface p-5 md:p-[1.4rem]" aria-busy={busy}>
      <h2 className="form-title mb-4">{editing ? "Editar item de manutenção" : "Adicionar item de manutenção"}</h2>
      <p className="form-help" id="maintenance-interval-help">
        Preencha o intervalo em km, em meses ou ambos. Deixe vazio ou use zero para desativar um dos critérios.
      </p>
      <form className="grid min-w-0 gap-4 lg:grid-cols-2 [&_.primary-button]:mt-[0.2rem]"
        onSubmit={handleSubmit(submit)} onChange={() => { clearErrors("root"); setFeedback(""); }} noValidate>
        {errors.root?.server && <p className="field-error lg:col-span-2" role="alert">{errors.root.server.message}</p>}
        {fields.map(({ name, label, type }) => {
          const id = `maintenance-${name}`;
          const interval = name === "intervalKm" || name === "intervalMonths";
          const description = [
            interval && "maintenance-interval-help",
            errors[name] && `${id}-error`,
          ].filter(Boolean).join(" ") || undefined;
          return (
            <div className="min-w-0" key={name}>
              <label className="form-label" htmlFor={id}>{label}</label>
              <input id={id} className="form-control" type={type} disabled={busy}
                min={type === "number" ? 0 : undefined}
                step={type === "number" ? 1 : undefined}
                max={type === "date" ? getToday() : name === "initialKm" ? vehicle.currentKm : undefined}
                aria-invalid={Boolean(errors[name])} aria-describedby={description}
                {...register(name)} />
              {errors[name] && <p id={`${id}-error`} className="field-error" role="alert">{errors[name].message}</p>}
            </div>
          );
        })}
        <button className="primary-button lg:col-span-2" disabled={busy}>
          {isSubmitting ? "Salvando…" : editing ? "Salvar item" : "Adicionar item"}
        </button>
        {editing && <button className="secondary-button lg:col-span-2" type="button" onClick={cancel} disabled={busy}>Cancelar</button>}
      </form>
      {feedback && <p className="form-feedback" role="status">{feedback}</p>}
      {removal.error && <p className="field-error" role="alert">{removal.error}</p>}
      {removal.feedback && <p className="form-feedback" role="status">{removal.feedback}</p>}
      {items.map((item) => (
        <div className="breakdown-row" key={item.id}>
          <span>{item.name}</span>
          <span>
            <button className="secondary-button compact-button" type="button" onClick={() => edit(item)} disabled={busy}>Editar</button>
            <button className="secondary-button compact-button" type="button" onClick={() => remove(item)} disabled={busy}>Remover</button>
          </span>
        </div>
      ))}
      {items.length === 0 && <p>Nenhum item ativo para este veículo.</p>}
      <small>Veículo: {vehicle.model}</small>
    </section>
  );
}
