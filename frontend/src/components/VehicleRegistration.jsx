import { useRef, useState } from "react";

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
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const opener = useRef(null);

  function cancel() {
    setOpen(false);
    setValues(emptyForm);
    setErrors({});
    opener.current?.focus();
  }

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (isSaving) return;
    setErrors({});
    try {
      await onRegister(values);
      cancel();
    } catch (error) {
      setErrors(error.fields ?? { form: error.message });
      const first = fields.find((field) => error.fields?.[field.name]);
      if (first) form.elements.namedItem(first.name)?.focus();
    }
  }

  return (
    <section className="surface state-message vehicle-registration">
      <button
        disabled={isSaving}
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
          className="service-form"
          onSubmit={submit}
          noValidate
        >
          <h2 className="form-title form-field-wide">Novo veículo</h2>
          {errors.form && (
            <p className="field-error form-field-wide" role="alert">
              {errors.form}
            </p>
          )}
          {fields.map((field, index) => (
            <div className="form-field" key={field.name}>
              <label className="form-label" htmlFor={`vehicle-${field.name}`}>
                {field.label}
              </label>
              <input
                disabled={isSaving}
                className="form-control"
                id={`vehicle-${field.name}`}
                name={field.name}
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
                value={values[field.name]}
                onChange={(event) => {
                  setValues({ ...values, [field.name]: event.target.value });
                  setErrors({ ...errors, [field.name]: "", form: "" });
                }}
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
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <button className="primary-button" type="submit" disabled={isSaving}>
            {isSaving ? "Salvando…" : "Salvar veículo"}
          </button>
          <button
            className="secondary-button"
            type="button"
            onClick={cancel}
            disabled={isSaving}
          >
            Cancelar cadastro
          </button>
        </form>
      )}
    </section>
  );
}
