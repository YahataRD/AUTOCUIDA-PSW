import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVehicleSchema } from "../data/formSchemas.js";

const emptyForm = { plate: "", model: "", year: "", currentKm: "" };
const fields = [
  {
    name: "plate",
    label: "Placa",
    placeholder: "ABC-1234 ou ABC1D23",
    type: "text",
  },
  {
    name: "model",
    label: "Modelo",
    placeholder: "Ex.: Onix 1.0",
    type: "text",
  },
  { name: "year", label: "Ano do modelo", type: "number", min: 1886 },
  { name: "currentKm", label: "Quilometragem inicial", type: "number", min: 0 },
];

export default function VehicleRegistration({ onRegister, isSaving }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createVehicleSchema()),
    defaultValues: emptyForm,
  });
  const busy = isSaving || isSubmitting;
  useEffect(() => {
    if (!busy) {
      const first = fields.find(
        (field) => errors[field.name]?.type === "server",
      );
      if (first) setFocus(first.name);
    }
  }, [busy, errors, setFocus]);
  const opener = useRef(null);

  function cancel() {
    setOpen(false);
    reset(emptyForm);
    opener.current?.focus();
  }

  async function submit(values) {
    if (isSaving) return;
    try {
      await onRegister(values);
      cancel();
    } catch (error) {
      if (error.fields) {
        for (const [name, message] of Object.entries(error.fields)) {
          setError(name, { type: "server", message });
        }
      } else {
        setError("root.server", { message: error.message });
      }
    }
  }

  return (
    <section className="surface p-6 mb-4 [&_form]:mt-4">
      <button
        disabled={busy}
        ref={opener}
        className="secondary-button"
        type="button"
        aria-expanded={open}
        aria-controls="vehicle-registration-form"
        onClick={() => setOpen(true)}
      >
        Cadastrar veículo
      </button>
      {open && (
        <form
          id="vehicle-registration-form"
          className="grid min-w-0 gap-4 md:grid-cols-2 [&_.primary-button]:mt-[0.2rem]"
          onSubmit={handleSubmit(submit)}
          onChange={() => clearErrors("root")}
          aria-busy={busy}
          noValidate
        >
          <h2 className="form-title md:col-span-2">Novo veículo</h2>
          {errors.root?.server && (
            <p className="field-error md:col-span-2" role="alert">
              {errors.root?.server.message}
            </p>
          )}
          {fields.map((field, index) => (
            <div className="min-w-0" key={field.name}>
              <label className="form-label" htmlFor={`vehicle-${field.name}`}>
                {field.label}
              </label>
              <input
                disabled={busy}
                className="form-control"
                id={`vehicle-${field.name}`}
                {...register(field.name)}
                type={field.type}
                autoFocus={index === 0}
                required
                min={field.min}
                step={field.type === "number" ? "1" : undefined}
                max={
                  field.name === "year"
                    ? new Date().getFullYear() + 1
                    : undefined
                }
                inputMode={field.type === "number" ? "numeric" : undefined}
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name] ? `vehicle-error-${field.name}` : undefined
                }
              />
              {errors[field.name] && (
                <p
                  className="field-error"
                  id={`vehicle-error-${field.name}`}
                  role="alert"
                >
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
          <button className="primary-button" type="submit" disabled={busy}>
            {busy ? "Salvando…" : "Salvar veículo"}
          </button>
          <button
            className="secondary-button"
            type="button"
            onClick={cancel}
            disabled={busy}
          >
            Cancelar cadastro
          </button>
        </form>
      )}
    </section>
  );
}
