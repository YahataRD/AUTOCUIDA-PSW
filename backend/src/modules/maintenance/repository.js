import { Vehicle } from "../vehicles/model.js";

export const maintenanceRepository = {
  list(ownerId, resource, vehicleId) {
    const filter = vehicleId ? { ownerId, _id: vehicleId } : { ownerId };
    return Vehicle.find(filter).select(`_id ${resource}`).sort({ _id: 1 }).lean();
  },
  findOwned(ownerId, filter) {
    return Vehicle.findOne({ ownerId, ...filter })
      .select("+maintenanceItems +serviceRecords").lean();
  },
  async save(ownerId, vehicle, changes) {
    // O histórico e o odômetro são validados sobre a mesma versão. O incremento
    // também impede que uma edição de veículo concorrente sobrescreva a leitura.
    const result = await Vehicle.updateOne({
      _id: vehicle._id, ownerId, active: true, __v: vehicle.__v,
    }, {
      $set: changes,
      $inc: { __v: 1 },
    }, { runValidators: true });
    return result.matchedCount === 1;
  },
};
