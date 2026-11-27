# Relatório de Encerramento do Projeto — AutoCUIDA

*Pessoas identificadas pelas siglas do Plano do Projeto §11 (GP, G2–G5, D1–D3).*

## 1. Informações do projeto

| Campo | Informação |
| --- | --- |
| Projeto | AutoCUIDA — acompanhamento preditivo de manutenção automotiva |
| Gerenciamento | GPTI Grupo H (GP, G2–G5) |
| Desenvolvimento | PSW Grupo 7 (D1–D3) |
| Patrocinador | Prof. Diogo Silveira Mendonça |
| Tamanho | BAC aprovado de 97,1 h-pessoa (Entrega 1: 67,6 h; Marco 2: 29,5 h, CR-02 aprovado); com a contingência de 16,2 h, 113,3 h; orçamento autorizado de 120,3 h; desembolso R$ 0,00 |
| Período | 23/09/2026 a 30/11/2026; Entrega 1: 30/09 a 06/10/2026; Marco 2: aceite formal em 30/11/2026 (aula 10; o SR3 adotou 02/11 como premissa interna de prazo) |
| Preparado por | GPTI Grupo H (consolidado por GP) |
| Data de envio | 30/11/2026 |

## 2. Objetivo e metas

Este relatório encerra formalmente o projeto na disciplina de GPTI. Ele consolida a Entrega 1 (front-end com dados locais, 13 de 13 pacotes aprovados) e o Marco 2 (back-end com Express e MongoDB, baseline aprovada pelo CR-02). Metas do encerramento:

- **Informar o saldo das reservas:** contingência de 16,2 h com utilização aprovada por GP e G3 de **2,4 h** para absorver o excedente do CR (99,5 h) sobre o BAC (97,1 h), restando saldo de **13,8 h** (sujeito apenas a eventual apontamento complementar de D1 referente a 16/11 e 23/11); reserva de gerenciamento de **7,0 h** sem utilização.
- **Validar os marcos:** Entrega 1 aprovada em 16/11, após verificação positiva de G2; pacotes M2.1 a M2.5 verificados e aprovados por G2 em 23/11, com aceite formal do Marco 2 agendado junto ao patrocinador para 30/11/2026.
- **Registrar pendências finais para o aceite:** apresentação e validação final do Marco 2 com o patrocinador na aula 10 (30/11/2026) e consolidação definitiva das horas de D1 (16/11 e 23/11).
- **Registrar lições aprendidas** para projetos futuros.

## 3. Métricas de sucesso

| Categoria | Métrica | Medição |
| --- | --- | --- |
| Prazo | IDP (VA ÷ VP) | Entrega 1: 1,00; projeto com Marco 2: 0,70 no corte do SR3 (premissa de 02/11), atingindo **1,00** com a conclusão dos pacotes dentro do prazo oficial de aceite (30/11) |
| Custo | IDC (VA ÷ CR) | Entrega 1: 0,91 (desenvolvimento 0,93); projeto: **0,98** (VA 97,1 h ÷ CR 99,5 h), dentro da margem coberta pela reserva de contingência |
| Escopo | Pacotes verificados | Entrega 1: 13 de 13 (100%); Marco 2: 5 de 5 (100%, aprovados por G2 em 23/11) |
| Esforço | CR ÷ BAC | 99,5 h de 97,1 h (+2,4 h absorvidas pela contingência; 108,0 h considerando as 8,5 h pré-baseline) |
| Qualidade | Testes automatizados | 103 aprovados e 0 falhas em clone limpo da `main` (`6f3d94c`) verificado em 23/11 (o CHANGELOG cita 110) |

Nota sobre o IDP: no corte do SR3 (16/11), o IDP do projeto caiu de 1,00 para 0,70 porque o relatório considerou as 29,5 h do Marco 2 previstas até 02/11 (premissa interna do grupo) sem valor agregado pela regra 0/100. Com a conclusão e aprovação técnica de todos os pacotes em 23/11, antes da data oficial de aceite (30/11), o valor agregado total (97,1 h) iguala o valor planejado.

Objetivos do Termo de Abertura:

| Objetivo | Situação |
| --- | --- |
| O1 — front-end completo, roteiro T01–T23 sem falha essencial | **Atendido** na Entrega 1: pacote 7.2 aprovado em 16/11 |
| O2 — alertas corretos (T15–T17) | **Atendido:** pacotes 6.1 e 7.2 aprovados |
| O3 — clone limpo com `npm ci` e build | **Atendido** na Entrega 1 (7.4 aprovado); em 23/11 o clone limpo da `main` (`6f3d94c`) passou integralmente em `npm ci`, testes e build |
| O4 — 8 integrantes com commits rastreáveis | **Atendido:** todos os 8 integrantes possuem commits rastreáveis (`git shortlog` em 22/11, 72 commits no total: D1 38, G3 12, D3 8, GP 4, G2 4, D2 2, G4 1, G5 1) |

## 4. Desempenho do orçamento (horas-pessoa)

| Pacote | Planejado | Real | Valor agregado |
| --- | --: | --: | --: |
| 1.1 Planejamento da AV1 | 14,3 | 15,5 | 14,3 |
| 1.2 Monitoramento | 8,3 | 10,5 | 8,3 |
| 2.1 Kit visual e painel | 7,0 | 4,5 | 7,0 |
| 2.2 Dados e URLs | 5,0 | 9,5 | 5,0 |
| 3.1 + 4.1 + 5.1 + 5.2 | 17,5 | 14,5 | 17,5 |
| 6.1 Alertas | 3,5 | 5,0 | 3,5 |
| 7.1 Responsividade | 4,5 | 6,0 | 4,5 |
| 7.2 Roteiro de aceite | 3,5 | 2,0 | 3,5 |
| 7.3 Correções e ensaio | 2,5 | 5,5 | 2,5 |
| 7.4 Conferência e entrega | 1,5 | 1,5 | 1,5 |
| **Entrega 1** | **67,6** | **74,5** | **67,6** |
| M2.1 Base e veículos | 8,5 | 8,5 | 8,5 |
| M2.2 Itens, serviços e alertas | 8,0 | 1,0 | 8,0 |
| M2.3 JWT | 4,0 | 4,0 | 4,0 |
| M2.4 Carga inicial | 3,0 | 2,5 | 3,0 |
| M2.5 Integração e aceite | 6,0 | 9,0 | 6,0 |
| **Marco 2** | **29,5** | **25,0** | **29,5** |
| **Projeto** | **97,1** | **99,5** | **97,1** |

Fora da tabela: 8,5 h pré-baseline (23 a 25/09). As horas da GPTI foram assumidas conforme o planejado por decisão do grupo; as da PSW foram reconstituídas por commit e conferidas com os registros de D1 e D3, que coincidem com a planilha. D2 estimou de 16 a 22 h para o commit de 05/10 com apoio de IA, adotando-se 18,0 h no registro da PSW (além de 10,0 h estimadas em 23/11). As 10,0 h de correção da Entrega 1 estimadas no SR2 não foram apontadas (ISS-08). Com o registro atualizado da PSW (82,0 h no total), o CR do projeto atingiu 99,5 h, ultrapassando o BAC de 97,1 h em 2,4 h — desvio formalmente absorvido pela reserva de contingência (16,2 h), mantendo o projeto dentro do orçamento autorizado (120,3 h).

## 5. Desempenho do cronograma

### Entrega 1

| Pacote | Fim planejado (v1.1) | Fim real (código) | Atraso | Situação |
| --- | --- | --- | --- | --- |
| 1.1 | 04/10 | 05/10 | +1 d | Aprovado |
| 1.2 | 06/10 | contínuo | — | Aprovado |
| 2.1 | 30/09 | 05/10 | +5 d | Aprovado |
| 2.2 | 30/09 | 04/10 | +4 d | Aprovado |
| 3.1 | 01/10 | 05/10 | +4 d | Aprovado |
| 4.1 | 01/10 | 05/10 | +4 d | Aprovado |
| 5.1 | 01/10 | 06/10 | +5 d | Aprovado |
| 6.1 | 02/10 | 06/10 | +4 d | Aprovado |
| 5.2 | 02/10 | 05/10 | +3 d | Aprovado |
| 7.1 | 03/10 | 06/10 | +3 d | Aprovado |
| 7.2 | 04/10 | 06/10 | +2 d | Aprovado |
| 7.3 | 05/10 | 06/10 | +1 d | Aprovado |
| 7.4 | 06/10 | 06/10 | 0 d | Aprovado |

O atraso na tabela acima mede o término da codificação; todos os 13 pacotes foram formalmente **aprovados em 16/11, após verificação positiva de G2**.

### Marco 2 (aceite previsto para 30/11/2026)

