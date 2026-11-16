# Status Report 3 — AutoCUIDA

**Data de status:** 16/11/2026 · **Período coberto:** 03/11/2026 a 16/11/2026 (EVM acumulado desde 23/09/2026; engajamento, comunicações e riscos medidos contra o Plano §9, §10 e §12) · **Elaborado por:** GPTI Grupo H · **Patrocinador:** Prof. Diogo Silveira Mendonça

*Legenda:* `(est.)` = estimativa do trabalho que ainda falta (ETC), ainda não realizado; por definição, é sempre uma estimativa. Posições das partes: Desinformado = não recebeu o recado previsto; Resistente = recebeu e recusa; Neutro = recebeu e não age; Apoiador = faz a parte. Este relatório cobre a **execução** (o que foi feito no período) e o **monitoramento e controle** (desempenho contra a baseline, engajamento, comunicações, riscos, qualidade, mudanças, questões e decisões).

---

## Premissas e regras (o que mudou desde o SR2)

- **Baseline:** Plano do Projeto v1.2, Termo v1.2 e Dicionário da EAP (Entrega 1, BAC de 67,6 h: 45,0 h de desenvolvimento e 22,6 h de gestão). Regra de crédito **0/100**, com verificação por pessoa diferente de quem executou. O CR oficial da Entrega 1 cobre 30/09 a 06/10; as 8,5 h de 23/09 a 25/09 (pré-baseline) ficam em linha própria.
- **Todos os pacotes da Entrega 1 foram aprovados** (informado pelo grupo em 16/11): 1.1, 1.2, 2.1, 2.2, 3.1, 4.1, 5.1, 5.2, 6.1, 7.1, 7.2, 7.3 e 7.4. Cada um recebe 100% do VA.
- **CR-02 aprovado pelo professor, com o Marco 2 e as horas** (informado pelo grupo em 16/11). A baseline do Marco 2 é a da proposta do SR2: pacotes M2.1 a M2.5, **29,5 h** (referência de R$ 295,00). O BAC total do projeto passa a 97,1 h (67,6 + 29,5). A contingência de 16,2 h e a reserva de gerenciamento de 7,0 h seguem como no Plano.
- **Prazo do Marco 2:** o aceite é em **02/11/2026 às 18:30**, já vencido em 16/11 (14 dias). Por isso o VP do Marco 2 é de 29,5 h e o VA, de 0,0 h pela regra 0/100.
- **Horas da GPTI:** as estimativas do SR2 (23,0 h) e as 3,0 h deste relatório valem como **reais**: 26,0 h (Patrick 6,0; Hugo 5,0; Ronald 7,5; Rodrigo 3,0; Thiago 4,5), por decisão do grupo.
- **Evidências do período:** `git log` do repositório `YahataRD/AUTOCUIDA-PSW` (todas as branches) e as mensagens do grupo de 15/11. Rafael Yahata declarou que **não fez nada na semana** e que a última alteração dele foi em 31/10, porque aguarda as partes atribuídas aos outros desenvolvedores. Rafael Voigt declarou que registrou o módulo de autenticação e o cliente HTTP com Bearer e cache por usuário, em **cerca de 2 h**, e que ainda faltam itens. **Gabriel não tem commit nem mensagem** no período (0 h assumidas).
- **Rateio das 2,0 h do Voigt:** por tamanho dos commits. `14946cf` (back-end, 486 linhas) = 1,5 h em M2.3; `6277490` (front-end, 136 linhas adicionadas e 41 removidas) = 0,5 h em M2.5. O Voigt não registrou as horas em `mudancas/horas-dev.md` nem no `CHANGELOG.md` (última atualização em 31/10).
- **Trabalho de correção da Entrega 1:** o SR2 estimava 10,0 h para corrigir e verificar 2.1, 2.2, 7.1, 7.2, 7.3 e 7.4. Os pacotes foram aprovados, mas nenhum integrante declarou essas horas. O CR de desenvolvimento permanece **34,0 h**, e o efeito de eventual subapontamento está na sensibilidade da seção E (ISS-08).
- **Marco 2, VA:** nenhum pacote do Marco 2 foi verificado por pessoa diferente de quem o executou, então o VA do Marco 2 é 0 pela regra 0/100.
- **Faróis:** Escopo: verde = todos os pacotes verificados; amarelo = pendências sem critério descumprido; vermelho = critério descumprido ou trabalho fora da EAP sem mudança aprovada. Prazo e custo: vermelho quando o índice fica abaixo de 0,90 ou a projeção de estouro passa de 8,4 h. Engajamento: verde = todas as partes na posição planejada; amarelo = alguma abaixo, com ação que funcionou; vermelho = parte do caminho crítico abaixo e ação sem efeito. Comunicações: vermelho quando menos de 60% das comunicações planejadas têm envio e recebimento comprovados. Riscos: vermelho quando há risco de probabilidade e impacto altos sem resposta executada.
- **Engajamento, comunicações e riscos:** a posição planejada vem do Plano §9; a atual só vale com evidência (commit, mensagem, ata, documento). Sem prova, a célula diz isso. Partes e riscos novos entram com causa.

---

## A. Sumário Executivo e Dashboard

### Respostas às perguntas do controle

1. **O caminho crítico entrega o Marco 2 na data planejada?**
   **Não.** A Entrega 1 fechou: os 13 pacotes foram aprovados. O Marco 2 tem baseline aprovada, mas o prazo de 02/11 às 18:30 venceu há 14 dias com só M2.1 concluída (sem aceite). M2.3 (JWT) e M2.5 (cliente HTTP) foram iniciados em 15/11, mas estão parciais e sem integração. Faltam **19,0 h (est.)**. O caminho crítico é M2.2 (rotas de itens, serviços e alertas, sem dono ativo) → M2.4 (carga inicial) → M2.5 (integração e aceite), com M2.3 em paralelo. A data prevista vem desse caminho e da capacidade (seção D): cerca de 27/11 a 12 h/semana e cerca de 03/12 sem o Gabriel (8 h/semana). Não é projeção do IDP.

2. **O valor agregado mostra trabalho no ritmo e no custo planejados?**
   **No custo, sim; no prazo, não.** Entrega 1: IDP = 67,6 ÷ 67,6 = **1,00** e IDC = 67,6 ÷ 60,0 = **1,13** (desenvolvimento: IDC = 45,0 ÷ 34,0 = **1,32**). Com o Marco 2 na baseline (BAC de 97,1 h): IDP = 67,6 ÷ 97,1 = **0,70** e IDC = 67,6 ÷ 70,5 = **0,96**. O IDP cai porque os 29,5 h do Marco 2 estavam previstos até 02/11 e não têm VA.

3. **As horas que faltam cabem na capacidade restante?**
   Restam **19,0 h** de desenvolvimento (est.), todas do Marco 2. A 12 h/semana são 1,6 semana (cerca de 27/11); sem o Gabriel (8 h/semana), 2,4 semanas (cerca de 03/12); a 6 h/semana, 3,2 semanas (cerca de 08/12). No ritmo observado no período (2,0 h em 2 semanas, 1,0 h/semana), seriam 19 semanas. Cabe se o PSW voltar a trabalhar de forma contínua e a M2.2 ganhar dono (seção F).

