# Status Report 2 — AutoCUIDA

**Data de status:** 02/11/2026 · **Período coberto:** 07/10/2026 a 02/11/2026 (EVM acumulado desde 23/09/2026) · **Elaborado por:** GPTI Grupo H · **Patrocinador:** Prof. Diogo Silveira Mendonça

*Legenda:* `(est.)` = hora estimada pela GPTI por falta de apontamento, a substituir pelo dado real. `[CONFIRMAR]` = dado que só o grupo ou o professor tem.

---

## Premissas e regras aplicadas

- **Linha de base:** Plano do Projeto v1.2, Termo de Abertura v1.2 e Dicionário da EAP. As datas planejadas são as da v1.1 (M-01), com a mudança aprovada pelo patrocinador (informado pelo grupo em 02/11). A escolha entre v1.0 e v1.1 não altera o VP em 02/11, porque tudo estava previsto até 06/10 nas duas versões; a v1.0 fica entre parênteses na seção C.
- **Unidade:** hora-pessoa. R$ 10,00/h é só referência de dimensionamento; desembolso de caixa R$ 0,00.
- **Orçamento do EVM (BAC):** 67,6 h (45,0 h de desenvolvimento e 22,6 h de gestão). A contingência de 16,2 h fica fora e só cobre estouro; a reserva de gerenciamento de 7,0 h só o patrocinador libera.
- **Regra de crédito 0/100:** o aceite de cada pacote no Dicionário é binário e observável, e os pacotes têm de 1,5 h a 7,0 h, sem estado intermediário. O pacote só conta 100% se o critério foi verificado por pessoa diferente de quem executou; sem isso, VA = 0.
- **Base do crédito:** a verificação do SR1 (06/10) foi feita pela GPTI, independente da PSW. Como nomes e critérios do SR1 divergem do Dicionário (ISS-02), recebem crédito só os pacotes cujo conteúdo verificado coincide com o critério: 3.1, 4.1, 5.1, 5.2 e 6.1. Os pacotes 2.1 e 7.1 não recebem, porque o `docs/cronograma.md` registra que estilo inline, teclado, foco e zoom 200% não foram homologados. O crédito de 6.1 é o mais frágil: o SR1 verificou limiares e filtro, mas não baixa e retroativo (T15–T17). A reverificação (A-04) pode alterá-lo.
- **Tratamento do CR:** o CR oficial cobre 30/09 a 06/10 (Entrega 1). As 8,5 h de 23/09 a 25/09 (protótipo e documentação) são ativo de processo e ficam em linha própria; as 8,5 h de 31/10 são do Marco 2 e ficam fora da baseline.
- **Apontamento:** nenhuma semana foi medida em tempo real. O CR do desenvolvimento (34,0 h) foi reconstituído por commits (`mudancas/horas-dev.md`) e, em 31/10, pela declaração do Rafael Yahata, que informou 0 h de 12/10 a 30/10. Gabriel e Voigt não têm commits depois de 06/10 (0 h assumidas, a confirmar). As horas da GPTI (23,0 h) são estimativa (est.): cada integrante foi alocado nas seções que assina no Plano §11, dentro das faixas O–P do Plano §8, e nenhum deles confirmou o número. As estimativas foram propostas com apoio de IA e precisam de revisão da equipe (Plano §14).
- **Marco 2:** a baseline cobre só a Entrega 1. O Termo exclui API, banco e autenticação, e o trabalho do Marco 2 está fora da EAP (CR-02, pendente). A data do Marco 2 foi adotada pelo grupo como 02/11/2026 às 18:30 (hoje); nesse corte, só M2.1 está concluída. As horas do Marco 2 abaixo são estimativa da GPTI, não baseline.
- **Faróis:** Escopo: verde = todos os pacotes verificados; amarelo = pendências sem critério descumprido; vermelho = critério descumprido ou trabalho fora da EAP sem mudança aprovada. Prazo e custo: vermelho quando o índice fica abaixo de 0,90 ou a projeção de estouro passa de 8,4 h.

---

## A. Sumário Executivo e Dashboard

### Respostas às três perguntas

1. **O caminho crítico entrega o Marco 2 na data planejada?**  
   **Não.** Com o prazo do Marco 2 adotado em 02/11/2026 às 18:30, só M2.1 está concluída e faltam 21,0 h (est.) nas demais: o prazo vence sem elas. A baseline não tem caminho crítico do Marco 2. Caminho provisório: M2.1 (concluída em 31/10) $\rightarrow$ M2.2 rotas de itens, serviços e alertas $\rightarrow$ M2.3 JWT e M2.4 carga inicial (em paralelo) $\rightarrow$ M2.5 integração front-end/API e aceite. O risco é alto: não houve hora apontada de 07/10 a 30/10, e M2.2 a M2.5 dependem de Gabriel e Voigt, sem registro desde 06/10.