| Pacote | Planejado (h) | Feito (h) | Situação |
| --- | --: | --: | --- |
| M2.1 Base Express, MongoDB e rotas de veículos | 8,5 | 8,5 | Implementado em 31/10; aprovado por G2 em 23/11 |
| M2.2 Rotas de itens, serviços e alertas | 8,0 | 1,0 | Implementado em 23/11 (rotas de itens e serviços com JWT); aprovado por G2 em 23/11 |
| M2.3 Autenticação JWT | 4,0 | 4,0 | Integrado às rotas de veículos em 23/11; aprovado por G2 em 23/11 |
| M2.4 Carga inicial do banco | 3,0 | 2,5 | Implementado em 23/11 por D2 (`seed.js`; carga validada no Atlas com 2 veículos, 5 itens e 4 serviços; presente na `main` `6f3d94c`); aprovado por G2 em 23/11 |
| M2.5 Integração front-end/API e aceite | 6,0 | 9,0 | Quatro telas integradas ao Express com JWT em 23/11; aprovado por G2 em 23/11 |
| **Total** | **29,5** | **25,0** | **Concluído e verificado em 23/11; aceite final em 30/11** |

Em 23/11 o CHANGELOG registra M2.1 a M2.5 implementadas, com 110 testes citados (103 executados e aprovados em clone limpo da `main`: 48 de front-end, 11 do mock e 44 de back-end) e carga inicial validada no MongoDB Atlas. As horas de D1 de 16/11 e 23/11 permanecem pendentes de declaração individual.

## 6. Desempenho da qualidade

- **Verificação independente:** os 13 pacotes da Entrega 1 foram verificados e aprovados; G2 concluiu a verificação independente de M2.1 a M2.5 em 23/11.
- **Testes:** 103 testes aprovados e 0 falhas em clone limpo da `main` (`6f3d94c`), verificado por G2 em 23/11 (48 de front-end, 11 do mock e 44 de back-end). A suíte de autenticação HTTP ficou pulada por ausência da variável `MONGO_TEST_URL`, e o CHANGELOG cita 110 testes no total.
- **Autenticação (ISS-10):** em 16/11 o PR #8 declarou as dependências na `main` e em 23/11 o módulo passou a ser montado no Express; o clone limpo da `main` (`6f3d94c`) passou em `npm ci`, testes e build na verificação de G2 em 23/11, com a ressalva da suíte de autenticação pulada (A-08).
- **Registro de entrega e GitHub Pages (ISS-14 e ISS-15):** o hash `8133fd6` citado no SR1 não correspondia aos 56 testes (ISS-14); em 23/11, G2 reproduziu `npm ci` e `npm test` no commit `abe5ea8` e obteve 56 de 56 (45 de front-end e 11 do mock), consolidando `abe5ea8` como hash oficial da Entrega 1 no Relatório de Verificação do Escopo. Quanto à publicação no GitHub Pages gerada no commit `e87b48a` (ISS-15), decidiu-se mantê-la apenas como visualização complementar, preservando o pacote reproduzido em clone limpo local como entregável oficial previsto no Termo de Abertura.
- **Ressalva do Marco 1:** uso de `alert` na exclusão de custos, em desacordo com a orientação do professor **— corrigido**.
- **Questões:** 15 registradas ao longo do projeto; **11 fechadas** (ISS-02, 03, 05, 06, 07, 09, 10, 11, 13, 14 e 15). Especificamente no fechamento:
  - **ISS-05 (Prazo do Marco 2):** encerrada como mitigada, pois 02/11 era premissa interna e os pacotes foram concluídos em 23/11, antes do aceite oficial de 30/11.
  - **ISS-06 (Concentração de esforço):** encerrada com ressalva, absorvida sem impacto na entrega e registrada em lições aprendidas.
  - **ISS-09 (Dependência cruzada):** encerrada após a integração completa dos pacotes em 23/11.
  - **ISS-13 (M2.4 sem dono):** encerrada com a implementação de `seed.js` por D2 e validação no MongoDB Atlas.
  - As 4 questões restantes de governança/apontamento (como subapontamento e rituais diários) são encerradas administrativamente com o fim do projeto e documentadas nas lições aprendidas.

## 7. Encerramento

### 7.1 Gestão da comunicação e do engajamento

**Funcionou:** 2 das 5 comunicações previstas no Plano §10 tiveram envio e recebimento formalmente comprovados (40%): a entrega dos artefatos da AV1 e os reportes de status ao patrocinador (SR1, SR2, CR-02 aprovados e síntese semanal de encerramento).

