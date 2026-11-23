import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../data/authSchemas.js";

export default function AuthPage({ onLogin, onRegister, notice }) {
  const [showRegister, setShowRegister] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  async function registerAccount(values) {
    const account = await onRegister(values);
    setRegisteredEmail(account.email);
    setShowRegister(false);
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-xl content-center gap-4 p-5 md:p-10">
      <section className="surface grid gap-4 p-6">
        <div>
          <p className="eyebrow">AutoCUIDA</p>
          <h1 className="screen-title">{showRegister ? "Criar conta" : "Entrar"}</h1>
        </div>
        {!showRegister && (registeredEmail || notice) && (
          <p className="form-feedback" role="status">
            {registeredEmail ? "Conta criada. Entre com sua senha." : notice}
          </p>
        )}
        <AuthForm
          key={showRegister ? "register" : "login"}
          isRegistration={showRegister}
          defaultEmail={registeredEmail}
          onSubmit={showRegister ? registerAccount : onLogin}
          onSwitch={() => setShowRegister(!showRegister)}
        />
      </section>
    </main>
  );
}

function AuthForm({ isRegistration, defaultEmail, onSubmit, onSwitch }) {
  const fields = [
    ["email", "E-mail", "email", "username"],
    ["password", "Senha", "password", isRegistration ? "new-password" : "current-password"],
  ];
  if (isRegistration) {
    fields.unshift(["name", "Nome", "text", "name"]);
    fields.push(["confirmPassword", "Confirmar senha", "password", "new-password"]);
  }

  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } =
    useForm({
      resolver: zodResolver(isRegistration ? registerSchema : loginSchema),
      defaultValues: { email: defaultEmail, password: "" },
    });

  async function submit(values) {
    try {
      await onSubmit(values);
    } catch (error) {
      const invalidFields = fields.filter(([name]) => error.fields?.[name]);
      for (const [name] of invalidFields) {
        setError(name, { type: "server", message: error.fields[name] });
      }
      if (!invalidFields.length) {
        setError("root.server", { message: error.message });
      }
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(submit)}
      onChange={() => clearErrors("root")} aria-busy={isSubmitting} noValidate>
      {fields.map(([name, label, type, autoComplete]) => (
        <div key={name}>
          <label className="form-label" htmlFor={`auth-${name}`}>{label}</label>
          <input
            id={`auth-${name}`}
            className="form-control"
            type={type}
            autoComplete={autoComplete}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors[name])}
            aria-describedby={errors[name] ? `auth-error-${name}` : undefined}
            {...register(name)}
          />
          {errors[name] && (
            <p className="field-error" id={`auth-error-${name}`} role="alert">
              {errors[name].message}
            </p>
          )}
        </div>
      ))}
      {errors.root?.server && (
        <p className="field-error" role="alert">{errors.root.server.message}</p>
      )}
      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Aguarde…" : isRegistration ? "Cadastrar" : "Entrar"}
      </button>
      <button className="secondary-button" type="button" disabled={isSubmitting} onClick={onSwitch}>
        {isRegistration ? "Voltar para o login" : "Criar conta"}
      </button>
    </form>
  );
}
