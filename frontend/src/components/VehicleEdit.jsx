import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVehicleSchema } from "../data/formSchemas.js";

export default function VehicleEdit({ vehicle, isSaving, onSave, onCancel }) {
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } =
    useForm({
      resolver: zodResolver(createVehicleSchema()),
      defaultValues: vehicle,
    });
  const busy = isSaving || isSubmitting;

  useEffect(() => reset(vehicle), [vehicle, reset]);

  async function submit(values) {
    try {
      await onSave(values);
      onCancel();
    } catch (error) {
      if (error.fields) {
        for (const [name, message] of Object.entries(error.fields))
          setError(name, { type: "server", message });
      } else setError("root.server", { message: error.message });
    }
  }

  return (
    <form className="grid min-w-0 gap-4 lg:grid-cols-2 [&_.primary-button]:mt-[0.2rem] surface p-5 md:p-[1.4rem]" onSubmit={handleSubmit(submit)} noValidate>
      <h2 className="form-title lg:col-span-2">Editar veículo</h2>
      {errors.root?.server && <p className="field-error lg:col-span-2" role="alert">{errors.root.server.message}</p>}
      {[
        ["plate", "Placa", "text"],
        ["model", "Modelo", "text"],
        ["year", "Ano do modelo", "number"],
        ["currentKm", "Odômetro atual", "number"],
      ].map(([name, label, type]) => (
        <div className="min-w-0" key={name}>
          <label className="form-label" htmlFor={`edit-${name}`}>{label}</label>
          <input id={`edit-${name}`} className="form-control" type={type}
            disabled={busy} {...register(name)} />
          {errors[name] && <p className="field-error" role="alert">{errors[name].message}</p>}
        </div>
      ))}
      <button className="primary-button" disabled={busy}>Salvar alterações</button>
      <button className="secondary-button" type="button" onClick={onCancel} disabled={busy}>Cancelar</button>
    </form>
  );
}