4. **As partes estão na posição planejada?**
   **Em parte.** O patrocinador está como Apoiador (aprovou a Entrega 1 e o CR-02). Na PSW, o Rafael concentra 84,0% das horas dos desenvolvedores e declarou 0 h na semana, o Voigt aparece com cerca de 2 h e o Gabriel não respondeu. A GPTI entregou os relatórios, mas sem apontamento real de horas e sem ata do encontro diário (seção G.1).

5. **O recado chegou a quem devia?**
   **Em parte.** Só 2 das 5 comunicações do Plano §10 têm envio e recebimento comprovados: os artefatos da AV1 e o status ao patrocinador (SR1, SR2 e CR-02, aprovados). O status diário da PSW e o encontro da gerência não têm registro desde 06/10 (seção G.2).

6. **A resposta ocorreu e reduziu o risco?**
   **Em parte.** R2 e R6 tiveram resposta executada com artefato; R3 teve resposta, e o pacote 2.1 foi aprovado com 5 dias de atraso. Os riscos novos R9 a R13 ainda não têm resposta executada. A contingência de 16,2 h segue sem consumo realizado (seção G.3).

**Resposta ao objetivo (prazo e orçamento originais):** o Marco 2 **cabe no orçamento** e **não cabe no prazo**. Orçamento: o CR total é de 79,0 h (60,0 h do projeto + 10,5 h do Marco 2 + 8,5 h pré-baseline), e a projeção (ENT) é de **99,0 h** contra o BAC aprovado de 97,1 h (+1,9 h, abaixo da tolerância de 8,4 h) e contra 113,3 h com a contingência (folga de 14,3 h). Prazo: o prazo aprovado (02/11) venceu, e a nova data depende da decisão D1.

### Situação geral

| Dimensão | Farol | Indicador | Justificativa |
| :--- | :--- | :--- | :--- |
| **Escopo** | **AMARELO** | Entrega 1: 13 de 13 pacotes verificados (100%); Marco 2: 0 de 5 verificados | Entrega 1 completa. No Marco 2, M2.1 está implementada sem aceite, M2.3 e M2.5 estão parciais e M2.2 e M2.4 não foram iniciadas. |
| **Prazo** | **VERMELHO** | IDP projeto 0,70 (Entrega 1: 1,00); Marco 2 com 14 dias de atraso | Abaixo de 0,90. M2.2 está sem dono ativo (Gabriel sem registro há 41 dias). |
| **Custo** | **VERDE** | IDC projeto 0,96 (Entrega 1: 1,13); ENT 99,0 h contra BAC 97,1 h (+1,9 h) | Índice acima de 0,90 e estouro projetado abaixo de 8,4 h. A projeção depende do ETC de 19,0 h (est.) do Marco 2. |
| **Engajamento** | **VERMELHO** | 4 de 6 partes de gerenciar de perto abaixo da posição planejada | Gabriel, Voigt, GPTI e o responsável pelo Atlas. O Gabriel está no caminho crítico (M2.2) e o pedido coletivo de horas não teve efeito. |
| **Comunicações** | **VERMELHO** | 2 de 5 comunicações planejadas comprovadas (40%) | Status diário da PSW e encontro da gerência sem registro desde 06/10; demonstração aos proprietários sem prova. |
| **Riscos** | **VERMELHO** | 5 riscos novos sem resposta executada (R9 a R13); 2 com P alta e I alta (R9 e R12) | R9 (M2.2 sem dono) e R12 (prazo do Marco 2 vencido). Contingência de 16,2 h sem consumo realizado. |

### Tendência (SR2 → SR3)

| Indicador | SR2 (02/11) | SR3 (16/11) | Leitura |
| :--- | :--- | :--- | :--- |
| Pacotes da Entrega 1 verificados | 6 de 13 | 13 de 13 | Fechada |
| VA do projeto, Entrega 1 | 35,3 h | 67,6 h | +32,3 h |
| CR do projeto | 57,0 h (est.) | 60,0 h | +3,0 h (GPTI) |
| IDP, Entrega 1 | 0,52 | 1,00 | Recuperado |
| IDC, Entrega 1 | 0,62 | 1,13 | Recuperado |
| Horas do PSW apontadas | 51,0 h | 53,0 h | +2,0 h (Voigt) |
| Marco 2: feito / restante | 8,5 h / 21,0 h | 10,5 h / 19,0 h | Avanço de 2,0 h |
| Orçamento | Déficit projetado: 105,5 h contra 83,8 h | ENT 99,0 h contra BAC aprovado de 97,1 h | Marco 2 incorporado à baseline (CR-02) |

---

## B. Execução: trabalho realizado no período (03/11 a 16/11)

| Data | Quem | O que foi feito | Evidência | Horas | Pacote |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 15/11 | Rafael Voigt | Módulo de autenticação: cadastro, login e middleware JWT, configuração, tratamento de erros, 16 casos de teste novos e README do contrato | `14946cf`, branch `feat/auth-frontend-integration`, 12 arquivos, +486 linhas | 1,5 (rateio) | M2.3 |
| 15/11 | Rafael Voigt | Cliente HTTP com Bearer e cache por usuário no front-end (`http.js`, `authClient.js`, `authSchemas.js`, `api.js`, `queries.js`) | `6277490`, 5 arquivos, +136 −41 | 0,5 (rateio) | M2.5 |
| — | Rafael Yahata | Sem atividade na semana; aguarda as partes atribuídas aos outros desenvolvedores. Última alteração em 31/10 | Mensagem de 15/11 | 0,0 | M2.3, M2.4 |
| — | Gabriel Felipe | Sem commit e sem mensagem desde 06/10 | `git log` | 0,0 (assumida) | M2.2 |
| 02/11 a 16/11 | GPTI | Status Report 2 entregue em 02/11 (`ad927cb`); aprovação dos pacotes da Entrega 1 e do Marco 2 pelo professor; este relatório consolidado | `docs/GPTI/`; informado pelo grupo | 3,0 | 1.2 |

### Entregas e qualidade da execução

- **Testes:** em 31/10 havia 93 testes aprovados (45 front-end, 11 mock e 37 back-end), registrados pelo Rafael. A branch do Voigt acrescenta 16 casos (11 em `auth.http.test.js` e 5 em `authConfig.test.js`, contados no código). A GPTI **não executou** os testes: o total de 109 é projeção, não resultado.
- **A autenticação ainda não é utilizável na `main`.** A branch `feat/auth-frontend-integration` não foi mesclada; o `app.js` não monta o módulo; o `package.json` do back-end não declara `bcrypt`, `jsonwebtoken`, `passport`, `passport-jwt` nem `supertest` (o README do módulo manda instalá-las à mão), de modo que um clone limpo com `npm ci` não roda o código novo. Situação conforme o `git log` até 15/11; o grupo não registrou correção posterior.
- **Bloqueio do Rafael parcialmente removido:** a mensagem dele (15/11, 12h47) é anterior ao commit do middleware (15/11, 21h42). A partir daí, a integração das rotas de veículos ao JWT pode ser feita. A carga inicial do banco continua dependendo de M2.2.
- **Registro de esforço:** `mudancas/horas-dev.md` e `CHANGELOG.md` não foram atualizados desde 31/10, ao contrário da regra do repositório (Plano §8).
- **Plausibilidade das horas do Voigt:** 622 linhas e 16 testes em cerca de 2 h sugerem apoio de IA ou código preparado antes do período. A estimativa de 2,0 h é a declarada pelo Voigt e foi mantida.

### Comunicação e partes interessadas (execução)

