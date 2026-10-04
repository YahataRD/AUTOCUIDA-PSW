export default function StateMessage({
  title,
  children,
  onAction,
  actionLabel,
  error = false,
}) {
  return (
    <section
      className="surface state-message"
      role={error ? "alert" : "status"}
    >
      <h2 className="form-title">{title}</h2>
      <p className="form-help">{children}</p>
      {onAction && (
        <button className="secondary-button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  );
}
