# AutoCUIDA — relatório de entrega e aderência

Data: **06/10/2026**. Código analisado: [`8133fd6`](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/8133fd61e5b0b6dfe901d1c033dbf43147319d1b).
Responsável pela verificação final: **Rafael Voigt Villas Boas**, conforme informado pela equipe.
Revisão documental e verificações assistidas por Codex; não houve alteração do código funcional nesta revisão.

## Resultado da análise

O frontend React integra os cadastros de veículos, itens e serviços ao json-server e apresenta alertas, histórico e custos por veículo. Os **47 testes existentes passaram (37 frontend + 10 integração HTTP)** e o build de produção passou. Isso permite demonstrar o fluxo principal, mas **não comprova atendimento integral do escopo nem homologação para uso cotidiano**.

Há três pendências funcionais principais: filtro de alertas ausente, cálculo temporal divergente do calendário e edição de serviços de itens removidos bloqueada. Há também limitações de apresentação, evidência de autoria e aceite. Esta entrega registra essas condições sem implementar correções ou reduzir retroativamente o escopo prometido.

## Conferência dos oito critérios

| Critério de avaliação | Situação e evidência |
| --- | --- |
| 1. Prototipagem e refinamento em Markdown | Documentos disponíveis: [prototipagem](prototipagem.md) e [refinamento](refinamento-prototipagem.md), alinhados ao código e com fontes históricas. |
| 2. Instalação, operação e usuário em Markdown | [Instalação](manual-instalacao.md), [operação](manual-operacao.md) e [usuário](manual-usuario.md), com execução da API, persistência, reset e limitações. |
| 3. Código e commits de cada aluno conforme atribuições | Código e histórico preservados. Há commits de implementação de Rafael Yahata e Gabriel Felipe. As atribuições originais de Rafael Voigt não estão comprovadas por commits próprios no código analisado. A verificação final de Voigt é registrada nesta revisão; não substitui a evidência das implementações que lhe foram atribuídas. Veja [contribuições](historico-contribuicoes.md). |
| 4. Todo o escopo funcional integrado ao json-server, ou justificativas | Parcial: fluxos principais integrados, com pendências P01–P03 abaixo. Limitações do mock são justificadas pela arquitetura acadêmica. Não foi localizada justificativa da equipe para dispensar filtro ou regra de calendário; permanecem pendências do escopo. |
| 5. Tecnologias da disciplina e responsividade por framework | ES6+, React, React Hook Form, Zod, TanStack Query e Tailwind CSS presentes e usados. Vite integra o Tailwind. Não há media queries manuais em frontend/style.css. Há estilos próprios e duas dimensões dinâmicas inline; a proibição de style inline prevista na EAP não está integralmente atendida. A origem humana/IA de cada estilo não é verificável pelo código. |
| 6. Funcional e adequado ao uso | Demonstração acadêmica viável com ressalvas; testes e build aprovados. Não se declara adequado como única fonte de controle real de revisões, pois o alerta temporal pode discordar do prazo exibido. Aceite completo de teclado, zoom e fluxos ainda não foi comprovado nesta revisão. |
| 7. Código limpo e boas práticas | Há separação em páginas, componentes, hooks, API, schemas, regras e testes. Persistem duplicação API/demo, trechos JSX densos e ausência de comando de lint/format no package.json. Inspeção favorável à organização, sem certificado de qualidade integral. |
| 8. Dados iniciais do json-server | [mock/seed.json](../mock/seed.json): 2 veículos, 5 itens e 4 serviços. Cópia local criada automaticamente em mock/db.json. [Guia dos dados](dados-iniciais.md). |

## Planejado versus entregue

As fontes de escopo são a [descrição histórica do protótipo](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/d7e5b6f/docs/prototipo.md), a [matriz de requisitos](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/d7e5b6f/docs/validacao-requisitos.md), o [escopo de 25/09](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/81e55d3/docs/planejamento/escopo-front-end.md) e o [Dicionário da EAP](GPTI/04-dicionario-da-eap.md). “Implementado” nesta tabela significa localizado no código; a evidência de validação está no [registro final](testes/verificacao-final.md).

| Casos de uso | Entrega identificada | Ressalva |
| --- | --- | --- |
| UC01–UC04: criar, consultar, editar e inativar veículo | GaragePage, VehicleRegistration, VehicleEdit, vehicles.js e API; placa única e inativação lógica | Sem tela de reativação; dados inativos permanecem no JSON, fora da seleção ativa. |
| UC05–UC08: criar, consultar, editar e remover item | MaintenanceManager e ações na API; intervalo por km, meses ou ambos | Remover é inativar. Histórico/custos preservados, mas editar serviço do item removido apresenta P03. |
| UC09–UC12: registrar, consultar, editar e excluir serviço | ServicePage, ServiceHistory, ServiceEditForm e API; custos e referências derivados | P03 e falha parcial possível entre atualização do odômetro e gravação do serviço. |
| UC13: alertas e filtro por situação | Cards e classificação por maior desgaste; limites por km corretos nos exemplos verificados | P01: filtro ausente. P02: calendário. P04: percentual sem formatação. |
| UC14: baixa de alerta | Registro válido altera a referência derivada; retroativo coerente preserva a mais recente | Não há botão de simplesmente ocultar alerta; baixa pode não zerar desgaste. P02 afeta o resultado temporal. |
| UC15: atualizar odômetro | Inteiro maior que leitura atual; isolamento por veículo e persistência | API mock não garante exclusividade entre clientes simultâneos. |
| UC16: relatório de custos | Total, tipos, seis meses, média e histórico por veículo | É relatório de gastos registrados; não há previsão de gastos futuros nem exportação. Exportação era opcional. |
| Navegação, carga e estados | Hash por seção/veículo, TanStack Query, erro com nova tentativa, estados vazios | Aceite completo por outro integrante continua sem comprovação consolidada. |