| Parte | O que ocorreu no período | Situação |
| :--- | :--- | :--- |
| Professor (patrocinador) | SR2 entregue em 02/11. Pacotes da Entrega 1 e Marco 2 (CR-02) aprovados, conforme o grupo | Atendida; nova data do Marco 2 em aberto (CR-03) |
| PSW (Rafael, Gabriel, Voigt) | Dois relatos em 15/11 (Rafael e Voigt); Gabriel sem resposta | Comunicação irregular (ISS-09) |
| GPTI | Consolidação do SR3; horas assumidas como reais | Atendida |

---

## C. Evolução do Escopo desde o Status Report 2 (02/11/2026)

| Situação | Pacotes | Observação |
| :--- | :--- | :--- |
| **Verificados e aprovados** | 1.1, 1.2, 2.1, 2.2, 3.1, 4.1, 5.1, 5.2, 6.1, 7.1, 7.2, 7.3, 7.4 | Entrega 1 completa. No SR2 eram 6; entraram 1.2, 2.1, 2.2, 7.1, 7.2, 7.3 e 7.4. |
| **Critério não atendido (reabertos)** | Nenhum | 2.1 e 7.1 foram reverificados e aprovados. |
| **Sem verificação do critério** | Nenhum | 2.2, 7.2, 7.3 e 7.4 também foram aprovados. |
| **Marco 2 aprovado, implementado, sem aceite** | M2.1 (veículos) | 31/10, 8,5 h. |
| **Marco 2: parcial, sem integração** | M2.3 (cadastro, login, middleware JWT) e M2.5 (cliente HTTP com Bearer) | 15/11, branch não mesclada, dependências não declaradas. |
| **Marco 2: não iniciados** | M2.2 (itens, serviços e alertas no back-end), M2.4 (carga inicial) | Sem dono ativo (M2.2); M2.4 depende de M2.2 e M2.3. |

---

## D. Cronograma e Caminho Crítico

Datas reais = primeiro e último commit com evidência do pacote. "Atraso" é o fim real do código menos o fim planejado v1.1.

| ID | Atividade | Responsável | Fim plan. v1.1 | Fim real (código) | Atraso | Situação |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1** | Planejamento e artefatos AV1 | Patrick (A), GPTI | 04/10 | 05/10 | +1 d | Verificado e aceito |
| **1.2** | Monitoramento e mudanças | Patrick (A), Ronald, Rodrigo, Thiago | 06/10 | em curso | — | Aprovado; SR2 e SR3 entregues |
| **2.1** | Kit visual, tema e painel | Voigt | 30/09 | 05/10 | +5 d | Aprovado |
| **2.2** | Dados por veículo, carga e URLs | Rafael Yahata | 30/09 | 04/10 | +4 d | Aprovado |
| **3.1** | Veículos e odômetro | Rafael Yahata | 01/10 | 05/10 | +4 d | Aprovado |
| **4.1** | Itens e regras | Gabriel | 01/10 | 05/10 | +4 d | Aprovado |
| **5.1** | Serviços | Voigt | 01/10 | 06/10 | +5 d | Aprovado |
| **6.1** | Alertas, baixa e filtros | Gabriel | 02/10 | 06/10 | +4 d | Aprovado |
| **5.2** | Custos integrados | Gabriel | 02/10 | 05/10 | +3 d | Aprovado |
| **7.1** | Responsividade e acessibilidade | Hugo (A), PSW | 03/10 | 06/10 | +3 d | Aprovado |
| **7.2** | Roteiro T01–T23 | Hugo (A), PSW | 04/10 | 06/10 | +2 d | Aprovado |
| **7.3** | Correções e ensaio | Patrick (A), PSW | 05/10 | 06/10 | +1 d | Aprovado |
| **7.4** | Conferência e entrega | Patrick (A), PSW | 06/10 | 06/10 | 0 d | Aprovado |

**Atividades do Marco 2** *(baseline aprovada: CR-02; prazo: 02/11/2026 às 18:30, vencido)*:

| ID | Atividade | Responsável | Planejado (h) | Horas feitas | Horas restantes (est.) | Situação |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **M2.1** | Base Express, MongoDB, modelo, validações, repositório e rotas de veículos | Rafael Yahata | 8,5 | 8,5 | 0,0 | Implementada em 31/10, sem aceite |
| **M2.2** | Rotas, persistência e validações de itens, serviços e alertas | Gabriel e Voigt (a definir, D3) | 8,0 | 0,0 | 8,0 | Não iniciada |
| **M2.3** | Autenticação JWT e integração às rotas | Voigt (módulo) e Rafael (integração às rotas de veículos) | 4,0 | 1,5 | 2,5 | Módulo implementado em 15/11, sem integração |
| **M2.4** | Carga inicial do banco com vínculos entre usuários, veículos, itens e serviços | PSW (a definir) | 3,0 | 0,0 | 3,0 | Não iniciada |
| **M2.5** | Integração do front-end com a API e aceite | PSW; verificação de Hugo | 6,0 | 0,5 | 5,5 | Cliente HTTP iniciado em 15/11 |
| | **Total do Marco 2** | | **29,5** | **10,5** | **19,0** | |

**Caminho crítico atualizado**

- **Entrega 1:** 2.1/2.2 → 4.1/5.1 → 6.1/5.2 → 7.1 → 7.2 → 7.3 → 7.4. Cadeia fechada, com todos os pacotes aprovados. O fim do código ficou de 0 a 5 dias depois do cronograma v1.1, e a aprovação ocorreu depois de 06/10.
- **Marco 2:** M2.2 → M2.4 → M2.5, com M2.3 em paralelo. O gargalo é M2.2 (8,0 h, sem dono ativo): sem ela, M2.4 não pode popular itens e serviços. M2.3 passou a ser caminho curto, porque o middleware já existe (15/11) e falta só ligar às rotas.

**Previsão de conclusão do Marco 2 (a partir de 16/11, só pelo trabalho restante e pela capacidade):**

| Escopo restante | 12 h/semana | 8 h/semana (sem o Gabriel) | 6 h/semana | Ritmo observado (1,0 h/semana) |
| :--- | :--- | :--- | :--- | :--- |
| Marco 2 (19,0 h) | 1,6 sem, cerca de 27/11 | 2,4 sem, cerca de 03/12 | 3,2 sem, cerca de 08/12 | 19 semanas |

O prazo do Marco 2 é 02/11 às 18:30, já vencido. A data final da disciplina não foi informada ao grupo e decide qual coluna é aceitável (D1).

---

## E. Análise de Valor Agregado (EVM)

### Por atividade

