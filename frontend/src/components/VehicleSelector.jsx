export default function VehicleSelector({
  vehicles,
  vehicleId,
  onSelect,
  disabled,
}) {
  return (
    <div className="vehicle-selector">
      <label className="form-label" htmlFor="active-vehicle">
        Veículo selecionado
      </label>
      <select
        disabled={disabled}
        className="form-control"
        id="active-vehicle"
        value={vehicleId}
        onChange={(event) => onSelect(event.target.value)}
      >
        {vehicles
          .filter((vehicle) => vehicle.active)
          .map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.model} — {vehicle.plate}
            </option>
          ))}
      </select>
    </div>
  );
}