## Pendências, impacto e justificativas documentadas

| ID | Evidência e reprodução | Impacto e situação da justificativa |
| --- | --- | --- |
| P01 — filtro por situação | frontend/src/pages/DashboardPage.jsx percorre todos os itens; não oferece controle para Em dia/Próximo/Vencido. Previsto no pacote 6.1 e T15. | Usuário precisa localizar visualmente os cards. Não foi encontrada dispensa aprovada nem motivo da não implementação. Continua pendente; não é opcional apenas por estar ausente. |
| P02 — calendário | frontend/src/utils/maintenance.js usa mês médio de 30,4375 dias para desgaste e setUTCMonth para data. Referência 01/02/2026, intervalo 1 mês, avaliação 01/03/2026: prazo 01/03, desgaste 91,99%, classe Próximo. Referência 31/01 + 1 mês gera 03/03. | Data exibida e classe podem discordar. A causa técnica foi reproduzida; não há justificativa aprovada para substituir o calendário prometido. Não corrigido nesta revisão documental. |
| P03 — edição de serviço de item removido | selectVehicleData fornece somente itens ativos; ServiceEditForm usa essa lista e updateServiceRecord chama createServiceRecord, que exige item ativo. Remover item 2 e editar o valor do seu serviço mantendo o vínculo retorna “Selecione um item ativo deste veículo.” | Histórico e custo continuam consultáveis, mas correção do serviço fica bloqueada. Não selecionar outro item apenas para contornar o problema, pois mudaria o vínculo. Não há justificativa de exclusão desse caso do escopo. |
| P04 — apresentação e regra visual da EAP | MaintenanceCard exibe wear sem arredondar; seed mostra 121.66666666666666%. MaintenanceCard/ExpenseChart mantêm style de largura/altura dinâmicas. | Limites de classificação por km funcionam, mas apresentação precisa refinamento. Tailwind atende o uso de framework, sem cumprir integralmente a restrição adicional da EAP a inline. |
| P05 — aceite e participação | Não há registro consolidado de T01–T23 aprovados por revisor independente; sete nomes aparecem em git shortlog na base analisada, e dois autores alteram frontend. | Não declarar participação de todos no código nem aceite integral. Verificação final de Rafael Voigt e suas horas são registradas como atividade atual. |
| L01 — limitações do mock | api.js pode executar PATCH do odômetro antes de POST/PUT do serviço; json-server não implementa transação, autenticação ou regras no servidor. | Justificativa técnica compatível com backend mockado exigido. Em falha parcial, conferir histórico antes de repetir. Não equivale a backend de produção. |

O pedido de preparar a entrega sem alterar funcionalidades explica por que **esta revisão** não corrige P01–P04; não explica nem justifica retroativamente a ausência dessas partes no desenvolvimento. A aceitação das pendências cabe ao avaliador. Não foram inventadas razões de prazo, afastamento ou redistribuição de trabalho.

## Limites de escopo e divergências entre documentos

Autenticação real, perfis com permissões, banco real, notificações externas, integração com oficinas/Detran, pagamentos e sincronização entre usuários estavam fora da AV1. localStorage, exportação e filtros financeiros avançados eram opcionais. O filtro de situação do Painel, em contraste, foi prometido como essencial.

Documentos antigos de GPTI descrevem dados em memória e excluem API. A implementação posterior incorporou **API mockada json-server**; a rubrica atual fornecida para entrega a exige. A operação em memória descreve somente o demo publicado no Pages. Os arquivos de GPTI foram preservados como documentos do grupo de gestão; não se presume aprovação formal de mudança do plano.

Bootstrap entrou em 0d6897a e foi substituído por Tailwind em ebec85b. Os HTML antigos são referências estáticas, não o aplicativo React executado por index.html. Esta revisão atualiza os documentos de entrega e as referências correntes, preservando o histórico.

## Material para a avaliação

Entregar os cinco documentos principais em .md, este relatório, o histórico de contribuições, a tabela de horas, o registro de verificação e mock/seed.json. O repositório contém o código e o histórico real. O arquivo ZIP de anexos é uma conveniência e não substitui o link do GitHub para avaliar commits.