2. **O valor agregado mostra trabalho no ritmo e no custo planejados?**  
   **Não.** Desenvolvimento: $IDP = 21,0 \div 45,0 = 0,47$ e $IDC = 21,0 \div 34,0 = 0,62$. Projeto: $IDP = 35,3 \div 67,6 = 0,52$ e $IDC \text{ (est.)} = 35,3 \div 57,0 = 0,62$. A causa principal é a regra 0/100: 23,5 h dos 34,0 h gastos estão em pacotes sem crédito (2.1, 2.2, 7.1, 7.2, 7.3 e 7.4), e nos pacotes com crédito o CR (10,5 h) é metade do VA (21,0 h). Os índices medem, antes de ineficiência, verificação pendente.

3. **As horas que faltam cabem na capacidade restante?**  
   Restam 31,0 h de desenvolvimento (est.): 10,0 h na Entrega 1 e 21,0 h no Marco 2. Com a premissa de 12 h/semana (4 h por desenvolvedor), são 2,6 semanas (cerca de 20/11); com 6 h/semana, 5,2 semanas (cerca de 08/12). No ritmo observado (2,1 h/semana), 14,6 semanas. Se só o Rafael executar, como em 31/10, a 4 h/semana são 7,8 semanas. Contra o prazo do Marco 2 (02/11 às 18:30), a capacidade não cobre: as 21,0 h levam 1,8 semana a 12 h/semana e 0,5 semana mesmo na referência do Plano (45 h/semana). A disponibilidade por pessoa continua a confirmar (seção E).

### Situação geral

| Dimensão | Farol | Indicador | Justificativa |
| :--- | :--- | :--- | :--- |
| **Escopo** | **VERMELHO** | 6 de 13 pacotes verificados (46%) | 2.1 e 7.1 com critério do Dicionário não atendido; 1.2, 2.2, 7.2, 7.3 e 7.4 sem verificação (1.1 verificado e aceito); 8,5 h do Marco 2 fora da EAP, sem mudança aprovada. |
| **Prazo** | **VERMELHO** | IDP projeto 0,52; desenvolvimento 0,47 | Pacotes da Entrega 1 terminaram de 1 a 5 dias depois do cronograma v1.1; metade da EAP sem verificação; Marco 2 vence em 02/11 às 18:30 com só M2.1 concluída. |
| **Custo** | **VERMELHO** | IDC desenvolvimento 0,62; projeto (est.) 0,62; VC −13,0 h (desenvolvimento) | Vermelho pelo índice (abaixo de 0,90). A projeção do desenvolvimento vai de 44,0 h (estimativa preliminar) a 58,0 h (teto) contra 45,0 h de BAC; o teto passa da tolerância de 8,4 h. |

---

## B. Evolução do Escopo desde o Status Report 1 (06/10/2026)

| Situação | Pacotes | Observação |
| :--- | :--- | :--- |
| **Verificados** | 1.1, 3.1, 4.1, 5.1, 5.2, 6.1 | Verificação do pacote 1.1 confirmada e aceita pelo professor responsável. Verificação dos demais pacotes pelo SR1 pela GPTI. Em 6.1 foram verificados os limiares 79,9 / 80 / 99,9 / 100% e o filtro; tempo, baixa e retroativo (T15–T17) dependem do roteiro 7.2. Crédito sujeito à reverificação (A-04). |
| **Critério não atendido (reabertos)** | 2.1, 7.1 | 2.1: estilos inline; 7.1: teclado, foco e zoom 200% não homologados. O SR1 os dera como verificados com ressalva. |
| **Sem verificação do critério** | 1.2, 2.2, 7.2, 7.3, 7.4 | 2.2: a carga usa API mock, não JSON estático; 7.2: sem registro consolidado de T01–T23 aprovados por revisor independente; 7.4: envio ao Teams não confirmado; 1.2: sem status diário. |
| **Não demonstrados (Marco 2)** | Rotas de itens, serviços e alertas no back-end; JWT; carga inicial; integração front-end/API | Fora da baseline. O back-end só tem veículos. |
| **Novo desde o SR1, sem aceite** | Back-end Express + MongoDB: veículos, validações, persistência e proteção contra atualizações concorrentes; 93 testes (45 front, 11 mock, 37 back-end) | 31/10, 8,5 h, sem Solicitação de Mudança (CR-02). |

---

## C. Cronograma e Caminho Crítico

Datas reais = primeiro e último commit com evidência do pacote; evidência de commit não é aceite. O atraso é medido contra o fim planejado v1.1; entre parênteses, o fim planejado na v1.0.

