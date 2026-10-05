# Refinamento da prototipagem

## 1. Motivações

O protótipo inicial era composto por páginas HTML e CSS estático. O refinamento
transformou os fluxos principais em uma aplicação React/Vite integrada a um
mock HTTP, mantendo o escopo original e reduzindo duplicação entre telas.

## 2. Refinamentos realizados

### Arquitetura

- React 18 com componentes, páginas e estado derivado por veículo.
- Vite para desenvolvimento e build de produção.
- Bootstrap 5 para grid, espaçamento e comportamento responsivo de mercado.
- TanStack Query para carregamento, cache, mutações, cancelamento e nova
  consulta após uma operação.
- Cliente HTTP centralizado em `frontend/src/data/api.js`.
- `mock/seed.json` como fonte dos dados iniciais e `json-server` como backend
  mockado local.

### Formulários e validação

- React Hook Form controla os formulários e seus estados de envio.
- Zod valida e normaliza placa, ano, quilometragem, data, valor e oficina.
- Erros do servidor são apresentados sem apagar os dados digitados.
- Operações ficam bloqueadas enquanto outra gravação está em andamento.

### Navegação e experiência

- Rotas com hash podem ser copiadas e restauram a seção e o veículo.
- Há estados explícitos de carregamento, erro, vazio, sucesso e demonstração.
- O layout se adapta às larguras de celular, tablet e desktop.
- Elementos interativos têm nomes acessíveis, foco e mensagens associadas aos
  campos.

### Dados e consistência

- Todas as entidades possuem `id` e os vínculos usam `vehicleId`.
- O carregamento valida a estrutura inteira antes de exibir os dados.
- O mock é inicializado a partir da seed e pode ser restaurado com `npm run
  reset`.
- Como o json-server não possui transações, falhas parciais são informadas ao
  usuário e não são escondidas por uma confirmação falsa.

## 3. O que não foi expandido

Não foram adicionados autenticação, banco real, notificações, integração com
oficinas, aplicativo nativo ou funcionalidades de gestão de usuários. Esses
itens não fazem parte da entrega da disciplina.

## 4. Evidências

- Testes automatizados em `frontend/tests/` e `mock/integration.test.js`.
- Build de produção com `npm run build`.
- Workflow de publicação em `.github/workflows/deploy-pages.yml`.
- Dados iniciais versionados em `mock/seed.json`.