**Não funcionou:** ausência de registro do status diário da PSW e das atas de encontro da gerência desde 06/10; demonstração aos proprietários sem evidência formal; resposta parcial (2 de 3 desenvolvedores) ao pedido coletivo de horas (ISS-12). No engajamento, o patrocinador manteve postura apoiadora; D1 concentrou 54,3% das horas da PSW (declarando 0 h na semana de 15/11); D3 apoiou parcialmente; D2 ficou sem commits nem respostas entre 06/10 e 23/11 (quando entregou M2.4); a GPTI entregou todos os relatórios gerenciais, porém sem atas dos encontros diários. Evidências arquivadas: registros de mensagens dos integrantes da PSW sobre suas horas de trabalho.

### 7.2 Gestão de riscos

| Risco | Resposta executada | Situação no encerramento |
| --- | --- | --- |
| R1 Modelos de dados incompatíveis | Contrato de dados definido em 2.2 e correção de integridade | **Encerrado:** pacote 2.2 aprovado |
| R2 Regra de alertas com falhas | Cálculo reescrito em 06/10 | **Encerrado:** pacotes 6.1 e 7.2 aprovados |
| R3 Kit visual indefinido | Migração para Tailwind CSS em 05/10 | **Encerrado:** risco materializado; pacote 2.1 concluído com +5 d |
| R4 Conflitos em `App.jsx` | PRs curtos no Marco 2 (ação coordenada pelo GP) | **Mitigado:** PRs #7 e #8 mesclados na `main` sem conflitos |
| R5 Versão do Node.js | Padronização com `npm ci` e builds em 31/10 | **Mitigado:** clone limpo da `main` verificado por G2 em 23/11 (`npm ci`, testes e build) |
| R6 Integrante sem commit | Commit de revisão de D3 (`0c66171`) e carga inicial de D2 (`seed.js`) | **Encerrado:** todos os 8 integrantes possuem commits rastreáveis |
| R7 Critério de front-end completo | Validação e aprovação formal pelo professor | **Encerrado:** Entrega 1 aprovada |
| R8 (oportunidade) Componentes do kit | Não executada | **Não realizada** |
| R9 M2.2 sem dono (P alta, I alta) | D1 assumiu e implementou a M2.2 em 23/11 | **Encerrado:** M2.2 aprovada por G2 em 23/11 |
| R10 ETC ainda estimado | Aprovação de uso de 2,4 h da reserva de contingência por GP e G3 | **Mitigado / Encerrado:** CR de 99,5 h coberto pela reserva de 16,2 h (saldo de 13,8 h) |
| R11 Autenticação sem mesclagem | PR #8 com dependências (16/11) e integração ao Express (23/11) | **Mitigado:** clone limpo da `main` verificado por G2 em 23/11 |
| R12 Prazo do Marco 2 (P alta, I alta) | Conclusão técnica antecipada em 23/11 e confirmação do aceite em 30/11 | **Encerrado:** M2.1 a M2.5 verificados em 23/11 dentro do prazo oficial de 30/11 |
| R13 M2.4 sem dono e Atlas sem responsável | D2 implementou M2.4 (`seed.js`), validou o Atlas e foi confirmado como responsável | **Encerrado:** M2.4 validada no Atlas e aprovada por G2 em 23/11 |

### 7.3 Lições aprendidas

| Assunto | Sucesso | Sem sucesso |
| --- | --- | --- |
| Planejamento | Linha de base completa, replanejamento formal M-01 e CR-02 aprovado | Pacotes da Entrega 1 terminaram de 0 a 5 dias após o v1.1; Marco 2 iniciou antes da aprovação formal da baseline |
| Escopo | Entrega 1 aprovada (13 de 13) e Marco 2 concluído (5 de 5) sem *scope creep* | Critérios do SR1 divergiam do Dicionário da EAP (ISS-02); registro inicial de entrega com hash e testes incorretos (ISS-14) |
| Custo e horas | IDC de 0,91 na Entrega 1 e 0,98 no projeto; reservas dimensionadas por risco absorveram o desvio | Horas reconstituídas por commit e horas da GPTI assumidas; possível subapontamento de 10,0 h (ISS-08) |
| Qualidade | Evolução de 56 para 103 testes automatizados; verificação independente concluída nos dois marcos | Autenticação sem integração nem dependências declaradas até 16/11 (ISS-10, resolvida em 23/11) |
| Comunicação | Artefatos da AV1 e reportes de status ao patrocinador formalmente comprovados | Ausência de status diário e atas de reunião desde 06/10 (ISS-12) |
| Recursos | Entrega dos dois marcos nas datas oficiais da disciplina | Esforço concentrado em D1 (56,7% das horas da PSW na Entrega 1); baixa responsividade de D2; dependência cruzada no caminho crítico (ISS-09) |

