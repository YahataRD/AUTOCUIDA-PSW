# Histórico de mudanças do AutoCUIDA

Este arquivo registra as entregas de desenvolvimento, com as mais recentes
primeiro. Atualize-o no mesmo commit que conclui uma etapa: informe a data,
o que mudou, a validação executada e uma referência ao código ou PR quando
disponível. O hash do próprio commit pode ser acrescentado na atualização seguinte.
Registre o esforço de cada participante em [horas-dev.md](horas-dev.md).

O histórico anterior foi resumido a partir dos commits. Datas de commits não
representam duração de trabalho, e implementação não significa aceite final.

## 2026-11-27

### M2.5 — Verificação funcional do Marco 2

- Teste no navegador com a `main` em `6f3d94c`, frontend no modo `backend`,
  Express e MongoDB temporário. A carga inicial de Ana retornou 2 veículos,
  5 itens e 4 serviços pela API autenticada. Bia criou uma conta vazia,
  cadastrou um veículo e adicionou um item de manutenção.
- Ana registrou uma troca de óleo a 49.000 km. O alerta passou de **Vencido
  (121,6%)** para **Em dia (0%)** sem recarregar a página. A próxima troca foi
  de 45.000 km para 64.000 km. O serviço de R$ 200,00 apareceu no histórico
  e o total do Golf passou a R$ 2.400,00.
- Bia registrou um serviço a 12.500 km. O alerta passou de **Vencido (200%)**
  para **Em dia (0%)**. A próxima troca foi de 11.000 km para 13.500 km.
  O filtro refletiu a nova situação e o custo editado para R$ 190,00
  persistiu após novo login.
- O logout, a troca de conta e o retorno ao login ao recarregar foram
  verificados. Cada conta exibiu apenas seus veículos e serviços. O painel
  calcula alertas com os dados persistidos pela API. O aceite formal cabe à
  equipe de gestão.
- Passaram 114 testes automatizados (48 frontend, 11 mock e 55 backend),
  incluindo isolamento entre contas na API. O build do modo `backend` passou.

As cinco lacunas de Rafael Duarte foram lançadas no [registro de horas](horas-dev.md).

| Pacote | Dia | Horas |
| --- | --- | ---: |
| M2.5 | 2026-11-16 | 0,50 |
| M2.3 / M2.5 | 2026-11-23 | 1,00 |
| M2.3 | 2026-11-23 | 2,50 |
| M2.5 | 2026-11-23 | 3,00 |
| M2.2 | 2026-11-23 | 4,00 |
| **Total lançado** | | **11,00** |

O total registrado do PSW passou a **93,00 h**.

## 2026-11-23

### M2.2 — Rotas de itens de manutenção e serviços

- O Express passou a listar, consultar, cadastrar e editar itens e serviços
  com Bearer JWT. Itens são inativados para preservar o histórico. Serviços
  podem ser excluídos. As operações usam o proprietário do veículo e mantêm
  os vínculos entre veículos, itens e registros.
- O MongoDB grava o histórico e o odômetro juntos no documento do veículo.
  A API valida datas, intervalos, cronologia e quilometragem. Edições e
  exclusões de serviços preservam a maior leitura já registrada.
- Os testes com Ana e Bia em MongoDB temporário verificaram o isolamento de
  leituras e escritas, os vínculos inválidos, a edição de serviços de itens
  inativados e a consistência durante gravações concorrentes. A suíte completa
  passou com 103 testes nesta integração (48 frontend, 11 mock e 44 backend).
