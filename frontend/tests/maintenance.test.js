import test from "node:test";
import assert from "node:assert/strict";
import { calculateMaintenance, formatWear } from "../src/utils/maintenance.js";

const item = {
  lastServiceKm: 0, lastServiceDate: "2026-02-01",
  intervalKm: 0, intervalMonths: 1,
};
const day = (year, month, date, hour = 12) => new Date(year, month - 1, date, hour);

test("alerta temporal vence exatamente no dia exibido, inclusive em fevereiro", () => {
  const before = calculateMaintenance(item, 0, day(2026, 2, 28));
  const due = calculateMaintenance(item, 0, day(2026, 3, 1));
  const after = calculateMaintenance(item, 0, day(2026, 3, 2));
  assert.equal(before.status, "soon");
  assert.ok(before.timeWear < 100);
  assert.equal(due.nextServiceDate, "2026-03-01");
  assert.equal(due.timeWear, 100);
  assert.equal(due.status, "overdue");
  assert.ok(after.timeWear > 100);
  assert.equal(after.status, "overdue");
});

test("soma de meses respeita fim do mês, ano bissexto e mudança de ano", () => {
  for (const [date, months, expected] of [
    ["2026-01-31", 1, "2026-02-28"],
    ["2024-01-31", 1, "2024-02-29"],
    ["2024-02-29", 12, "2025-02-28"],
    ["2026-03-31", 1, "2026-04-30"],
    ["2026-12-31", 2, "2027-02-28"],
    ["2026-01-31", 2, "2026-03-31"],
  ]) {
    const [year, month, dateOfMonth] = expected.split("-").map(Number);
    const result = calculateMaintenance(
      { ...item, lastServiceDate: date, intervalMonths: months },
      0, day(year, month, dateOfMonth),
    );
    assert.equal(result.nextServiceDate, expected);
    assert.equal(result.timeWear, 100);
    assert.equal(result.status, "overdue");
  }
});

test("limiar temporal de 80% usa a duração real do ciclo", () => {
  const april = { ...item, lastServiceDate: "2026-04-01" };
  assert.equal(calculateMaintenance(april, 0, day(2026, 4, 24)).status, "current");
  const threshold = calculateMaintenance(april, 0, day(2026, 4, 25));
  assert.equal(threshold.timeWear, 80);
  assert.equal(threshold.status, "soon");
});

test("horário não muda a classe dentro do mesmo dia local", () => {
  const start = calculateMaintenance(item, 0, day(2026, 3, 1, 0));
  const end = calculateMaintenance(item, 0, day(2026, 3, 1, 23));
  assert.deepEqual(start, end);
  assert.equal(start.timeWear, 100);
  assert.equal(calculateMaintenance(item, 0, day(2026, 1, 31)).timeWear, 0);
});

test("maior desgaste e intervalos desativados continuam respeitados", () => {
  const both = { ...item, intervalKm: 10000 };
  assert.equal(calculateMaintenance(both, 10000, day(2026, 2, 1)).status, "overdue");
  assert.equal(calculateMaintenance(both, 0, day(2026, 3, 1)).status, "overdue");
  const kmOnly = calculateMaintenance({ ...both, intervalMonths: 0 }, 7990, day(2027, 1, 1));
  assert.equal(kmOnly.nextServiceDate, null);
  assert.equal(kmOnly.timeWear, 0);
  assert.equal(kmOnly.status, "current");
});

test("percentual legível não antecipa limites nem altera a classificação", () => {
  const kmOnly = { ...item, intervalMonths: 0, intervalKm: 10000 };
  for (const [km, display, status] of [
    [7999, "79,9%", "current"], [8000, "80%", "soon"],
    [9999, "99,9%", "soon"], [10000, "100%", "overdue"],
  ]) {
    const result = calculateMaintenance(kmOnly, km, day(2026, 3, 1));
    assert.equal(formatWear(result.wear), display);
    assert.equal(result.status, status);
  }
  assert.equal(formatWear(121.66666666666666), "121,6%");
});