| ID | Atividade | Responsável | Início plan. | Fim plan. v1.1 (v1.0) | Início real | Fim real | Atraso | Horas restantes (est.) | Situação |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1** | Planejamento e artefatos AV1 | Patrick (A), GPTI | 30/09 | 04/10 (—) | 30/09 | 05/10 | +1 d | 0,0 | Entregue e publicado no Teams dentro do prazo. A entrega foi conferida pelo professor responsável, que confirmou que os artefatos estavam corretos e foram aceitos. |
| **1.2** | Monitoramento e mudanças | Patrick (A), Ronald, Rodrigo, Thiago | 30/09 | 06/10 (—) | — | 12/10 | +6 d | 0,5 | Parcial; sem status diário |
| **2.1** | Kit visual, tema e painel | Voigt | 30/09 | 30/09 (26/09) | 05/10 | 05/10 | +5 d | 2,0 | Critério não atendido |
| **2.2** | Dados por veículo, carga e URLs | Rafael Yahata | 30/09 | 30/09 (27/09) | 02/10 | 04/10 | +4 d | 1,0 | Implementado; sem verificação |
| **3.1** | Veículos e odômetro | Rafael Yahata | 01/10 | 01/10 (28/09) | 02/10 | 05/10 | +4 d | 0,0 | Verificado |
| **4.1** | Itens e regras | Gabriel | 01/10 | 01/10 (29/09) | 05/10 | 05/10 | +4 d | 0,0 | Verificado |
| **5.1** | Serviços | Voigt | 01/10 | 01/10 (30/09) | 05/10 | 06/10 | +5 d | 0,0 | Verificado |
| **6.1** | Alertas, baixa e filtros | Gabriel | 02/10 | 02/10 (01/10) | 05/10 | 06/10 | +4 d | 0,0 | Verificado |
| **5.2** | Custos integrados | Gabriel | 02/10 | 02/10 (02/10) | 05/10 | 05/10 | +3 d | 0,0 | Verificado |
| **7.1** | Responsividade e acessibilidade | Hugo (A), PSW | 03/10 | 03/10 (03/10) | 04/10 | 06/10 | +3 d | 3,0 | Critério não atendido |
| **7.2** | Roteiro T01–T23 | Hugo (A), PSW | 04/10 | 04/10 (04/10) | 06/10 | 06/10 | +2 d | 3,0 | Executado; sem verificação |
| **7.3** | Correções e ensaio | Patrick (A), PSW | 05/10 | 05/10 (05/10) | 05/10 | 06/10 | +1 d | 0,5 | Executado; sem verificação |
| **7.4** | Conferência e entrega | Patrick (A), PSW | 06/10 | 06/10 (06/10) | 06/10 | 06/10 | 0 d | 0,5 | Congelada em 06/10; Teams não confirmado |

**Atividades do Marco 2** *(fora da baseline; prazo adotado: 02/11/2026 às 18:30)*:

| ID | Atividade | Responsável proposto | Início real | Fim real | Horas (est.) | Situação |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **M2.1** | Base Express, MongoDB, modelo, validações, repositório e rotas de veículos | Rafael Yahata | 31/10 | 31/10 | 8,5 (reconstituída) | Implementada, sem aceite |
| **M2.2** | Rotas, persistência e validações de itens, serviços e alertas (inferida do escopo do front-end; confirmar na EAP do Marco 2) | Gabriel (itens, alertas) e Voigt (serviços) | — | — | 8,0 | Não iniciada |
| **M2.3** | Integrar rotas ao JWT | Voigt (segundo o CHANGELOG) | — | — | 4,0 | Não iniciada |
| **M2.4** | Carga inicial do banco com vínculos entre usuários, veículos, itens e serviços | PSW (a definir) | — | — | 3,0 | Não iniciada |
| **M2.5** | Integração do front-end com a API e aceite | PSW; verificação de Hugo | — | — | 6,0 | Não iniciada |
| | **Restante do Marco 2** | | | | **21,0** | |

- **Caminho crítico da Entrega 1:** 2.1/2.2 $\rightarrow$ 4.1/5.1 $\rightarrow$ 6.1/5.2 $\rightarrow$ 7.1 $\rightarrow$ 7.2 $\rightarrow$ 7.3 $\rightarrow$ 7.4. O código terminou em 06/10, mas a cadeia não fechou: 2.2, 7.2, 7.3 e 7.4 não foram verificados e 2.1 e 7.1 estão reabertos. Alguns pacotes começaram antes de os predecessores terminarem (3.1 em 02/10, com 2.1 terminando em 05/10; 7.3 em 05/10, com 7.2 terminando em 06/10), o que enfraquece a datação por commit. Proposta do grupo para fechar a Entrega 1: 09/11/2026 (prazo da A-04), se 2.1 e 7.1 forem aprovados na reverificação; as 10,0 h restantes (est.) cabem nessa data a 12 h/semana.
- **Caminho crítico do Marco 2 (provisório):** M2.1 $\rightarrow$ M2.2 $\rightarrow$ (M2.3 e M2.4 em paralelo) $\rightarrow$ M2.5. O prazo adotado é 02/11/2026 às 18:30, e só M2.1 está concluída. A 12 h/semana, a cadeia M2.2 a M2.5 (21,0 h) termina em cerca de 1,8 semana, por volta de 14/11, 12 dias depois do prazo. A conclusão não é projetada pelo IDP.

---

## D. Análise de Valor Agregado (EVM)

### Por atividade