| ID / Atividade | Planejado (h) | CR (h) | Orçamento restante, BAC − VA (h) | ETC (est.) (h) | Regra de crédito | VA (h) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1 Planejamento AV1** | 14,3 | 15,5 | 0,0 | 0,0 | 0/100, aprovado | 14,3 |
| **1.2 Monitoramento** | 8,3 | 10,5 | 0,0 | 1,0 | 0/100, aprovado | 8,3 |
| **2.1 Kit e painel** | 7,0 | 3,0 | 0,0 | 0,0 | 0/100, aprovado | 7,0 |
| **2.2 Dados e URLs** | 5,0 | 9,5 | 0,0 | 0,0 | 0/100, aprovado | 5,0 |
| **3.1 + 4.1 + 5.1 + 5.2** | 17,5 | 7,0 | 0,0 | 0,0 | 0/100, aprovados | 17,5 |
| **6.1 Alertas** | 3,5 | 3,5 | 0,0 | 0,0 | 0/100, aprovado | 3,5 |
| **7.1 Responsividade** | 4,5 | 5,0 | 0,0 | 0,0 | 0/100, aprovado | 4,5 |
| **7.2 Roteiro de aceite** | 3,5 | 2,0 | 0,0 | 0,0 | 0/100, aprovado | 3,5 |
| **7.3 Correções e ensaio** | 2,5 | 2,5 | 0,0 | 0,0 | 0/100, aprovado | 2,5 |
| **7.4 Conferência e entrega** | 1,5 | 1,5 | 0,0 | 0,0 | 0/100, aprovado | 1,5 |
| **Desenvolvimento** | **45,0** | **34,0** | **0,0** | **0,0** | | **45,0** |
| **Gestão (1.1 + 1.2)** | **22,6** | **26,0** | **0,0** | **1,0** | | **22,6** |
| **Entrega 1** | **67,6** | **60,0** | **0,0** | **1,0** | | **67,6** |
| **M2.1 Base e veículos** | 8,5 | 8,5 | 8,5 | 0,0 | 0/100, sem aceite | 0,0 |
| **M2.2 Itens, serviços e alertas** | 8,0 | 0,0 | 8,0 | 8,0 | 0/100, não iniciada | 0,0 |
| **M2.3 JWT** | 4,0 | 1,5 | 4,0 | 2,5 | 0/100, parcial | 0,0 |
| **M2.4 Carga inicial** | 3,0 | 0,0 | 3,0 | 3,0 | 0/100, não iniciada | 0,0 |
| **M2.5 Integração e aceite** | 6,0 | 0,5 | 6,0 | 5,5 | 0/100, parcial | 0,0 |
| **Marco 2** | **29,5** | **10,5** | **29,5** | **19,0** | | **0,0** |
| **Projeto (Entrega 1 + Marco 2)** | **97,1** | **70,5** | **29,5** | **20,0** | | **67,6** |

*Nota:* "Orçamento restante" é BAC − VA, o teto do que ainda não foi ganho, e não uma estimativa do que falta. O ETC é a estimativa preliminar da GPTI do trabalho que falta (1,0 h de monitoramento em 1.2 e 19,0 h do Marco 2), a validar pelos donos (A-14). **Fora da tabela:** 8,5 h pré-baseline (ativo de processo).

### Memória de cálculo do CR

| Componente | Cálculo | Valor |
| :--- | :--- | :--- |
| CR oficial da Entrega 1 (desenvolvimento) | 3,0 + 9,5 + 7,0 + 3,5 + 5,0 + 2,0 + 2,5 + 1,5 (commits em `mudancas/horas-dev.md`, como no SR2) | 34,0 h |
| Gestão (GPTI, assumida como real) | 15,5 (1.1) + 10,5 (1.2: 7,5 do SR2 + 3,0 do SR3) | 26,0 h |
| **CR da Entrega 1** | 34,0 + 26,0 | **60,0 h** |
| Marco 2 até 31/10 | `c86a9b1` 1,0 + `d3c7d0f` 1,5 + `cba6a02` 1,5 + `902f82d` 2,0 + `47084bc` 1,5 + `50e654a` 1,0 | 8,5 h |
| Marco 2, período do SR3 | Voigt declarou 2,0 h: `14946cf` 1,5 + `6277490` 0,5 | 2,0 h |
| **CR do Marco 2** | 8,5 + 2,0 | **10,5 h** |
| **CR do projeto (Entrega 1 + Marco 2)** | 60,0 + 10,5 | **70,5 h** |
| Pré-baseline (23/09 a 25/09) | `b59f1ab` 6,0 + commits de documentação 2,5 | 8,5 h |
| **CR total, incluindo pré-baseline** | 70,5 + 8,5 | **79,0 h** |

### Horas da GPTI

| Pessoa | 1.1 | 1.2 | Total | Base da alocação |
| :--- | :--- | :--- | :--- | :--- |
| **Patrick Cruz** | 4,0 | 2,0 | 6,0 | Termo; Plano §1–3 e §13–15; entrega e status |
| **Hugo Lima** | 3,5 | 1,5 | 5,0 | Plano §4–6; Dicionário da EAP |
| **Ronald Teixeira** | 4,5 | 3,0 | 7,5 | Business Case; Plano §7–8; cronograma e horas |
| **Rodrigo Americo** | 1,5 | 1,5 | 3,0 | Plano §9–10 |
| **Thiago Souza** | 2,0 | 2,5 | 4,5 | Plano §11–12; consolidação do SR3 |
| **Total** | **15,5** | **10,5** | **26,0** | Valem como reais por decisão do grupo; 1.2 passa do orçado de 8,3 h em 2,2 h |

### Totais, variações e índices

| Medida | Cálculo | Entrega 1 | Projeto (com Marco 2) |
| :--- | :--- | :--- | :--- |
| **VP** | Entrega 1: tudo previsto até 06/10; Marco 2: tudo previsto até 02/11 | 67,6 h | 67,6 + 29,5 = 97,1 h |
| **VA** | Soma dos pacotes aprovados | 67,6 h | 67,6 + 0,0 = 67,6 h |
| **CR** | Memória de cálculo | 60,0 h | 60,0 + 10,5 = 70,5 h |

| Indicador | Fórmula | Entrega 1 | Projeto (com Marco 2) |
| :--- | :--- | :--- | :--- |
| **Variação de prazos** | VPr = VA − VP | 67,6 − 67,6 = 0,0 h | 67,6 − 97,1 = −29,5 h |
| **Variação de custos** | VC = VA − CR | 67,6 − 60,0 = +7,6 h | 67,6 − 70,5 = −2,9 h |
| **IDP** | VA ÷ VP | 67,6 ÷ 67,6 = **1,00** | 67,6 ÷ 97,1 = **0,70** |
| **IDC** | VA ÷ CR | 67,6 ÷ 60,0 = **1,13** | 67,6 ÷ 70,5 = **0,96** |

Desenvolvimento da Entrega 1: VA = 45,0 h, VP = 45,0 h, CR = 34,0 h; IDP = **1,00**; IDC = 45,0 ÷ 34,0 = **1,32**; VC = +11,0 h.
**Marco 2 isolado:** VP = 29,5 h, VA = 0,0 h, CR = 10,5 h, IDP = 0,00 e IDC = 0,00 pela regra 0/100.

### Sensibilidade

| Cenário | VA (h) | CR (h) | IDP | IDC |
| :--- | :--- | :--- | :--- | :--- |
| **Oficial** (acima) | 67,6 | 70,5 | 0,70 | 0,96 |
| M2.1 aceita (+8,5 h de VA) | 76,1 | 70,5 | 0,78 | 1,08 |
| 10,0 h de correção da Entrega 1 foram gastas e não apontadas (CR +10,0 h) | 67,6 | 80,5 | 0,70 | 0,84 |
| Inclui as 8,5 h pré-baseline no CR | 67,6 | 79,0 | 0,70 | 0,86 |

Duas das três variações de custo ficam abaixo de 0,90, então o resultado de custo depende de o CR estar completo (ISS-08). Só na Entrega 1, com as 10,0 h não apontadas: IDC desenvolvimento = 45,0 ÷ 44,0 = 1,02 e IDC da Entrega 1 = 67,6 ÷ 70,0 = 0,97.

### Previsão (BAC do projeto = 97,1 h)

