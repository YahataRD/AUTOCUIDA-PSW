import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "../utils/costs";
import { formatKm } from "../utils/maintenance";

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseCurrency(value) {
  const normalizedValue = value.includes(",")
    ? value.replace(/\./g, "").replace(",", ".")
    : value;
  return Number(normalizedValue);
}

export default function ServicePage({
  vehicle,
  maintenanceItems,
  selectedMaintenanceItemId,
  onRegisterService,
  onNavigate,
}) {
  const firstItemId = maintenanceItems[0]?.id ?? "";
  const [maintenanceType, setMaintenanceType] = useState("preventive");
  const [itemId, setItemId] = useState(
    String(selectedMaintenanceItemId ?? firstItemId),
  );
  const [serviceKm, setServiceKm] = useState(String(vehicle.currentKm));
  const [serviceDate, setServiceDate] = useState(getToday());
  const [amount, setAmount] = useState("");
  const [shop, setShop] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const selectedItem = useMemo(
    () => maintenanceItems.find((item) => item.id === Number(itemId)),
    [itemId, maintenanceItems],
  );

  useEffect(() => {
    if (selectedMaintenanceItemId) {
      setItemId(String(selectedMaintenanceItemId));
    }
  }, [selectedMaintenanceItemId]);

  useEffect(() => {
    setServiceKm(String(vehicle.currentKm));
  }, [vehicle.currentKm]);

  function clearFieldError(field) {
    setErrors((currentErrors) => ({ ...currentErrors, [field]: "" }));
    setConfirmation(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    const numericKm = Number(serviceKm);
    const numericAmount = parseCurrency(amount);

    if (!selectedItem) {
      newErrors.itemId = "Selecione um item de manutenção.";
    }

    if (!Number.isSafeInteger(numericKm) || numericKm < 0) {
      newErrors.serviceKm = "Informe uma quilometragem válida.";
    } else if (selectedItem && numericKm < selectedItem.lastServiceKm) {
      newErrors.serviceKm = `A leitura não pode ser menor que ${formatKm(selectedItem.lastServiceKm)}.`;
    }

    if (!serviceDate) {
      newErrors.serviceDate = "Informe a data do serviço.";
    } else if (serviceDate > getToday()) {
      newErrors.serviceDate = "A data do serviço não pode estar no futuro.";
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      newErrors.amount = "Informe um valor maior que zero.";
    }

    if (!shop.trim()) {
      newErrors.shop = "Informe a oficina ou o mecânico responsável.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setConfirmation(null);
      return;
    }

    const record = onRegisterService({
      maintenanceItemId: selectedItem.id,
      maintenanceType,
      serviceKm: numericKm,
      serviceDate,
      amount: numericAmount,
      shop: shop.trim(),
    });

    setConfirmation({
      ...record,
      nextServiceKm: numericKm + selectedItem.intervalKm,
    });
    setAmount("");
    setShop("");
  }

  return (
    <main className="page-content">
      {confirmation && (
        <section className="surface confirmation-card" role="status">
          <span className="confirmation-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <h2>Serviço registrado</h2>
            <p>
              O alerta de <strong>{confirmation.itemName}</strong> foi encerrado.
              Próxima troca prevista em {formatKm(confirmation.nextServiceKm)}.
            </p>
            <p className="confirmation-amount">
              Lançamento: {formatCurrency(confirmation.amount)}
            </p>
          </div>
          <div className="confirmation-actions">
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

      <section className="surface service-form-card">
        <div
          className="segmented-control"
          role="group"
          aria-label="Tipo de manutenção"
        >
          <button
            className={`segment-button ${maintenanceType === "preventive" ? "active" : ""}`}
            type="button"
            onClick={() => setMaintenanceType("preventive")}
            aria-pressed={maintenanceType === "preventive"}
          >
            Preventiva
          </button>
          <button
            className={`segment-button ${maintenanceType === "corrective" ? "active" : ""}`}
            type="button"
            onClick={() => setMaintenanceType("corrective")}
            aria-pressed={maintenanceType === "corrective"}
          >
            Corretiva
          </button>
        </div>

        <form className="service-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field form-field-wide">
            <label className="form-label" htmlFor="maintenance-item">
              Item de manutenção
            </label>
            <select
              className="form-control"
              id="maintenance-item"
              name="maintenanceItem"
              value={itemId}
              onChange={(event) => {
                setItemId(event.target.value);
                clearFieldError("itemId");
              }}
              aria-invalid={Boolean(errors.itemId)}
            >
              {maintenanceItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.itemId && <p className="field-error">{errors.itemId}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="service-km">
              Quilometragem no serviço
            </label>
            <input
              className="form-control"
              id="service-km"
              name="serviceKm"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={serviceKm}
              onChange={(event) => {
                setServiceKm(event.target.value);
                clearFieldError("serviceKm");
              }}
              aria-invalid={Boolean(errors.serviceKm)}
            />
            {errors.serviceKm && (
              <p className="field-error">{errors.serviceKm}</p>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="service-date">
              Data do serviço
            </label>
            <input
              className="form-control"
              id="service-date"
              name="serviceDate"
              type="date"
              max={getToday()}
              value={serviceDate}
              onChange={(event) => {
                setServiceDate(event.target.value);
                clearFieldError("serviceDate");
              }}
              aria-invalid={Boolean(errors.serviceDate)}
            />
            {errors.serviceDate && (
              <p className="field-error">{errors.serviceDate}</p>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="service-amount">
              Valor gasto
            </label>
            <input
              className="form-control"
              id="service-amount"
              name="amount"
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 350,00"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                clearFieldError("amount");
              }}
              aria-invalid={Boolean(errors.amount)}
            />
            {errors.amount && <p className="field-error">{errors.amount}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="service-shop">
              Oficina ou mecânico
            </label>
            <input
              className="form-control"
              id="service-shop"
              name="shop"
              type="text"
              placeholder="Ex.: Auto Tech Car SP"
              value={shop}
              onChange={(event) => {
                setShop(event.target.value);
                clearFieldError("shop");
              }}
              aria-invalid={Boolean(errors.shop)}
            />
            {errors.shop && <p className="field-error">{errors.shop}</p>}
          </div>

          <button className="primary-button form-field-wide" type="submit">
            Registrar serviço
          </button>
        </form>
      </section>
    </main>
  );
}