| ID / Atividade | Planejado (h) | CR (h) | Orçamento restante, $BAC - VA$ (h) | ETC (est.) (h) | Regra de crédito | VA (h) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1 Planejamento AV1** | 14,3 | 15,5 (est.) | 0,0 | 0,0 | 0/100, verificado e aceito | 14,3 |
| **1.2 Monitoramento** | 8,3 | 7,5 (est.) | 8,3 | 0,5 | 0/100, sem verificação | 0,0 |
| **2.1 Kit e painel** | 7,0 | 3,0 | 7,0 | 2,0 | 0/100, critério não atendido | 0,0 |
| **2.2 Dados e URLs** | 5,0 | 9,5 | 5,0 | 1,0 | 0/100, sem verificação | 0,0 |
| **3.1 + 4.1 + 5.1 + 5.2** | 17,5 | 7,0 | 0,0 | 0,0 | 0/100, verificados | 17,5 |
| **6.1 Alertas** | 3,5 | 3,5 | 0,0 | 0,0 | 0/100, verificado | 3,5 |
| **7.1 Responsividade** | 4,5 | 5,0 | 4,5 | 3,0 | 0/100, critério não atendido | 0,0 |
| **7.2 Roteiro de aceite** | 3,5 | 2,0 | 3,5 | 3,0 | 0/100, sem verificação | 0,0 |
| **7.3 Correções e ensaio** | 2,5 | 2,5 | 2,5 | 0,5 | 0/100, sem verificação | 0,0 |
| **7.4 Conferência e entrega**| 1,5 | 1,5 | 1,5 | 0,5 | 0/100, sem verificação | 0,0 |
| **Desenvolvimento** | **45,0** | **34,0** | **24,0** | **10,0** | | **21,0** |
| **Gestão (1.1 + 1.2)** | **22,6** | **23,0 (est.)**| **8,3** | **0,5** | | **14,3** |
| **Projeto** | **67,6** | **57,0 (est.)**| **32,3** | **10,5** | | **35,3** |

*Nota:* A coluna *Orçamento restante* é $BAC - VA$: o teto do que ainda não foi ganho, não uma estimativa do que falta fazer. O ETC é a estimativa preliminar da GPTI do que falta, a validar pelos donos (A-03). Base do ETC: 2.1, trocar as duas dimensões inline por classes Tailwind e registrar a escolha do kit (1,5 h) mais verificação (0,5 h); 2.2, verificação e ajuste do critério para API mock (1,0 h); 7.1, homologar teclado, foco e zoom 200% e corrigir (3,0 h); 7.2, executar T01–T23 em clone limpo por quem não escreveu o código, com evidências (3,0 h); 7.3, 7.4 e 1.2, verificação e postagem no Teams (0,5 h cada). Fora da tabela: 8,5 h pré-baseline (ativo de processo) e 8,5 h do Marco 2 (fora da baseline).

### Memória de cálculo do CR (commit para pacote; o mapeamento é premissa da GPTI)

| Pacote | Commits e horas (`mudancas/horas-dev.md`) | Subtotal (h) |
| :--- | :--- | :--- |
| **2.1** | `ebec85b` Tailwind 3,0 | 3,0 |
| **2.2** | `f48f9a7` 4,0 + `e65bcd2` 1,0 + `409ec2e` 0,5 + `0195f64` 4,0 | 9,5 |
| **3.1 + 4.1 + 5.1 + 5.2** | `255a20f` 2,5 (Rafael) + `0d6897a` 4,5 (Gabriel, commit único) | 7,0 |
| **6.1** | `d6f0755` 1,5 + `abe5ea8` 2,0 | 3,5 |
| **7.1** | `56efc1e` 2,5 + `8133fd6` 2,5 | 5,0 |
| **7.2** | `0c66171` 2,0 (Voigt; revisão documental com apoio de IA) | 2,0 |
| **7.3** | `598b1a2` 2,0 + `5c8c674` 0,5 | 2,5 |
| **7.4** | `e87b48a` 1,0 + `0711ffd` 0,5 | 1,5 |
| **CR oficial da Entrega 1 (desenvolvimento)** | $3,0 + 9,5 + 7,0 + 3,5 + 5,0 + 2,0 + 2,5 + 1,5$ | **34,0** |
| **Pré-baseline (fora do CR oficial)** | `b59f1ab` 6,0 (23/09) + quatro commits de documentação 2,5 (25/09) | 8,5 |
| **Marco 2 (fora da baseline)** | `c86a9b1` 1,0 + `d3c7d0f` 1,5 + `cba6a02` 1,5 + `902f82d` 2,0 + `47084bc` 1,5 + `50e654a` 1,0 | 8,5 |

Os 11,5 h que o Rafael informou para 05 a 09/10 coincidem com os commits `ebec85b`, `56efc1e`, `598b1a2`, `d6f0755`, `abe5ea8` e `5c8c674` ($3,0 + 2,5 + 2,0 + 1,5 + 2,0 + 0,5$), todos até 06/10. Se alguma dessas horas ocorreu em 07 a 09/10, ela está depois do corte do Marco 1 e deve ser realocada `[CONFIRMAR com o Rafael]`.

### Horas da GPTI (est.)

