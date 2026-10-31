import { Vehicle } from "./model.js";

export const vehicleRepository = {
  initialize: () => Vehicle.init(),
  list: (ownerId) => Vehicle.find({ ownerId }).sort({ _id: 1 }),
  findOwned: (ownerId, id) => Vehicle.findOne({ _id: id, ownerId }),
  exists: (id) => Vehicle.exists({ _id: id }),
  async create(ownerId, fields) {
    await Vehicle.init();
    return Vehicle.create({
      ownerId, plate: fields.plate, model: fields.model,
      year: fields.year, currentKm: fields.currentKm, active: true,
    });
  },
  update(ownerId, id, fields, expectedVersion) {
    // A leitura usada para validar pode ter ficado antiga. Filtrar versão E km
    // no banco impede sobrescrever uma atualização ou inativação concorrente.
    return Vehicle.findOneAndUpdate({
      _id: id, ownerId, active: true, __v: expectedVersion,
      currentKm: { $lte: fields.currentKm },
    }, {
      $set: { plate: fields.plate, model: fields.model, year: fields.year, currentKm: fields.currentKm },
      $inc: { __v: 1 },
    }, { returnDocument: "after", runValidators: true });
  },
  updateOdometer(ownerId, id, currentKm) {
    return Vehicle.findOneAndUpdate({
      _id: id, ownerId, active: true, currentKm: { $lt: currentKm },
    }, { $set: { currentKm }, $inc: { __v: 1 } }, {
      returnDocument: "after", runValidators: true,
    });
  },
  deactivate(ownerId, id) {
    return Vehicle.findOneAndUpdate({ _id: id, ownerId, active: true }, {
      $set: { active: false }, $inc: { __v: 1 },
    }, { returnDocument: "after", runValidators: true });
  },
};