| Premissa | Fórmula | EPT (h) | ENT (h) | VAC (h) |
| :--- | :--- | :--- | :--- | :--- |
| **1. O IDC atual se mantém** | ENT = BAC ÷ IDC = 97,1 ÷ 0,9589; EPT = ENT − CR | 30,8 | 101,3 | −4,2 |
| **2. Desvio pontual; o restante segue o orçamento (teto)** | ENT = CR + (BAC − VA) = 70,5 + 29,5 | 29,5 | 100,0 | −2,9 |
| **3. Estimativa preliminar da GPTI (adotada, a validar)** | ENT = CR + ETC = 70,5 + 20,0 | 20,0 | 90,5 | +6,6 |

A premissa 3 continua adotada: o ETC (1,0 h de gestão e 19,0 h do Marco 2) vem das estimativas do SR2, ajustadas pelo trabalho do Voigt. Incluindo as 8,5 h pré-baseline, o ENT da premissa 3 é 99,0 h (VAC de −1,9 h). Nas três premissas o estouro fica abaixo da tolerância de 8,4 h do Plano.

### Balanço de orçamento

| Item | Cálculo | Valor |
| :--- | :--- | :--- |
| BAC aprovado (Entrega 1 + Marco 2) | 67,6 + 29,5 | 97,1 h |
| BAC com contingência | 97,1 + 16,2 | 113,3 h |
| Orçamento autorizado | 113,3 + 7,0 (reserva de gerenciamento, só o patrocinador libera) | 120,3 h |
| Horas consumidas (CR total) | 70,5 + 8,5 | 79,0 h |
| Horas por fazer (ETC) | 1,0 (gestão) + 19,0 (Marco 2) | 20,0 h |
| **Projeção total (ENT)** | 79,0 + 20,0 | **99,0 h** |
| Desvio sobre o BAC aprovado | 99,0 − 97,1 | +1,9 h |
| Folga sobre o BAC com contingência | 113,3 − 99,0 | 14,3 h |
| Folga sobre o orçamento autorizado | 120,3 − 99,0 | 21,3 h |

Sem as 8,5 h pré-baseline, a projeção é de 90,5 h (6,6 h abaixo do BAC aprovado).

---

## F. Gestão de Recursos e Capacidade

| Pessoa | Equipe e papel | Planejado E1 (h) | E1 apontado (h) | Pré-baseline (h) | Marco 2 (h) | Total (h) | Desvio E1 | Situação |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Rafael Duarte Yahata** | PSW, dados e veículos | 15,0 | 27,5 | 8,5 | 8,5 | 44,5 | +12,5 | 0 h no período, declarado por ele |
| **Gabriel Felipe Martins da Silva** | PSW, itens, alertas e custos | 15,0 | 4,5 | 0,0 | 0,0 | 4,5 | −10,5 | Sem commit nem resposta; confirmar |
| **Rafael Voigt Villas Boas** | PSW, kit visual e serviços | 15,0 | 2,0 | 0,0 | 2,0 | 4,0 | −13,0 | 2,0 h declaradas em 15/11 |
| **Patrick Cruz Azevedo** | GPTI, GP | 4,5 | 6,0 | — | — | 6,0 | +1,5 | Assumida como real |
| **Hugo Lima de A. A. Aguiar** | GPTI, escopo e qualidade | 4,5 | 5,0 | — | — | 5,0 | +0,5 | Assumida como real |
| **Ronald Teixeira de Assis** | GPTI, cronograma e finanças | 4,5 | 7,5 | — | — | 7,5 | +3,0 | Assumida como real |
| **Rodrigo Americo N. D'Icarahy** | GPTI, comunicação | 4,5 | 3,0 | — | — | 3,0 | −1,5 | Assumida como real |
| **Thiago Souza da Silva** | GPTI, riscos e recursos | 4,5 | 4,5 | — | — | 4,5 | 0,0 | Assumida como real |
| **Total** | | **67,6** | **60,0** | **8,5** | **10,5** | **79,0** | **−7,6** | |

Planejado: Plano §7 (45,0 h ÷ 3 e 22,6 h ÷ 5, arredondado). As horas da GPTI cobrem os pacotes 1.1 e 1.2 até 16/11. O Rafael responde por 80,9% do CR da Entrega 1 (27,5 de 34,0 h), por 84,0% das horas do PSW (44,5 de 53,0 h) e por 56,3% do total apontado (44,5 de 79,0 h).

### Balanço de capacidade restante

| Item | Cálculo | Valor |
| :--- | :--- | :--- |
| Horas restantes, Entrega 1 | Todos os pacotes aprovados | 0,0 h |
| Horas restantes, Marco 2 | M2.2 + M2.3 + M2.4 + M2.5 = 8,0 + 2,5 + 3,0 + 5,5 | 19,0 h (est.) |
| Disponibilidade, premissa da GPTI | 4 h por semana × 3 desenvolvedores | 12 h/semana (premissa da GPTI, não confirmada por pessoa) |
| Disponibilidade sem o Gabriel | 4 h por semana × 2 desenvolvedores | 8 h/semana |
| Ritmo observado no período | 2,0 h em 2 semanas (03/11 a 16/11), todas do Voigt | 1,0 h/semana |
| Ritmo observado desde 07/10 | 10,5 h em cerca de 5,7 semanas | 1,8 h/semana (cerca de 10 semanas para 19,0 h) |
| Referência do Plano | 3 desenvolvedores × 15 h em uma semana de entrega | 45 h/semana (≈ 0,4 semana) |

Os tempos são limites, não previsões: a referência de 45 h/semana vem de uma semana de entrega apertada e não é disponibilidade sustentada. As datas de cada cenário estão na seção D.

---

## G. Engajamento, Comunicações e Riscos

### G.1 Engajamento das partes interessadas (planejado × atual)

A posição planejada vem do Plano §9; a atual vem de evidência. Cada desvio vira ação com dono e data.

| Parte | Estratégia | Posição planejada | Posição atual | Evidência | Desvio → ação (dono, data) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Prof. Diogo (patrocinador e avaliador) | Gerenciar de perto | Apoiador: recebe o status, decide mudanças e aceita as entregas | Apoiador | Pacote 1.1 aceito (SR2, A-06); pacotes da Entrega 1 e CR-02 aprovados (informado pelo grupo em 16/11) | Sem desvio; enviar o CR-03 e o CR-04 com recomendação (Patrick, 18/11) |
| PSW, Rafael Yahata | Gerenciar de perto | Apoiador: status diário e horas no mesmo commit | Apoiador, com concentração e sem horas novas | 80,9% do CR da Entrega 1 e 84,0% das horas do PSW; 0 h declarado na semana (mensagem de 15/11, 12h47); última alteração em 31/10 | Registrar horas e commits em `mudancas/horas-dev.md` toda sexta (Rafael, 20/11) |
| PSW, Gabriel Felipe | Gerenciar de perto | Apoiador | Sem prova de posição | Sem resposta e sem commit desde 06/10; M2.2 depende dele | Conversa direta, em vez do pedido coletivo, para confirmar horas e a parte de M2.2 (Patrick e Hugo, 18/11) |
| PSW, Rafael Voigt | Gerenciar de perto | Apoiador | Apoiador parcial | Mensagem de 15/11 (23h32) e commits `14946cf` e `6277490`; horas fora de `horas-dev.md` e do `CHANGELOG.md` | Registrar as horas e dizer o que falta de M2.3 e M2.5 (Voigt, 18/11) |
| GPTI (GP e G2 a G5) | Gerenciar de perto | Apoiador: apontamento real de horas e encontro diário curto | Apoiador parcial | SR2 e SR3 entregues; horas assumidas como reais por decisão do grupo; sem ata do encontro diário | Abrir ata do encontro (Rodrigo, 17/11) |
| Proprietários de veículos | Manter informado | Informado: README e demonstração na entrega | Informado pelo README; sem prova de demonstração | README no repositório | Registrar a demonstração na entrega do Marco 2 (Hugo) |
| Gestores de frota e condutores | Monitorar | Sem contato; perfis pendentes | Sem mudança | O back-end do Marco 2 isola os dados por proprietário (CHANGELOG, 31/10); perfis seguem sem especificação | Registrar perfis como limitação do Marco 2 (Hugo, 23/11) |
| Oficinas mecânicas | Monitorar | Sem contato ativo | Sem mudança | Sem registro de contato | Nenhuma |
| Responsável pelo Atlas compartilhado (parte nova) | Gerenciar de perto | Neutro: sabe o que a carga inicial grava | Desinformado: ainda não identificado | O CHANGELOG cita o Atlas compartilhado em 3 etapas, sempre como sem alteração | Identificar o responsável e combinar a carga inicial de M2.4 (Patrick, 18/11) |