| Pessoa | 1.1 | 1.2 | Total | Base da alocação |
| :--- | :--- | :--- | :--- | :--- |
| **Patrick Cruz** | 4,0 | 1,5 | 5,5 | Termo; Plano §1–3 e §13–15; entrega e status |
| **Hugo Lima** | 3,5 | 1,0 | 4,5 | Plano §4–6; Dicionário da EAP |
| **Ronald Teixeira** | 4,5 | 2,5 | 7,0 | Business Case; Plano §7–8; cronograma e horas |
| **Rodrigo Americo** | 1,5 | 1,0 | 2,5 | Plano §9–10 |
| **Thiago Souza** | 2,0 | 1,5 | 3,5 | Plano §11–12 |
| **Total** | **15,5** | **7,5** | **23,0** | Planejado 14,3 e 8,3 (faixas O–P de 10 a 20 e de 6 a 12) |

### Horas por pessoa e atividade (desenvolvimento, Entrega 1)

As células do Rafael decorrem de eliminação a partir do total por pessoa do repositório (36,0 h até 06/10, das quais 8,5 h pré-baseline); só os commits `255a20f`, `0d6897a` e `0c66171` têm autor nomeado. Os commits agrupados em 3.1 a 5.2 não permitem separar os quatro pacotes; os autores precisam dividir as horas (A-02).

| Pessoa | 2.1 | 2.2 | 3.1–5.2 | 6.1 | 7.1 | 7.2 | 7.3 | 7.4 | Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Rafael Yahata** | 3,0 | 9,5 | 2,5 | 3,5 | 5,0 | 0,0 | 2,5 | 1,5 | 27,5 |
| **Gabriel Felipe** | 0,0 | 0,0 | 4,5 | 0,0 | 0,0 | 0,0 | 0,0 | 0,0 | 4,5 |
| **Rafael Voigt** | 0,0 | 0,0 | 0,0 | 0,0 | 0,0 | 2,0 | 0,0 | 0,0 | 2,0 |
| **Total** | **3,0** | **9,5** | **7,0** | **3,5** | **5,0** | **2,0** | **2,5** | **1,5** | **34,0** |

O Rafael executou trabalho dos pacotes 2.1 (dono Voigt) e 6.1 (dono Gabriel). A verificação exige quem não executou, e a GPTI atende a essa regra.

### Totais, variações e índices

| Medida | Cálculo | Valor |
| :--- | :--- | :--- |
| **VP, desenvolvimento** (tudo previsto até 06/10) | $7,0+5,0+5,0+5,0+5,0+2,5+3,5+4,5+3,5+2,5+1,5$ | 45,0 h |
| **VP, projeto** | $45,0 + 14,3 + 8,3$ | 67,6 h |
| **VA** | $17,5 + 3,5 + 14,3 \text{ (1.1)}; 2.1 \text{ e } 7.1 = 0$ | 35,3 h (Projeto) / 21,0 h (Dev.) |
| **CR, desenvolvimento** | $3,0+9,5+7,0+3,5+5,0+2,0+2,5+1,5$ | 34,0 h |
| **CR, projeto** | $34,0 + 23,0 \text{ (est.)}$ | 57,0 h (est.) |

| Indicador | Fórmula | Desenvolvimento | Projeto |
| :--- | :--- | :--- | :--- |
| **Variação de prazos** | $VPr = VA - VP$ | $21,0 - 45,0 = -24,0 \text{ h}$ | $35,3 - 67,6 = -32,3 \text{ h}$ |
| **Variação de custos** | $VC = VA - CR$ | $21,0 - 34,0 = -13,0 \text{ h}$ | $35,3 - 57,0 = -21,7 \text{ h (est.)}$ |
| **IDP** | $VA \div VP$ | $21,0 \div 45,0 = \mathbf{0,47}$ | $35,3 \div 67,6 = \mathbf{0,52}$ |
| **IDC** | $VA \div CR$ | $21,0 \div 34,0 = \mathbf{0,62}$ | $35,3 \div 57,0 = \mathbf{0,62 \text{ (est.)}}$ |

### Sensibilidade ao crédito

| Crédito (desenvolvimento) | VA (h) | IDP | IDC com CR 34,0 h (oficial) | IDC com CR 42,5 h (inclui pré-baseline) |
| :--- | :--- | :--- | :--- | :--- |
| **Oficial (3.1, 4.1, 5.1, 5.2, 6.1)** | 21,0 | 0,47 | 0,62 | 0,49 |
| **Estrito (sem 6.1)** | 17,5 | 0,39 | 0,51 | 0,41 |
| **Patrocinador aceita 2.1 e 7.1 como estão** | 32,5 | 0,72 | 0,96 | 0,76 |

- **Situação oficial do projeto (CR 57,0 h, est.):** com o pacote 1.1 verificado e aceito pelo professor responsável, o VA do projeto passa a ser 35,3 h, resultando em **IDP = 0,52** e **IDC = 0,62**.
- **Cenário hipotético complementar:** caso o pacote 1.2 também venha a ser verificado, o VA do projeto atingirá 43,6 h, com IDP = 0,64 e IDC = 0,76.