- O [contrato da API](../backend/README.md#itens-de-manutenção-e-serviços) está
  documentado. A integração dessas telas ao modo Express foi concluída no cliente
  autenticado do frontend nesta etapa.
  Horas [a confirmar](horas-dev.md).

### M2.4 — Carga inicial vinculada

- Criado `backend/scripts/seed.js` e o comando `npm run seed:backend`.
- O script cria ou atualiza um usuário de aplicação e restaura veículos, itens
  e serviços da seed compartilhada somente para esse usuário.
- Validação no Atlas: login aprovado e leitura de 2 veículos, 5 itens e 4
  serviços no banco `autocuida_dev`.

### M2.5 — Login e sessão do frontend

- O modo `backend` conecta o cadastro de conta, o login e a garagem ao Express.
  A listagem, o cadastro, a edição, a atualização do odômetro e a inativação
  usam Bearer JWT e enviam somente os campos previstos pela API.
- O token fica em memória. Cada sessão tem seu próprio cache do TanStack Query.
  Sair cancela consultas e limpa os dados da conta. Um HTTP 401 em uma chamada
  autenticada retorna ao login, assim como recarregar a página.
- A garagem, o painel, os serviços e os custos estão disponíveis nesse modo.
  O cliente autenticado consulta veículos, itens e registros nas três rotas
  Express e mantém a navegação por hash, a seleção por veículo e o cache por
  conta no TanStack Query.
- No navegador, Ana e Bia acessaram a mesma aba com MongoDB temporário. Foram
  verificados cadastro, login, senha inválida, persistência dos veículos,
  edição, odômetro, logout, troca de conta e retorno ao login após recarregar.
  A suíte automatizada também verifica inativação, rejeição de acesso entre
  contas e tratamento de JWT expirado. Passaram 110 testes e os builds dos
  modos `api`, `backend` e `demo`. Horas [a confirmar](horas-dev.md).

### M2.3 — Integração das rotas de veículos ao JWT

- O Express passou a expor cadastro e login públicos e a exigir Bearer JWT nas
  rotas de veículos. A autorização usa o proprietário autenticado para listar,
  consultar, editar, atualizar a quilometragem e inativar.
- Autenticação, validação e veículos passaram a usar a mesma classe `HttpError`.
  Erros esperados retornam status e campos no contrato JSON da API.
- A inicialização valida a configuração JWT e aguarda os índices de usuários e
  veículos após conectar ao MongoDB. Falha na criação dos índices encerra a
  conexão antes de abrir HTTP.
- **110 testes passaram** (45 frontend, 11 mock e 54 backend), com MongoDB
  isolado. A aplicação principal foi testada com dois usuários, tokens reais,
  acesso próprio, bloqueio de leitura e mutação entre contas e JWT inválido ou
  expirado. A reconexão e o tratamento de porta ocupada também passaram.
- M2.5 ainda precisa ligar a sessão no frontend. Horas da integração de 23/11
  [a confirmar](horas-dev.md).

### Estado do Marco 2 e consolidação das horas

Retrato da base `c345282` antes da integração acima.

- Base analisada `c345282`. O PR #7 trouxe à `main` o módulo de cadastro, login e JWT e o cliente HTTP com Bearer e chave de cache por usuário. O PR #8 completou as dependências da autenticação e corrigiu a leitura JSON no cliente.
- **M2.1:** modelo, repositório, validações, controle por proprietário e router de veículos implementados. A montagem e o aceite integrado continuam pendentes.
- **M2.3:** montar `auth.router` e `createVehicleRouter({ authenticate: auth.authenticate })` em `/vehicles`, antes do tratador 404. Ler a configuração JWT na partida e inicializar os índices de usuários e veículos após a conexão MongoDB e antes de abrir a porta HTTP. Proteger a inicialização com fechamento do MongoDB em caso de erro. Unificar `HttpError` para o tratador central reconhecer erros de autenticação. Validar cadastro, login e rotas protegidas com JWT real e dois usuários em banco isolado.
- **M2.5:** ligar sessão e telas de autenticação ao cliente HTTP, ativar consultas com a identidade do usuário, limpar o cache ao sair e adaptar os corpos de cadastro e edição ao schema Express. A carga atual ainda solicita veículos, itens e serviços juntos. A migração completa depende de M2.2 e da carga inicial M2.4.
- **M2.2 e M2.4:** implementar persistência e rotas de itens e serviços com isolamento por proprietário, depois preparar carga inicial vinculada em ambiente separado. Os cálculos e telas da Entrega 1 fornecem regras e fluxos para reaproveitar.
- Verificação local com a base analisada. Passaram 98 testes da suíte padrão (45 frontend, 11 mock e 42 backend) e, separadamente, 11 testes HTTP do módulo JWT em um Express de teste com MongoDB temporário. A aplicação padrão devolveu 404 em `POST /usuarios`, `POST /login` e `GET /vehicles`. Ao montar os módulos temporariamente com o tratador central, ausência de Bearer e corpo inválido no login devolveram 500, evidenciando a incompatibilidade entre as duas classes `HttpError`.

Apontamentos do PSW por pacote, dia e pessoa, consolidados a partir do [registro de horas](horas-dev.md) e dos Status Reports 2 e 3. Os dias da reconstituição correspondem aos commits. Os dois lançamentos de 15/11 são o rateio das mesmas 2 h declaradas.

| Pacote | Dia | Horas | Pessoa |
| --- | --- | ---: | --- |
| Pré-baseline | 2026-09-23 | 6,00 | Rafael Duarte |
| Pré-baseline | 2026-09-25 | 2,50 | Rafael Duarte |
| 2.2 | 2026-10-02 | 5,00 | Rafael Duarte |
| 7.4 | 2026-10-02 | 1,00 | Rafael Duarte |
| 3.1 | 2026-10-02 | 2,50 | Rafael Duarte |
| 2.2 | 2026-10-04 | 4,50 | Rafael Duarte |
| 7.4 | 2026-10-04 | 0,50 | Rafael Duarte |
| 7.1 | 2026-10-04 | 2,50 | Rafael Duarte |
| 3.1 + 4.1 + 5.1 + 5.2 | 2026-10-05 | 4,50 | Gabriel Felipe |
| 2.1 | 2026-10-05 | 3,00 | Rafael Duarte |
| 7.3 | 2026-10-05 | 0,50 | Rafael Duarte |
| 7.3 | 2026-10-06 | 2,00 | Rafael Duarte |
| 7.1 | 2026-10-06 | 2,50 | Rafael Duarte |
| 7.2 | 2026-10-06 | 2,00 | Rafael Voigt |
| 6.1 | 2026-10-06 | 3,50 | Rafael Duarte |
| M2.1 | 2026-10-31 | 8,50 | Rafael Duarte |
| M2.3 | 2026-11-15 | 1,50 | Rafael Voigt |
| M2.5 | 2026-11-15 | 0,50 | Rafael Voigt |
| M2.5 | 2026-11-16 | 3,00 | Rafael Voigt |
| M2.3 | 2026-11-16 | 2,50 | Rafael Voigt |
| M2.5 | 2026-11-16 | A confirmar | Rafael Duarte |
| M2.3 / M2.5 — revisão técnica e documentação | 2026-11-23 | A confirmar | Rafael Duarte |

**Total registrado no PSW: 58,50 h**, incluindo reconstituições, rateios e 5,50 h declaradas por Rafael Voigt em 23/11 para os ajustes de 16/11. Permanecem em aberto o detalhamento diário, a divisão dos pacotes do Gabriel, a confirmação da revisão do Voigt em 06/10 e os apontamentos das correções da Entrega 1. As lacunas e respectivas evidências estão no [registro de horas](horas-dev.md).

## 2026-10-31

### Etapa 6 — dependências e regressão completa

- Lockfiles atualizados dentro das faixas existentes: concurrently/shell-quote,
  body-parser/qs e Vite/Zod/source-map-js com suas dependências compatíveis.
- Resolvidos os alertas conhecidos registrados na primeira etapa; instalação
  completa com `npm ci` e audit sem alertas nas quatro áreas.
- Validação: 93 testes aprovados (45 frontend + 11 mock + 37 backend), builds
  API/demo, inicialização conjunta `npm start` com HTTP 200 no frontend/mock
  e conferência de espaços no diff.
- Evidências e limites em `docs/testes/backend-veiculos.md`; faltam JWT real,
  seed integrada e aceite visual completo, conforme frentes da equipe.
- Registrada 1,00 h de Rafael Duarte Yahata. Telas, credenciais e GPTI preservados.

### Etapa 5 — router de veículos preparado para JWT

- Factory de rotas GET/lista, GET/individual, POST, PUT e PATCH que exige middleware
  explícito e identidade válida. Não foi montada sem JWT na aplicação padrão.
- Middleware publica apenas os erros previstos (`HttpError`); driver e erros
  inesperados continuam sem expor detalhes internos.
- Verificação: 9 testes HTTP em banco temporário, com identidades exclusivamente
  de teste; 401/403/404, duplicidade, campos, inativação e concorrência conferidos.
  Fixtures não implementam ou comprovam JWT real.
- Documentada a integração para Voigt: `req.user.id`, montagem autenticada e
  inicialização dos índices antes de abrir HTTP.
- Registrada 1,50 h de Rafael Duarte Yahata. Sem seed ou gravações no Atlas.

### Etapa 4 — serviços e concorrência de veículos

- Repositório com consultas por proprietário, cadastro, edição, odômetro e
  inativação. Serviços validam identidade, corpo e vínculo antes de gravar.
- Condições atômicas de km/versão/ativação impedem redução de odômetro por leituras
  antigas e alterações após inativação. Inativação repetida preserva o documento.
- Erros previstos têm status/código/campos; duplicidade de placa retorna conflito
  genérico, veículo alheio é 403 e inexistente é 404, conforme a atividade da aula 11.
- Verificação: 7 testes de serviços e concorrência em MongoDB real isolado,
  incluindo todas as mutações por usuário alheio, edição antiga e maior km final.
- Registradas 2,00 h de Rafael Duarte Yahata. Rotas/JWT ainda não registrados;
  não houve alteração no Atlas compartilhado ou em documentos GPTI.

### Etapa 3 — modelo de veículo e validações

- Criado módulo `backend/src/modules/vehicles/` com modelo Mongoose, normalização
  de placa e schemas Zod de cadastro, edição, odômetro e inativação.
- Proprietário obrigatório e imutável, JSON público com `id` texto sem campos
  internos e índice global de placa única, incluindo veículos inativos.
- Entrada JSON recusa identidade/proprietário/ativação indevidos, campos extras
  e números inválidos. Ano respeita o calendário de São Paulo; edição aceita
  manter km, atualização específica exige aumento e não há reativação por PATCH.
- Índice testado com inserções simultâneas de placa equivalente e proprietários
  distintos em MongoDB real temporário. Inativação preserva a unicidade.
- Adicionado guia `docs/backend-veiculos.md` com interfaces e limites para os colegas.
  As futuras rotas precisam de JWT e condição atômica para impedir regressão de km;
  validar uma leitura anterior, sozinho, não garante concorrência.
- Adicionado Zod a partir de 4.6.7, com correção do alerta da versão anterior.
- Validação: `npm ci --prefix backend`, `npm test` (77 aprovados: 45 frontend,
  11 mock e 21 backend), audit do backend sem alertas e `git diff --check`.
- Registrada 1,50 h de Rafael Duarte Yahata. Sem novas rotas, seed ou alteração de
  dados/índices do Atlas compartilhado; frontend e arquivos de GPTI preservados.

### Etapa 2 — conexão MongoDB/Mongoose

- `MONGO_URL` obrigatória no processo, timeout configurável e conexão confirmada
  antes da abertura HTTP. Falha inicial encerra com código 1 e mensagem sem URI/credenciais.
- `GET /ready` faz ping no banco e responde 503 se indisponível; `/health` permanece
  como verificação de processo HTTP. Encerramento SIGINT/SIGTERM fecha HTTP e MongoDB;
  falha de porta ocupada também libera a conexão.
- Mongoose usa conexão padrão por processo, sem buffering de operações desconectadas.
- Integração com `mongodb-memory-server` executa MongoDB real isolado, sem ler
  o banco de desenvolvimento. Testes comprovam escrita/reconexão, readiness,
  falha inicial, porta ocupada e encerramento idempotente.
- Validação: `npm ci --prefix backend`, `npm test` (65 aprovados: 45 frontend,
  11 mock e 9 backend) e `git diff --check`. Backend sem alertas no audit da instalação.
- Documentação atualizada para configuração obrigatória e download/cache do MongoDB
  de testes. Ainda não há banco de desenvolvimento provisionado, modelos ou CRUD.
- Registrada 1,50 h de Rafael Duarte Yahata. Documentos de GPTI preservados.

### Etapa 1 — base HTTP do backend Express

- Criado `backend/` com Express, configuração por ambiente, CORS para Vite/preview,
  `GET /health` e erros JSON para rota ausente, JSON inválido, corpo excessivo e falha interna.
- Separados `createApp` e inicialização HTTP; documentados os pontos de integração
  dos módulos. MongoDB, autenticação e CRUD ficam nas próximas etapas.
- Adicionados comandos `start:backend`, `dev:backend` e `test:backend`;
  instalação/testes da raiz e cache do workflow incluem o backend.
- `npm start` mantém frontend e mock; o Express deve ser iniciado separadamente
  enquanto não houver rotas de negócio, evitando disputar a porta 3001.
- Validação: instalação `npm ci` com lockfiles; 62 testes aprovados
  (45 frontend + 11 mock HTTP + 6 backend), builds API/demo e `git diff --check`.
- `npm audit`: backend sem alertas; pacotes anteriores apresentam 2 alertas críticos
  na raiz (concurrently/shell-quote), 3 altos no frontend (source-map-js/vite/zod)
  e 1 alto + 1 moderado no mock (body-parser/qs). Triagem/correção em etapa separada;
  nenhum `audit fix` automático executado nesta entrega.
- Registrada 1,00 h de Rafael Duarte Yahata. Documentos de GPTI preservados.

## 2026-10-06

### Filtro e histórico de itens removidos

- Painel com filtro Todos/Em dia/Próximo/Vencido, contador, estado sem resultados
  e retorno à lista completa; troca de veículo restaura Todos.
- Edição de serviço permite manter seu item original removido, sem reativá-lo.
  Novos serviços e transferência para outro item inativo continuam bloqueados.
- 56 testes aprovados (45 frontend + 11 HTTP), builds API/demo e conferência
  em celular/desktop. Edição via API preservada após recarregar, com custos atualizados.
- Documentos e tabela de horas atualizados: 2,00 h nesta etapa. P01–P03 resolvidas;
  aceite completo, evidência individual e ressalva de estilos da EAP permanecem.
- Evidências em [filtro e histórico](../docs/testes/filtro-historico.md).

### Calendário e percentuais dos alertas

- Integrada a revisão documental realizada na faculdade (0c66171), preservando
  o registro de verificação e as 2,00 h de Rafael Voigt.
- Corrigido o vencimento por meses, usando o último dia disponível do mês de
  destino quando necessário; o desgaste temporal atinge 100% no prazo exibido.
- Dia local normalizado para evitar diferenças por horário; percentuais em
  português com até uma casa decimal, sem antecipar as faixas de classificação.
- Validação: 53 testes, builds API/demo e inspeção do Painel em 390 e 1366 px.
  Testes de calendário repetidos nos fusos de São Paulo e Auckland.
- Documentação corrente e horas atualizadas (1,50 h nesta etapa). Permanecem
  filtro por situação, edição de serviços de itens removidos e aceite completo.

### Preparação documental para avaliação

- Revisados prototipagem, refinamento e três manuais para refletir React/Tailwind/json-server e as limitações atuais.
- Criados relatório de aderência aos oito critérios, histórico de contribuições, guia da seed e registro final de verificação; recuperada a rastreabilidade T01–T23.
- Corrigidas marcações de conclusão do cronograma, separando implementação, pendência e aceite.
- Registradas 2,00 horas de Rafael Voigt na verificação final, conforme indicação da equipe.
- Validação da base 8133fd6: 37 testes frontend + 10 HTTP aprovados; build API aprovado; exemplos de calendário e bloqueio de edição de item removido reproduzidos.
- Nenhum código funcional, dependência, teste existente ou dado inicial foi alterado.


### Formulários e tratamento de falhas

- Campos de itens, edição de serviços e veículos com rótulos e mensagens
  associadas por acessibilidade; datas futuras e referências inválidas rejeitadas.
- Intervalos de manutenção aceitam somente km, somente meses ou ambos;
  um critério vazio equivale a desativá-lo.
- Rascunho e erros da edição de veículo preservados após reconsulta dos dados.
- Remoção de item, exclusão de serviço e inativação de veículo tratam falhas
  da API e bloqueiam cliques repetidos enquanto aguardam a resposta.
- Validação: 47 testes aprovados, builds API e demo, conferência no navegador
  em celular e desktop e falhas HTTP 500 simuladas. Roteiro em
  [formulários e ações](../docs/testes/formularios-acoes.md).
- Horas registradas para esta etapa e para a correção de integridade anterior.
- Próxima prioridade: calendário e percentuais dos alertas.

### Integridade das edições

- Impedida a redução do odômetro pela edição de veículo, mantendo alterações
  de modelo/placa/ano e leituras iguais ou maiores disponíveis.
- Referências de itens incompatíveis com o histórico são rejeitadas antes de
  gravar; API e demo compartilham a mesma validação.
- A edição de serviço amplia o odômetro quando necessário, antes de salvar o
  registro. Demo e cache do TanStack Query acompanham a atualização.
- Falha parcial na gravação informa o usuário e mantém a base legível.
- Validação: 45 testes aprovados, incluindo sete regressões novas, e build
  de produção aprovado. Detalhes em [integridade das edições](../docs/testes/integridade-edicoes.md).
- Próximas prioridades: erros/rótulos dos formulários e falhas das ações;
  calendário e percentuais dos alertas; filtro por situação e serviços de itens
  inativados; conferência final da entrega.

## 2026-10-05

### Correção da tabela de horas

- Ajustada a linha de separação para as cinco colunas do cabeçalho, restaurando
  a renderização Markdown sem alterar os valores ou os links.

### Simplificação do registro de horas

- Consolidado o registro em uma tabela com entregas, commits e subtotais.
- Mantidas colunas distintas para tempo estimado e tempo confirmado.

### Estimativas retrospectivas de esforço

- Preenchida a tabela de horas com estimativas por entrega e autor dos commits,
  incluindo faixas de incerteza e critérios de cálculo.
- Separadas as estimativas do tempo efetivamente trabalhado, que continua
  pendente de confirmação individual.
- Rafael Voigt Villas Boas permanece sem estimativa: a equipe confirmou que
  ele ainda não possui commits. O subtotal cobre somente contribuições identificadas.

### Registro de mudanças e horas

- Criados este changelog e a tabela de horas por desenvolvedor e entrega.
- Incluídos links no README para facilitar a atualização pela equipe.
- Horas anteriores permanecem sem lançamento até confirmação dos responsáveis.

### Migração para Tailwind CSS

- Tailwind CSS 4 e seu plugin para Vite substituem o Bootstrap.
- Preservadas as cores, os cartões, a navegação e as funcionalidades existentes.
- Layouts responsivos passam a usar classes do Tailwind, sem media queries próprias.
- Ajustados os cartões de custos em telas estreitas e os espaçamentos dos formulários.
- Validação: 38 testes aprovados; builds de API e demo aprovados; navegação pelas
  quatro telas em viewports de 320, 390, 768 e 1366px, sem rolagem horizontal.
- Referência: [ebec85b](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/ebec85b).
  Detalhes e limites em [validação do Tailwind](../docs/testes/tailwind.md).

### Gestão de veículos, itens e serviços

- Acrescentadas edição e inativação de veículos, gestão de itens de manutenção
  e edição/exclusão de serviços.
- Referência: [0d6897a](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0d6897a).
- A revisão identificou pendências de integridade nas edições, calendário de
  alertas, filtro por situação e mensagens de validação. Esta entrada registra
  a implementação; não declara essas pendências resolvidas.

## 2026-10-04

### Formulários com React Hook Form e Zod

- Adaptados cadastro de veículo, odômetro e registro de serviço, com schemas
  compartilhados, conversão dos campos e mensagens de validação.
- Referência: [56efc1e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/56efc1e).

### Integração com json-server e TanStack Query

- Integradas consultas e gravações ao mock, com dados iniciais versionados,
  atualização de cache e tratamento de falhas.
- Unificados instalação, execução, testes e build pelos comandos da raiz.
- Referências: [0195f64](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0195f64)
  e [0711ffd](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0711ffd).

### Organização do frontend

- Movidos os arquivos da aplicação para `frontend/`, ajustando os caminhos
  e a publicação sem reorganizar os documentos de gestão.
- Referência: [409ec2e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/409ec2e).

## 2026-10-02

### Cadastro de veículos

- Implementados cadastro, validação de placa e seleção automática do novo veículo.
- Referência: [255a20f](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/255a20f).

### Publicação no GitHub Pages

- Criado workflow de publicação após testes e build na `main`.
- Referência: [e87b48a](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/e87b48a).
- Atualmente o Pages usa o modo demo em memória; o json-server roda localmente.

### Base compartilhada

- Organizados os dados por veículo, a carga validada, os estados de erro/vazio
  e a navegação por URL, com documentação para continuidade do trabalho.
- Referências: [f48f9a7](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/f48f9a7)
  e [e65bcd2](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/e65bcd2).

## 2026-09-25

### Organização da documentação

- Convertidos materiais para Markdown, mapeados requisitos e revisados o
  cronograma e a organização dos documentos de desenvolvimento.
- Referências: [d7e5b6f](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/d7e5b6f),
  [b75f7c2](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/b75f7c2),
  [81e55d3](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/81e55d3) e
  [9db6516](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/9db6516).

## 2026-09-23

### Versão inicial

- Incluídos os protótipos, as telas React, os componentes visuais e os cálculos
  iniciais de manutenção e custos.
- Referência: [b59f1ab](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/b59f1ab).
