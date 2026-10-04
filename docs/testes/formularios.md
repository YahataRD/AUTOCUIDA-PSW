# Formulários com React Hook Form e Zod — 04/10/2026

## Padrão para o grupo

Cadastro, odômetro e registro de serviço usam useForm, register, handleSubmit e
zodResolver. Os schemas estão em frontend/src/data/formSchemas.js.
Campos numéricos vazios são inválidos; zero precisa ser informado explicitamente.
O resolver entrega números e textos normalizados aos callbacks assíncronos.
O cadastro reutiliza o mesmo schema na camada de dados, evitando regras divergentes.

Placa duplicada e coerência entre veículos, itens e histórico continuam verificadas
contra os dados recentes pela camada de dados. Erros de campos retornados por ela
entram via setError; falhas gerais usam root.server. Não limpar os campos no catch.
O estado isSubmitting complementa isSaving para bloquear os controles durante envio.
Confirmações e limpeza acontecem somente após sucesso. Cancelar cadastro restaura
os valores iniciais. Trocar veículo remonta o formulário, como antes.

O serviço aceita vírgula decimal e separador de milhares, preserva os dados após
falhas e não sobrescreve uma quilometragem digitada quando os dados são reconsultados.

## Validação

- Suíte frontend: 30 testes, incluindo cinco cenários novos de schemas/resolver.
- Suíte HTTP: seis testes com json-server real e base temporária.
- Navegador: obrigatórios e foco no primeiro campo inválido; placa duplicada com
  foco na placa; cadastro com km zero e seleção automática; odômetro igual rejeitado
  e incremento salvo; serviço corretivo de R$ 1.234,56 confirmado e campos limpos.
- API desligada: erro visível e preenchimento de km, data, valor e oficina preservado.
- Testes manuais usam cópia separada da seed, sem modificar mock/db.json.

Para repetir: npm test e npm run build na raiz. O workflow também verifica o build demo.
Nenhum documento de GPTI foi alterado. Framework responsivo e funcionalidades
pendentes permanecem em etapas próprias.