Estratégia que não moveu ninguém: o pedido coletivo de horas à PSW teve 2 respostas de 3. A GPTI troca a estratégia por conversa direta com cada dono de pacote (ISS-09).

### G.2 Comunicações (enviada × recebida)

| Comunicação (Plano §10) | Canal e dono | Enviada | Recebida por quem | Conteúdo conforme a estratégia | Falha → correção (dono, data) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Status por pacote e bloqueios, diário até 18h | Canal do grupo, Issues e PRs; PSW | Só em 31/10 (commits e CHANGELOG) e nas mensagens de 15/11; sem status diário depois de 06/10 | Sem registro | Não: o CHANGELOG registra entrega, não bloqueio | Ritmo diário não cumprido (ISS-12) → status até 18h nos dias úteis a partir de 17/11 (Rafael, Gabriel e Voigt) |
| Caminho crítico, riscos e horas (encontro da gerência) | Encontro curto; GP | Sem ata | Sem registro | Sem prova | Ata de 5 linhas em `docs/` a cada encontro (Rodrigo, 17/11) |
| Status resumido ao patrocinador, nos marcos e a cada mudança | E-mail ou aula, com link; GP | SR1 em 06/10; SR2 em 02/11; CR-02 | Sim: 1.1 aceito, Entrega 1 e CR-02 aprovados | Sim | Comunicar toda mudança em 1 dia útil (Patrick) |
| Artefatos da AV1 | Teams, link de `docs/av1`; GP | Sim, dentro do prazo de 05/10 às 18:30 | Sim: conferidos e aceitos pelo professor (A-06) | Sim | Nenhuma |
| Como usar e limitações | README e demonstração; PSW e GPTI | README no repositório; demonstração sem registro | Sem prova de recebimento | Parcial | Registrar a demonstração na entrega do Marco 2, com ata e lista de presença (Hugo) |

**Ruído e duplicidade:** o mesmo pedido de horas foi feito à PSW inteira e voltou com 2 respostas de 3; o Gabriel não respondeu. O texto serviu a três leitores diferentes sem adaptação.

**Mudança proposta para o Marco 2 (CR-04):** segunda-feira, síntese ao patrocinador com a data do Marco 2 e a situação de M2.1 a M2.5 (Patrick; 23/11 e 30/11); sexta-feira, incremento da semana da PSW, com horas (Rafael, Gabriel e Voigt; 20/11 e 27/11); a cada entrega, convite de aceite ao patrocinador com 2 dias de antecedência (Hugo); na semana da entrega, aviso aos proprietários sobre limitações (Hugo). Fora dessas datas, o silêncio é o plano.

### G.3 Riscos (atualização do registro do Plano §12)

| ID | Tipo | Situação em 16/11 | Resposta executada (artefato) | Efeito observado | Próxima ação (dono, data) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| R1 | Ameaça | Ocorreu em parte (06/10); encerrado: 2.2 aprovado | Contrato de dados em 2.2 (`f48f9a7`, 4,0 h) e correção de integridade das edições (`598b1a2`, 2,0 h) | Defeitos de integridade corrigidos | Reaproveitar o contrato de dados em M2.5 (Rafael, 20/11) |
| R2 | Ameaça | Ocorreu (calendário bissexto e percentual, 06/10); encerrado: 6.1 e 7.2 aprovados | Reescrita do cálculo com percentual real e data de calendário (`d6f0755` e `abe5ea8`, 3,5 h) | Reduziu o efeito: 6.1 e o roteiro 7.2 aprovados | Nenhuma |
| R3 | Ameaça | Ocorreu (2.1 terminou 5 dias depois do plano); encerrado com a aprovação de 2.1 | Kit decidido e migrado (Tailwind, `ebec85b`, 3,0 h) | Reduziu o efeito só em parte: 2.1 foi reaberto antes da aprovação | Lição aprendida |
| R4 | Ameaça | Aberto: branch do Voigt sem mesclar; sem conflito evidenciado | Sem prova de branch por pacote; `0d6897a` (4,5 h) cobre 3 pacotes em um commit | Nenhum conflito de merge registrado | Commits por pacote e PR curto no Marco 2 (Patrick, 18/11) |
| R5 | Ameaça | Reduzido: 7.4 aprovado; o código novo do back-end ainda não passou por clone limpo | Instalação limpa com `npm ci` e builds (CHANGELOG, 31/10) | Instalação passou; novo gatilho: dependências de autenticação fora do `package.json` | Testar clone limpo com as dependências novas (A-08) |
| R6 | Ameaça | Reduzido: Voigt tem 2 commits em 15/11; Gabriel sem commit desde 06/10 | Commit de revisão do Voigt (`0c66171`, 2,0 h), conforme a contingência | Voigt passou a ter commit; Gabriel não | Ver R9 e ISS-09 |
| R7 | Ameaça | Encerrado: Entrega 1 e Marco 2 aprovados | Aprovação do professor | Critério do patrocinador conhecido | Nenhuma |
| R8 | Oportunidade | Não realizada | Tailwind não trouxe formulário, diálogo ou gráfico prontos; os formulários vieram de React Hook Form e Zod | Sem folga | Encerrar |
| **R9** (novo) | Ameaça | Ocorreu; P alta, I alta. Causa: Gabriel sem resposta há 41 dias → evento: M2.2 (8,0 h) sem dono ativo → efeito: M2.4 e M2.5 bloqueadas | Resposta planejada: mitigar, redistribuindo M2.2 (D3). Ainda sem resposta executada | Nenhum | Redistribuir M2.2 (Patrick, 18/11) |
| **R10** (novo) | Ameaça | Aberto; P média, I média. Causa: ETC ainda estimado → evento: ENT de 99,0 h contra BAC de 97,1 h → efeito: estouro do orçamento do Marco 2 | Resposta planejada: mitigar. Ainda sem resposta executada | Nenhum | Validar o ETC com os donos (A-14) |
| **R11** (novo) | Ameaça | Ocorreu; P média, I média. Causa: módulo de autenticação sem mesclagem, dependências não declaradas e horas não registradas → efeito: M2.3 e M2.5 não integram | Resposta planejada: mitigar. Ainda sem resposta executada | Nenhum | Voigt declara dependências e abre PR; Hugo verifica (A-08) |
| **R12** (novo) | Ameaça | Ocorreu; P alta, I alta. Causa: Marco 2 iniciado com M2.2 sem dono e ritmo de 1,0 a 1,8 h/semana → evento: prazo de 02/11 às 18:30 vencido → efeito: sem nova data aprovada | Resposta planejada: replanejar (CR-03 e D1). Ainda sem resposta executada | Nenhum | Enviar CR-03 e D1 ao professor (Patrick, 18/11) |
| **R13** (novo) | Ameaça | Aberto; P média, I alta. Causa: M2.4 sem dono e Atlas compartilhado sem responsável identificado → evento: carga inicial atrasa → efeito: M2.5 bloqueada | Resposta planejada: mitigar. Ainda sem resposta executada | Nenhum | Nomear o dono de M2.4 e o responsável pelo Atlas (Patrick, 18/11) |