### Previsão (BAC do desenvolvimento = 45,0 h)

| Premissa | Fórmula | Memória | EPT (h) | ENT (h) | VAC (h) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. O IDC atual se mantém** | $ENT = BAC \div IDC$ | $45,0 \div 0,6176 = 72,9; 72,9 - 34,0$ | 38,9 | 72,9 | $-27,9$ |
| **2. Desvio pontual; o restante segue o orçamento (teto)** | $ENT = CR + (BAC - VA)$ | $34,0 + (45,0 - 21,0)$ | 24,0 | 58,0 | $-13,0$ |
| **3. Estimativa preliminar da GPTI (adotada, a validar)** | $ENT = CR + ETC$ | $34,0 + 10,0$ | 10,0 | 44,0 | $+1,0$ |

A premissa 3 é a adotada porque o trabalho restante é, em sua maior parte, verificar e corrigir pacotes já construídos, e a premissa 1 extrapola uma ineficiência que vem sobretudo de pacotes sem crédito (23,5 de 34,0 h). A premissa 2 fica como cenário de risco. Dois alertas: a estimativa vem da GPTI, não dos donos; e o CR por commit pode estar subapontado (3.1 a 5.2 têm 7,0 h contra 17,5 h planejadas), o que elevaria o ENT (ISS-08). A contingência de 16,2 h cobre o teto de +13,0 h (saldo de 3,2 h); a premissa 1 (+27,9 h) excede contingência mais reserva de gerenciamento (23,2 h) em 4,7 h. Projeto, com a premissa 3: $ENT = 57,0 + 11,0 = 68,0 \text{ h}$ contra 67,6 h de BAC (+0,4 h, dentro da tolerância de 8,4 h). O Marco 2 não tem BAC aprovado e, portanto, não tem EPT nem ENT oficiais.

---

## E. Gestão de Recursos e Capacidade

| Pessoa | Equipe e papel | Planejado E1 (h) | E1 apontado, 30/09 a 06/10 (h) | Pré-baseline (h) | Marco 2, 31/10 (h) | Total (h) | Desvio E1 | Situação |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Rafael Duarte Yahata** | PSW, dados e veículos | 15,0 | 27,5 | 8,5 | 8,5 | 44,5 | +12,5 | Horas confirmadas por ele |
| **Gabriel Felipe Martins da Silva** | PSW, itens, alertas e custos | 15,0 | 4,5 | 0,0 | 0,0 | 4,5 | −10,5 | Só repositório; confirmar |
| **Rafael Voigt Villas Boas** | PSW, kit visual e serviços | 15,0 | 2,0 | 0,0 | 0,0 | 2,0 | −13,0 | Só repositório; confirmar |
| **Patrick Cruz Azevedo** | GPTI, GP | 4,5 | 5,5 (est.) | — | — | 5,5 (est.) | +1,0 | Estimada; confirmar |
| **Hugo Lima de A. A. Aguiar** | GPTI, escopo e qualidade | 4,5 | 4,5 (est.) | — | — | 4,5 (est.) | 0,0 | Estimada; confirmar |
| **Ronald Teixeira de Assis** | GPTI, cronograma e finanças | 4,5 | 7,0 (est.) | — | — | 7,0 (est.) | +2,5 | Estimada; confirmar |
| **Rodrigo Americo N. D'Icarahy** | GPTI, comunicação | 4,5 | 2,5 (est.) | — | — | 2,5 (est.) | −2,0 | Estimada; confirmar |
| **Thiago Souza da Silva** | GPTI, riscos e recursos | 4,5 | 3,5 (est.) | — | — | 3,5 (est.) | −1,0 | Estimada; confirmar |
| **Total** | | **67,6** | **57,0** | **8,5** | **8,5** | **74,0** | **−10,6** | |

Planejado: Plano §7 (45,0 h de desenvolvimento $\div 3$ e 22,6 h de gestão $\div 5$, arredondado para 4,5 h). Desvio negativo não é economia: significa pacote sem verificação ou hora não registrada. Entre os desenvolvedores, o Rafael responde por 80,9% do CR da Entrega 1 (27,5 de 34,0 h); com as horas estimadas da GPTI, por 60,1% do total apontado (44,5 de 74,0 h).

### Balanço de capacidade restante

