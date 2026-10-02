# Validação do cadastro de veículos

02/10/2026 — execução assistida por Codex, branch `codex/cadastro-veiculos`.

- `npm test`: 22 testes aprovados, incluindo cinco novos cenários de cadastro.
- `npm run build`: aprovado, 38 módulos.
- No navegador local: campos vazios exibem erros associados; placa `bra2e24`
  é rejeitada por duplicar `BRA-2E24`; cadastro `XYZ9A87`, modelo Teste,
  ano 2022 e 0 km é aceito e selecionado na URL.
- Cancelar um segundo cadastro preserva os três veículos e descarta o rascunho.
- O veículo criado aparece sem itens e com custos/serviços zerados.
- Nenhum aviso ou erro nos logs do navegador durante esses fluxos.
- Primeiro veículo em base vazia, duplicidade com veículo inativo, isolamento
  e limites numéricos cobertos nos testes de domínio em `tests/vehicles.test.js`.

Edição/inativação e homologação visual completa continuam fora desta etapa.
Os dados permanecem em memória. Nenhum arquivo de `docs/GPTI/` foi alterado.