### G.4 Reservas

| Reserva | Previsto | Usado | Evento nomeado |
| :--- | :--- | :--- | :--- |
| Contingência de custo | 16,2 h | 0,0 h realizado; 1,9 h na projeção | A projeção (ENT de 99,0 h contra BAC de 97,1 h, com as 8,5 h pré-baseline) consome 1,9 h; saldo de 14,3 h |
| Reserva de prazo (7.3) | do Plano | Usada | 7.3 rodou em 05 e 06/10 para absorver o atraso de 2.1 (R3) e as correções de 6.1 (R2) |
| Reserva de gerenciamento | 7,0 h | 0,0 h | Só o patrocinador libera; nenhum evento pediu |

Atraso sem nome no registro não usa a contingência: o atraso de 0 a 5 dias da Entrega 1 está na ISS-07, com R2 e R3 como causas.

**O conjunto ainda entrega o Marco 2 no prazo?** Não: o prazo de 02/11 venceu, e a nova data depende da disponibilidade (12 h/semana: cerca de 27/11; 8 h/semana: cerca de 03/12). R9, R12 e R13 puxam o mesmo caminho (M2.2 → M2.4 → M2.5); a decisão é do patrocinador (D1).

---

## H. Controle: Registros e Ações

### Registro de Questões

| ID | Descrição | Dono | Data limite | Impacto | Situação |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ISS-01** | Apontamento por aluno e atividade incompleto: horas do PSW reconstituídas por commit; horas da GPTI assumidas como reais por decisão do grupo. | Ronald Teixeira / Rafael Yahata | 20/11 | Custo | Em tratamento (PSW) |
| **ISS-02** | Pacotes sem verificação ou com critério não atendido (1.2, 2.1, 2.2, 7.1, 7.2, 7.3, 7.4). | Hugo Lima | 09/11 | Escopo e prazo | **Fechada** em 16/11: 13 de 13 pacotes aprovados |
| **ISS-03** | Custo: IDC 0,62 e VC −13,0 h (SR2). | Ronald Teixeira | 06/11 | Custo | **Fechada**: IDC 1,32 (desenvolvimento) e 0,96 (projeto) |
| **ISS-04** | Pessoas sem horas apontadas: Gabriel (0 h e sem resposta no período) e Rafael (0 h declarado). | Thiago Souza | 18/11 | Custo e prazo | Aberta |
| **ISS-05** | Marco 2 com prazo vencido (02/11 às 18:30), só M2.1 concluída (sem aceite) e M2.3 e M2.5 parciais. | Patrick Cruz | 18/11 | Prazo | Aberta; vencida há 14 dias |
| **ISS-06** | Concentração de esforço: Rafael com 80,9% do CR da Entrega 1 e 84,0% das horas do PSW. | Patrick Cruz | 23/11 | Prazo e risco | Aberta |
| **ISS-07** | Atraso no caminho crítico da Entrega 1: pacotes terminaram de 0 a 5 dias depois do v1.1. | Patrick Cruz | 23/11 | Prazo | **Fechada**: pacotes aprovados; lição aprendida |
| **ISS-08** | Possível subapontamento do CR: 3.1 a 5.2 com 7,0 h contra 17,5 h planejadas; 10,0 h de correção de 2.1, 2.2, 7.1, 7.2, 7.3 e 7.4 estimadas no SR2 e não apontadas. | Ronald Teixeira, com os autores | 20/11 | Custo e previsão | Aberta |
| **ISS-09** | Dependência cruzada parando o caminho crítico: Rafael aguarda as outras frentes, e Gabriel não responde nem commita desde 06/10. | Patrick Cruz | 18/11 | Prazo | Aberta |
| **ISS-10** | Código de autenticação não integrado: branch sem mesclar, `app.js` sem o módulo, dependências fora do `package.json`, 16 testes novos não executados pela GPTI e horas fora de `horas-dev.md` e do `CHANGELOG`. | Rafael Voigt (PSW) / Hugo Lima (verificação) | 20/11 | Escopo, custo e qualidade | Aberta |
| **ISS-11** | Orçamento: déficit de 25,2 h sobre 83,8 h (Marco 2 fora da baseline). | Ronald Teixeira | 20/11 | Custo | **Fechada**: CR-02 aprovado; ENT 99,0 h contra BAC 97,1 h |
| **ISS-12** | Status diário da PSW e encontro da gerência sem registro desde 06/10 (comunicações 1 e 2 do Plano §10). | Rodrigo Americo | 17/11 | Prazo e risco | Aberta |
| **ISS-13** | M2.4 (carga inicial) sem dono e responsável pelo Atlas compartilhado não identificado. | Patrick Cruz | 18/11 | Prazo | Aberta |
| **ISS-14** | Versão entregue: o SR1 cita o hash `8133fd6` com 56 testes, mas o `8133fd6` tinha 47 testes (37 de front-end e 10 HTTP) e os 56 aparecem depois de `abe5ea8`. A verificação final (`0c66171`) é anterior a `d6f0755` e `abe5ea8`. | Hugo Lima | 20/11 | Escopo | Aberta; corrigir o registro de entrega |
| **ISS-15** | O commit `e87b48a` (02/10, 1,0 h) publica o app no GitHub Pages, algo que o Termo trata como entrega local e que não está no Dicionário. O GP decide: incorporar como mudança dentro da tolerância ou reverter. Se sair do CR da Entrega 1, o CR de desenvolvimento vai a 33,0 h e o IDC do desenvolvimento a 45,0 ÷ 33,0 = 1,36. | Patrick Cruz | 20/11 | Escopo e custo | Aberta |

### Registro de Mudanças

| ID | Descrição | Status | Impacto |
| :--- | :--- | :--- | :--- |
| **M-01** | Replanejamento do cronograma v1.0 para v1.1 (04/10), incorporado ao Plano v1.2. | Aprovada pelo patrocinador. | Prazo: recupera 4 dias, sem custo adicional. |
| **CR-02** | Início do Marco 2 (pacotes M2.1 a M2.5, 29,5 h, referência de R$ 295,00, prazo de 02/11 às 18:30), com 10,5 h já realizadas (8,5 h em 31/10 e 2,0 h em 15/11). | **Aprovada pelo professor** (informado pelo grupo em 16/11). Nova baseline do Marco 2. | Escopo: pacotes M2.1 a M2.5 entram na EAP. Custo: BAC do projeto passa de 67,6 h para 97,1 h. Prazo: 02/11 vencido. |
| **CR-03** (nova) | Replanejamento do prazo do Marco 2 (nova data). | **Pendente**; a enviar | Prazo: nova data entre 27/11 e 08/12 (seção D). Custo: sem alteração do BAC. |
| **CR-04** (nova) | Plano de engajamento e comunicações do Marco 2: parte nova (responsável pelo Atlas), cadência semanal (segunda: síntese; sexta: incremento da PSW; cada entrega: convite de aceite) e aviso aos proprietários na entrega. | **Pendente**; dentro da tolerância do GP (até 1 dia e 8,4 h); aplicar em 17/11 | Escopo, custo e prazo: sem alteração do BAC. |

