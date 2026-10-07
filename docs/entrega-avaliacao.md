# AutoCUIDA — relatório de entrega e aderência

Data: **06/10/2026**. Código analisado: [`8133fd6`](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/8133fd61e5b0b6dfe901d1c033dbf43147319d1b).
Responsável pela verificação final: **Rafael Voigt Villas Boas**, conforme informado pela equipe.
Revisão documental e verificações assistidas por Codex; não houve alteração do código funcional na revisão registrada em 0c66171. **Atualização posterior:** Rafael Duarte corrigiu calendário e percentuais; evidências em [calendario-alertas.md](testes/calendario-alertas.md). As conclusões correntes abaixo incorporam essa correção, sem atribuí-la à revisão anterior.

## Resultado da análise

O frontend React integra veículos, itens e serviços ao json-server e apresenta alertas, histórico e custos por veículo. A rodada final passou em **56 testes (45 frontend + 11 HTTP)** e nos builds API/demo. P01, P02 e P03 foram corrigidas; permanece o aceite completo, que não é substituído por testes automatizados.

As pendências funcionais identificadas nesta análise foram corrigidas: filtro, calendário e edição de serviços de itens removidos. Permanecem ressalvas de estilos dinâmicos frente à EAP, evidência de autoria e aceite. Veja [filtro e histórico](testes/filtro-historico.md).

## Conferência dos oito critérios

| Critério de avaliação | Situação e evidência |
| --- | --- |
| 1. Prototipagem e refinamento em Markdown | Documentos disponíveis: [prototipagem](prototipagem.md) e [refinamento](refinamento-prototipagem.md), alinhados ao código e com fontes históricas. |
| 2. Instalação, operação e usuário em Markdown | [Instalação](manual-instalacao.md), [operação](manual-operacao.md) e [usuário](manual-usuario.md), com execução da API, persistência, reset e limitações. |
| 3. Código e commits de cada aluno conforme atribuições | Código e histórico preservados. Há commits de implementação de Rafael Yahata e Gabriel Felipe. As atribuições originais de Rafael Voigt não estão comprovadas por commits próprios no código analisado. A verificação final de Voigt é registrada nesta revisão; não substitui a evidência das implementações que lhe foram atribuídas. Veja [contribuições](historico-contribuicoes.md). |
| 4. Todo o escopo funcional integrado ao json-server, ou justificativas | Fluxos previstos implementados, incluindo as correções P01–P03. Integração HTTP e cenários da rodada final validados; aceite integral independente ainda pendente. Limitações do mock justificadas pela arquitetura acadêmica. |
| 5. Tecnologias da disciplina e responsividade por framework | ES6+, React, React Hook Form, Zod, TanStack Query e Tailwind CSS presentes e usados. Vite integra o Tailwind. Não há media queries manuais em frontend/style.css. Há estilos próprios e duas dimensões dinâmicas inline; a proibição de style inline prevista na EAP não está integralmente atendida. A origem humana/IA de cada estilo não é verificável pelo código. |
| 6. Funcional e adequado ao uso | Fluxos acadêmicos funcionais nos testes executados. Calendário, filtro e histórico corrigidos. Não equivale a homologação de produção ou aceite completo de teclado, zoom e todos os cenários. |
| 7. Código limpo e boas práticas | Há separação em páginas, componentes, hooks, API, schemas, regras e testes. Persistem duplicação API/demo, trechos JSX densos e ausência de comando de lint/format no package.json. Inspeção favorável à organização, sem certificado de qualidade integral. |
| 8. Dados iniciais do json-server | [mock/seed.json](../mock/seed.json): 2 veículos, 5 itens e 4 serviços. Cópia local criada automaticamente em mock/db.json. [Guia dos dados](dados-iniciais.md). |

## Planejado versus entregue

As fontes de escopo são a [descrição histórica do protótipo](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/d7e5b6f/docs/prototipo.md), a [matriz de requisitos](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/d7e5b6f/docs/validacao-requisitos.md), o [escopo de 25/09](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/81e55d3/docs/planejamento/escopo-front-end.md) e o [Dicionário da EAP](GPTI/04-dicionario-da-eap.md). “Implementado” nesta tabela significa localizado no código; a evidência de validação está no [registro final](testes/verificacao-final.md).