| Item | Cálculo | Valor |
| :--- | :--- | :--- |
| **Horas restantes, Entrega 1 (teto)** | $BAC - VA$, desenvolvimento | 24,0 h |
| **Horas restantes, Entrega 1 (estimativa preliminar)** | ETC de 2.1, 2.2, 7.1, 7.2, 7.3 e 7.4 | 10,0 h (est.) |
| **Horas restantes, Marco 2** | M2.2 a M2.5 | 21,0 h (est.) |
| **Desenvolvimento restante (estimativa)** | $10,0 + 21,0$ | 31,0 h |
| **Disponibilidade, premissa da GPTI** | 4 h por semana $\times 3$ desenvolvedores | 12 h/semana, `[CONFIRMAR por pessoa]` |
| **Tempo a 12 h/semana** | $31,0 \div 12$ | cerca de 2,6 semanas ($\approx$ 20/11) |
| **Tempo a 6 h/semana** | $31,0 \div 6$ | cerca de 5,2 semanas ($\approx$ 08/12) |
| **Tempo só com o Rafael a 4 h/semana** | $31,0 \div 4$ | cerca de 7,8 semanas |
| **Ritmo observado** | 8,5 h em cerca de 4 semanas (07/10 a 02/11), todas do Rafael | 2,1 h/semana ($31,0 \div 2,125 \approx 14,6$ semanas) |
| **Referência do Plano** | 3 desenvolvedores $\times 15 \text{ h}$, em uma semana de entrega | 45 h/semana ($\approx$ 0,7 semana) |

Os tempos são limites, não previsões: a referência de 45 h/semana vem de uma semana de entrega apertada e não é disponibilidade sustentada. Contra o prazo adotado do Marco 2 (02/11 às 18:30), a capacidade não cobre as 21,0 h restantes: a 12 h/semana, o Marco 2 termina por volta de 14/11, e Entrega 1 e Marco 2 juntos (31,0 h) por volta de 20/11.

---

## F. Registros de Gestão

### Registro de Questões

| ID | Descrição | Dono | Data limite | Impacto |
| :--- | :--- | :--- | :--- | :--- |
| **ISS-01** | Apontamento por aluno e atividade incompleto: horas da PSW reconstituídas por commit e horas da GPTI estimadas. O prazo de 16/10 venceu. | Ronald Teixeira / Rafael Yahata | 06/11 | Custo |
| **ISS-02** | Cinco pacotes sem verificação do critério do Dicionário (1.2, 2.2, 7.2, 7.3, 7.4) — pacote 1.1 verificado e aceito pelo professor — e dois com critério não atendido (2.1, 7.1). Nomes e critérios do SR1 divergem do Dicionário. | Hugo Lima | 09/11 | Escopo e prazo |
| **ISS-03** | Custo: IDC 0,62 (desenvolvimento) e 0,62 (projeto, est.); VC −13,0 h. A projeção vai de 44,0 h (preliminar) a 58,0 h (teto, +13,0 h, acima da tolerância de 8,4 h). | Ronald Teixeira | 06/11 | Custo |
| **ISS-04** | Horas da GPTI todas estimadas; Gabriel e Voigt sem horas após 06/10 e sem confirmação das anteriores. | Thiago Souza | 06/11 | Custo e prazo |
| **ISS-05** | Marco 2 com prazo adotado em 02/11 às 18:30, só M2.1 concluída e sem caminho crítico aprovado; 0 h apontadas de 07/10 a 30/10; o back-end só tem veículos, e faltam itens, serviços, alertas, JWT e carga inicial, que dependem de frentes sem registro. | Patrick Cruz | 06/11 | Prazo |
| **ISS-06** | Concentração de esforço: Rafael com 80,9% do CR da Entrega 1; pacotes 2.1 e 6.1 executados por quem não é o dono na RAM. | Patrick Cruz | 09/11 | Prazo e risco |
| **ISS-07** | Atraso no caminho crítico da Entrega 1: pacotes terminaram de 1 a 5 dias depois do v1.1 (2.1 e 5.1: +5 d), acima da tolerância de 1 dia do GP. O fim em 06/10 foi mantido por compressão das etapas finais. | Patrick Cruz | 06/11 | Prazo |
| **ISS-08** | Possível subapontamento do CR: 3.1 a 5.2 com 7,0 h contra 17,5 h planejadas (commit único de 4,5 h em `0d6897a`). O CR por commit é reconstituição. | Ronald Teixeira, com os autores | 06/11 | Custo e previsão |

### Registro de Mudanças

| ID | Descrição | Status | Impacto |
| :--- | :--- | :--- | :--- |
| **M-01** | Replanejamento do cronograma v1.0 para v1.1 (04/10), incorporado ao Plano v1.2. | Aprovada pelo patrocinador (informado pelo grupo em 02/11). | Prazo: recupera 4 dias, sem custo adicional. Não altera o VP em 02/11. |
| **CR-02** | Início do Marco 2 (31/10, 8,5 h), fora da EAP e sem Solicitação de Mudança. Proposta de baseline: pacotes M2.1 a M2.5, 29,5 h (8,5 h realizadas + 21,0 h est.), referência de R$ 295,00, com critérios de aceite e prazo de 02/11 às 18:30 (premissa do grupo). | Pendente; baseline original mantida. | Escopo: novos pacotes sem EAP. Custo: +8,5 h sem VA. Prazo: 02/11 às 18:30, vence sem M2.2 a M2.5. |

### Decisões pedidas ao Patrocinador

