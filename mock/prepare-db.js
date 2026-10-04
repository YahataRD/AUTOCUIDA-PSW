import { copyFile } from "node:fs/promises";
import { constants } from "node:fs";

// Reiniciar o servidor preserva a cópia de trabalho, que nunca é versionada.
const reset = process.argv.includes("--reset");
try {
  await copyFile(
    new URL("./seed.json", import.meta.url),
    new URL("./db.json", import.meta.url),
    reset ? 0 : constants.COPYFILE_EXCL,
  );
  console.log(reset ? "Dados iniciais restaurados." : "Base do mock criada.");
} catch (error) {
  if (error.code !== "EEXIST" || reset) throw error;
}
