import mongoose from "mongoose";

// Uma conexão padrão por processo, reutilizada pelos modelos mongoose.model().
export async function connectDatabase({ mongoUrl, mongoTimeoutMs }) {
  mongoose.set("bufferCommands", false);
  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: mongoTimeoutMs,
      connectTimeoutMS: mongoTimeoutMs,
      socketTimeoutMS: mongoTimeoutMs,
    });
  } catch {
    await mongoose.disconnect();
    // Erros do driver podem conter host, usuário ou URI. Não repassá-los ao log.
    throw new Error("Não foi possível conectar ao MongoDB. Confira MONGO_URL, rede e credenciais.");
  }
}

export async function isDatabaseReady() {
  if (mongoose.connection.readyState !== 1) return false;
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch {
    return false;
  }
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}

// Evitar evento de erro sem listener após uma conexão inicialmente bem-sucedida.
// Não imprimir o erro bruto, que pode expor dados da conexão.
mongoose.connection.on("error", () => {
  console.error("A conexão com MongoDB apresentou uma falha.");
});