| # | Decisão | Opções e efeito em horas |
| :---: | :--- | :--- |
| **D1** | Marco 2 (CR-02): baseline | **(a)** Aprovar o CR-02 com EAP M2.1 a M2.5, 29,5 h e data: as 8,5 h passam a CR do Marco 2 e a Entrega 1 fica com CR de 34,0 h.<br>**(b)** Não aprovar ou adiar: as 8,5 h ficam como esforço sem VA (51,0 h apontadas pelos desenvolvedores e 74,0 h com a GPTI estimada) e o grupo suspende o Marco 2 até a decisão. |
| **D2** | Custo da Entrega 1 (tolerância de 8,4 h) | **(a)** Manter 45,0 h e reavaliar quando os donos validarem o ETC (preliminar: ENT 44,0 h).<br>**(b)** Autorizar desde já estouro de até 13,0 h (teto), coberto pela contingência, com saldo de 3,2 h.<br>**(c)** Não autorizar: o grupo congela novas horas na Entrega 1, o VA permanece em 21,0 h e 24,0 h do orçamento ficam sem execução. |
| **D3** | Aceite do Marco 1 (a verificação é do grupo; o aceite é do patrocinador) | **(a)** Recomendação do grupo: aceitar 3.1, 4.1, 5.1, 5.2 e 6.1 e manter 2.1 e 7.1 abertos: VA 21,0 h, IDC 0,62, com ETC preliminar de 5,0 h (2,0 + 3,0) contra 11,5 h de orçamento.<br>**(b)** Dispensar os critérios de 2.1 e 7.1 por decisão registrada: VA 32,5 h, IDC 0,96. |
| **D4** | Prazo e escopo do Marco 2 | O prazo adotado (02/11 às 18:30) vence sem M2.2 a M2.5.<br>**(a)** Replanejar: a 12 h/semana, cerca de 14/11 para o Marco 2 e cerca de 20/11 junto com a Entrega 1.<br>**(b)** Manter a data e reduzir o escopo do Marco 2 ao que couber.<br>**(c)** Manter data e escopo e registrar o atraso. |

### Próximas Ações

| Ação | Responsável | Prazo |
| :--- | :--- | :--- |
| **A-01** Reconstituir as horas reais da GPTI por atividade desde 30/09, para substituir as estimativas | Thiago Souza, com Patrick, Hugo, Ronald e Rodrigo | 06/11/2026 |
| **A-02** Planilha única de horas por pessoa e atividade; Gabriel e Voigt confirmam suas horas; dividir os commits agrupados de 3.1 a 5.2; Rafael confirma que nenhuma hora de 05 a 09/10 caiu depois de 06/10 | Ronald Teixeira, Rafael Yahata | 06/11/2026 |
| **A-03** Donos validam o ETC (10,0 h da Entrega 1 e 21,0 h do Marco 2) e a disponibilidade semanal; montar o caminho crítico do Marco 2 | Rafael Yahata, Rafael Voigt, Gabriel Felipe | 06/11/2026 |
| **A-04** Reverificar 2.1, 6.1 e 7.1 e verificar 2.2, 7.2, 7.3 e 7.4 contra o Dicionário, por pessoa diferente de quem executou; alinhar os nomes dos pacotes do SR1 | Hugo Lima | 09/11/2026 |
| **A-05** Confirmar com o professor o prazo do Marco 2 (adotado: 02/11 às 18:30) e enviar o CR-02 com pacotes, critérios e horas | Patrick Cruz | antes da entrega deste relatório |
| **A-06** Verificação do pacote 1.1 (AV1) concluída e confirmada pelo professor responsável, que validou e aceitou a entrega dos artefatos. | Patrick Cruz | Concluída em 02/11/2026 |

---

## Pendências do grupo antes de entregar (remover antes do envio)

- Escopo de M2.2 a M2.5, confirmação do prazo adotado do Marco 2 (02/11 às 18:30) e disponibilidade por pessoa.
- Substituir as horas da GPTI (est.) pelas reais, ou aprovar as estimativas como premissa declarada.
- Confirmação das horas de Gabriel e Voigt, divisão das horas de 3.1 a 5.2 e checagem das datas dos 11,5 h do Rafael.
- Validação dos donos para o ETC (est.).
- `[REMOVIDA - Verificação do pacote 1.1 concluída e aceite confirmado pelo professor. Manter registro formal do e-mail/mensagem no arquivo do projeto]`.
- Revisão dos faróis e do limite de 0,90 pelo grupo. As leituras dos índices e as decisões pedidas são de vocês.
- Conferir cada índice a partir das tabelas; os números deste documento foram recalculados, mas o mapeamento commit-pacote e as horas de `mudancas/horas-dev.md` não foram verificados contra o repositório.

---

## Fontes

Plano do Projeto v1.2, Termo de Abertura v1.2, Dicionário da EAP, Business Case v2.0, `docs/cronograma.md`, `entrega-avaliacao.md`, `mudancas/horas-dev.md` e `CHANGELOG.md` (repositório `YahataRD/AUTOCUIDA-PSW`, git log até 31/10/2026); Relatório de Verificação do Escopo (Marco 1, 06/10/2026); mensagem de Rafael Yahata com horas de 05 a 09/10 e 31/10.