### Decisões pedidas ao Patrocinador

| # | Decisão | Opções e efeito em horas |
| :---: | :--- | :--- |
| **D1** | Nova data do Marco 2 (o prazo de 02/11 às 18:30 venceu) | **(a)** Cerca de 27/11 (19,0 h a 12 h/semana).<br>**(b)** Cerca de 03/12 (19,0 h a 8 h/semana, sem o Gabriel).<br>**(c)** Cerca de 08/12 (19,0 h a 6 h/semana).<br>**(d)** Manter 02/11 e registrar o atraso: o IDP do projeto fica em 0,70 até a conclusão. |
| **D2** | Aceite da M2.1 (veículos, 8,5 h) | **(a)** Aceitar agora: VA do projeto passa a 76,1 h, IDP 0,78 e IDC 1,08.<br>**(b)** Aceitar junto com o Marco 2: VA permanece em 67,6 h, IDP 0,70 e IDC 0,96. |
| **D3** | Distribuição do trabalho no PSW (Gabriel sem resposta) | **(a)** Redistribuir M2.2 (8,0 h) entre Rafael e Voigt: capacidade de 8 h/semana e Marco 2 em cerca de 03/12.<br>**(b)** Manter M2.2 com o Gabriel: sem retorno, o caminho crítico fica sem data (R9). |
| **D4** | Tolerância de custo do Marco 2 (ENT 99,0 h contra BAC 97,1 h) | **(a)** Manter o BAC de 97,1 h e acompanhar: o desvio de +1,9 h é menor que a tolerância de 8,4 h.<br>**(b)** Autorizar o uso da contingência (saldo de 14,3 h) se o IDC atual se mantiver: ENT de 101,3 h (+4,2 h). |

### Próximas Ações (corretivas e preventivas)

| Ação | Responsável | Prazo |
| :--- | :--- | :--- |
| **A-07** Confirmar com o Gabriel disponibilidade e escopo de M2.2; sem resposta, propor a D3(a) ao professor | Patrick Cruz, Rafael Yahata | 18/11/2026 |
| **A-08** Mesclar a branch `feat/auth-frontend-integration`: declarar as dependências no `package.json`, montar o módulo no `app.js`, rodar os 109 testes em clone limpo e abrir PR | Rafael Voigt | 20/11/2026 |
| **A-09** Integrar as rotas de veículos ao middleware JWT (M2.3) e preparar a carga inicial (M2.4) com M2.2 | Rafael Yahata | 23/11/2026 |
| **A-10** Registrar as horas em `mudancas/horas-dev.md` e no `CHANGELOG.md`, por pessoa e pacote, incluindo as correções da Entrega 1 | Rafael Voigt, Gabriel Felipe, Rafael Yahata | 18/11/2026 |
| **A-12** Enviar o CR-03 (nova data) ao professor e registrar a resposta | Patrick Cruz | 18/11/2026 |
| **A-14** Validar o ETC com os donos (19,0 h do Marco 2) e a disponibilidade semanal | Rafael Yahata, Rafael Voigt, Gabriel Felipe | 20/11/2026 |
| **A-15** Verificar M2.1 e os demais pacotes do Marco 2 por pessoa diferente de quem executou | Hugo Lima | 27/11/2026 |
| **A-16** Status diário até 18h (PSW para a gerência) e ata do encontro da gerência | Rafael Yahata, Gabriel Felipe, Rafael Voigt; Rodrigo Americo | a partir de 17/11/2026 |
| **A-17** Nomear o dono de M2.4 e identificar o responsável pelo Atlas compartilhado | Patrick Cruz | 18/11/2026 |
| **A-18** Decidir sobre o GitHub Pages (`e87b48a`) e corrigir o hash e o número de testes no registro de entrega (ISS-14 e ISS-15) | Patrick Cruz, Hugo Lima | 20/11/2026 |
| **A-19** Aplicar o CR-04 (plano de engajamento e comunicações) e enviar a primeira síntese semanal ao patrocinador, com a situação do Marco 2 | Patrick Cruz | 23/11/2026 |

### Situação das ações do SR2

| Ação | Prazo | Situação em 16/11 |
| :--- | :--- | :--- |
| A-01 Horas reais da GPTI | 06/11 | Concluída: estimativas assumidas como reais pelo grupo |
| A-02 Planilha única de horas e confirmação do PSW | 06/11 | Parcial: Rafael e Voigt informaram; Gabriel não → A-10 |
| A-03 Donos validam o ETC | 06/11 | Parcial: relatos de 15/11, sem validação formal → A-14 |
| A-04 Reverificação dos pacotes da Entrega 1 | 09/11 | Concluída: 13 de 13 pacotes aprovados |
| A-05 Confirmar prazo e enviar o CR-02 | antes do SR2 | Concluída: CR-02 aprovado; falta nova data (CR-03) |
| A-06 Verificação do pacote 1.1 | 02/11 | Concluída |

---

## I. Lições aprendidas até agora

1. **Registrar horas no momento do trabalho.** A reconstituição por commit e as estimativas da GPTI deixam o IDC sem precisão (ISS-01, ISS-08).
2. **Dependência entre frentes precisa de dono e de data.** O Rafael ficou parado pela espera das outras partes, e a M2.2 não tem responsável ativo (ISS-09).
3. **Verificar por pessoa independente, dentro do prazo do pacote.** Os pacotes só receberam crédito depois da aprovação, o que deixou o IDP em 0,52 no SR2.
4. **Aprovar a baseline antes de começar o escopo seguinte.** O Marco 2 começou antes da aprovação (CR-02) e só ganhou VA e orçamento depois.
5. **Código novo entra na `main` com dependências declaradas e testes executados.** O módulo de autenticação existe, mas não roda num clone limpo (ISS-10).
6. **Comunicação sem registro não conta como comunicação.** Sem status diário e sem ata, o grupo não consegue provar que o recado chegou nem agir sobre o desvio (ISS-12).

---

## Fontes

Status Report 1 (Marco 1, 06/10/2026) e Status Report 2 (02/11/2026); Plano do Projeto v1.2, Termo de Abertura v1.2 e Dicionário da EAP; `mudancas/horas-dev.md`, `mudancas/CHANGELOG.md`, `docs/cronograma.md` e `backend/src/modules/auth/README.md` (repositório `YahataRD/AUTOCUIDA-PSW`, `git log` de todas as branches até 15/11/2026, commits `14946cf` e `6277490` na branch `feat/auth-frontend-integration`); mensagens de Rafael Duarte Yahata (12h47) e Rafael Voigt Villas Boas (23h32) no grupo (15/11/2026, print anexado pelo grupo); informações do grupo de 16/11/2026 (pacotes aprovados, CR-02 aprovado e horas da GPTI como reais). Plano §9, §10 e §12 e aula 10 (engajamento, comunicações e resposta ao risco).