### Comentários gerais sobre a gestão

- O monitoramento é eficaz apenas quando horas, status e aceites são registrados no momento em que ocorrem; informações mantidas apenas em memória viram estimativas imprecisas no encerramento.
- Cada ação corretiva e cada questão aberta precisam de responsável único e prazo definido, devendo ser revisadas sistematicamente a cada *status report*.
- A verificação independente por membro distinto de quem executou o pacote garante confiabilidade ao escopo e deve possuir alocação própria de horas no plano.
- Mudanças de linha de base precisam ser formalmente aprovadas antes do início da execução para que os índices de prazo (IDP) e custo (IDC) reflitam um plano acordado.

## 8. Revisão de produtos e próximos passos

**Produtos entregues:** Business Case v2.0, Termo de Abertura v1.2, Plano do Projeto v1.2, Dicionário da EAP, Relatório de Verificação do Escopo (Entrega 1 e Marco 2), Status Reports 1, 2 e 3, Planilha de Horas e Valor Agregado, CHANGELOG, Relatório Final de Encerramento e código-fonte completo no repositório da PSW (com uso de apoio de IA/Codex autorizado pelo professor).

**Situação final das ações do SR3 no encerramento:**

| Ação | Dono | Situação final |
| --- | --- | --- |
| A-07 Disponibilidade de D2 e escopo da M2.2 | GP, D1 | **Encerrada:** M2.2 implementada por D1 em 23/11 e aprovada por G2. |
| A-08 Mesclar autenticação, declarar dependências e testar em clone limpo | D3 | **Encerrada:** dependências declaradas em 16/11, módulo montado em 23/11 e clone limpo (`6f3d94c`) verificado por G2. |
| A-09 Rotas de veículos com JWT (M2.3) e carga inicial (M2.4) | D1, D2 | **Encerrada:** M2.3 e M2.4 implementadas e aprovadas em 23/11. |
| A-10 Registrar horas por pessoa e pacote | D3, D2, D1 | **Encerrada com ressalva:** registro atualizado em 23/11 (82,0 h da PSW); pendente apenas eventual declaração complementar de D1 (16/11 e 23/11). |
| A-12 CR-03 e resposta do professor | GP | **Encerrada:** aceite formal do Marco 2 confirmado para 30/11/2026 (aula 10) junto ao patrocinador, dispensando CR-03 de prazo. |
| A-14 Validar o ETC | D1, D3, D2 | **Encerrada:** trabalho técnico concluído em 23/11 (ETC = 0 h de desenvolvimento restante); desvio de 2,4 h no CR coberto pela contingência. |
| A-15 Verificar M2.1 e demais pacotes do Marco 2 | G2 | **Encerrada:** G2 verificou e aprovou M2.1 a M2.5 em 23/11. |
| A-16 Status diário e ata do encontro | PSW, G4 | **Encerrada administrativamente:** ausência de atas formais após 06/10 registrada nas lições aprendidas. |
| A-17 Dono de M2.4 e responsável pelo Atlas | GP | **Encerrada:** M2.4 implementada e validada no Atlas por D2 em 23/11; D2 confirmado como responsável pelo banco no Atlas. |
| A-18 GitHub Pages e registro de entrega (hash e testes) | GP, G2 | **Encerrada:** hashes corrigidos no Relatório de Verificação (`abe5ea8` na Entrega 1 com 56 testes; `6f3d94c` no Marco 2 com 103 testes); commit `e87b48a` (Pages) mantido apenas como apoio visual sem alterar o escopo local do Termo de Abertura. |
| A-19 CR-04 e síntese semanal ao patrocinador | GP | **Encerrada:** síntese semanal enviada ao Prof. Diogo; CR-04 dispensado por não haver alteração de escopo ou prazo além do acordado para 30/11. |

**Próximo passo final:** realização da apresentação e obtenção do aceite formal do Marco 2 junto ao patrocinador (Prof. Diogo Silveira Mendonça) na aula do dia **30/11/2026**.