| Casos de uso | Entrega identificada | Ressalva |
| --- | --- | --- |
| UC01–UC04: criar, consultar, editar e inativar veículo | GaragePage, VehicleRegistration, VehicleEdit, vehicles.js e API; placa única e inativação lógica | Sem tela de reativação; dados inativos permanecem no JSON, fora da seleção ativa. |
| UC05–UC08: criar, consultar, editar e remover item | MaintenanceManager e API; intervalos por km, meses ou ambos | Remover inativa o item e preserva histórico/custos. Serviços existentes podem ser corrigidos sem reativá-lo. |
| UC09–UC12: registrar, consultar, editar e excluir serviço | ServicePage, ServiceHistory, ServiceEditForm e API; inclui item removido no vínculo original | Falha parcial possível entre atualização do odômetro e gravação do serviço; novos serviços exigem item ativo. |
| UC13: alertas e filtro por situação | Cards, calendário e percentuais corrigidos; filtro Todos/Em dia/Próximo/Vencido com estado vazio | P04 permanece somente quanto às dimensões inline. |
| UC14: baixa de alerta | Registro válido altera a referência derivada; retroativo coerente preserva a mais recente | Não há botão de simplesmente ocultar alerta; baixa pode não zerar desgaste. |
| UC15: atualizar odômetro | Inteiro maior que leitura atual; isolamento por veículo e persistência | API mock não garante exclusividade entre clientes simultâneos. |
| UC16: relatório de custos | Total, tipos, seis meses, média e histórico por veículo | É relatório de gastos registrados; não há previsão de gastos futuros nem exportação. Exportação era opcional. |
| Navegação, carga e estados | Hash por seção/veículo, TanStack Query, erro com nova tentativa, estados vazios | Aceite completo por outro integrante continua sem comprovação consolidada. |

## Pendências, impacto e justificativas documentadas

| ID | Evidência e reprodução | Impacto e situação da justificativa |
| --- | --- | --- |
| P01 — filtro por situação | Corrigida: seleção das quatro opções, contador e estado vazio com Mostrar todos. Trocar veículo restaura Todos. | Validado no navegador com API mock, teclado, celular e desktop. Resumo de alertas continua considerando todos os itens do veículo. |
| P02 — calendário | Corrigida após 0c66171: ciclo 01/02–01/03 chega a 100% no dia 01/03; 31/01 + um mês respeita 28/02 ou 29/02. | Usa dias reais entre referência e prazo, com data local. Regressões em calendario-alertas.md. Tela aberta até o dia seguinte precisa ser recarregada. |
| P03 — edição de serviço de item removido | Corrigida: formulário inclui o item original removido; API/demo aceitam preservá-lo na edição. | Item não é reativado; novos serviços e transferência para outro item inativo continuam bloqueados. Persistência e custos conferidos. |
| P04 — apresentação e regra visual da EAP | Percentuais corrigidos: exemplo 121,6%, com precisão original preservada na classe. MaintenanceCard/ExpenseChart mantêm style de largura/altura dinâmicas. | Resolvida a apresentação decimal. Tailwind atende o uso de framework; permanece a restrição adicional da EAP a inline. |
| P05 — aceite e participação | Não há registro consolidado de T01–T23 aprovados por revisor independente; sete nomes aparecem em git shortlog na base analisada, e dois autores alteram frontend. | Não declarar participação de todos no código nem aceite integral. Verificação final de Rafael Voigt e suas horas são registradas como atividade atual. |
| L01 — limitações do mock | api.js pode executar PATCH do odômetro antes de POST/PUT do serviço; json-server não implementa transação, autenticação ou regras no servidor. | Justificativa técnica compatível com backend mockado exigido. Em falha parcial, conferir histórico antes de repetir. Não equivale a backend de produção. |

A revisão documental 0c66171 preservou funcionalidades conforme solicitado naquele momento. Após novas autorizações, foram corrigidos P01–P03 e a parte decimal de P04. Os registros anteriores permanecem históricos; o aceite das ressalvas remanescentes cabe ao avaliador.

## Limites de escopo e divergências entre documentos

Autenticação real, perfis com permissões, banco real, notificações externas, integração com oficinas/Detran, pagamentos e sincronização entre usuários estavam fora da AV1. localStorage, exportação e filtros financeiros avançados eram opcionais. O filtro de situação do Painel, em contraste, foi prometido como essencial.

Documentos antigos de GPTI descrevem dados em memória e excluem API. A implementação posterior incorporou **API mockada json-server**; a rubrica atual fornecida para entrega a exige. A operação em memória descreve somente o demo publicado no Pages. Os arquivos de GPTI foram preservados como documentos do grupo de gestão; não se presume aprovação formal de mudança do plano.

Bootstrap entrou em 0d6897a e foi substituído por Tailwind em ebec85b. Os HTML antigos são referências estáticas, não o aplicativo React executado por index.html. Esta revisão atualiza os documentos de entrega e as referências correntes, preservando o histórico.

## Material para a avaliação

Entregar os cinco documentos principais em .md, este relatório, o histórico de contribuições, a tabela de horas, o registro de verificação e mock/seed.json. O repositório contém o código e o histórico real. O arquivo ZIP de anexos é uma conveniência e não substitui o link do GitHub para avaliar commits.
