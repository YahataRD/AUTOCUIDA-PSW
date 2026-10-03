# Plano do Projeto (integrado) — AutoCUIDA

Versão 1.1 — 30/09/2026 (replanejamento M-01, seção 13). Siglas de pessoas na seção 11.
Este plano integra os componentes abaixo; a seção 15 mostra as ligações.

## 1. Abordagem e ciclo de vida: híbrida
| Parte do trabalho | Abordagem | Evidência |
|---|---|---|
| Marcos, escopo, prazo e horas | Preditiva | Data final fixa (06/10); linhas de base de escopo, prazo e custo |
| Telas e interação | Adaptativa | Kit visual em definição; formulários e navegação refinados a cada dia com demonstração à equipe |
| Regras de alerta | Preditiva com testes | Regra definida (maior desgaste entre km e tempo), mas com falhas conhecidas (arredondamento, retroatividade, calendário) |

## 2. Governança
- *Patrocinador* (Prof. Diogo Silveira Mendonça, professor de GPTI e de PSW): aprova termo, plano e mudanças; autoriza a conclusão.
- *GP:* coordena a equipe de gerenciamento; autoridade baixa (estrutura funcional), governa por negociação e depende de patrocinador ativo.
- *Coordenação mista:* gerência centralizada no GP; desenvolvimento auto-organizado dentro das fatias verticais da RAM.
- *Quem decide adiar, encerrar ou expandir:* o patrocinador, com informação do GP (caminho crítico, horas consumidas, resultado do roteiro T01–T23).
- *Tolerâncias:* o GP decide atraso de até 1 dia e uso da contingência. Vão ao patrocinador: atraso maior que 1 dia, estouro acima de 8,4 h (10% da linha de base) e reserva de gerenciamento.
- *Indicadores de antecipação:* (a) pacote do caminho crítico sem commit no dia planejado; (b) integrante (desenvolvedor ou gerente) sem commit por 48 h; (c) gatilhos do repositório: tema e painel indisponíveis, contrato de dados indefinido.
- *Indicadores de atraso:* variação de cronograma (dias) e horas reais menos linha de base.
- *Feedback:* lições aprendidas ao encerrar.

## 3. Ambiente
- *Fatores ambientais (fora do controle):* datas da disciplina; provas e entregas de outras disciplinas; Node.js 22.12 ou superior; avaliação por commits individuais; ausência de rubrica formal; orientação da disciplina de PSW de usar um único kit visual.
- *Ativos de processo:* README.md, docs/cronograma.md, Descrição do Protótipo (b59f1ab), validação de requisitos (d7e5b6f), escopo e roteiro de aceite T01–T23 (b75f7c2 e 81e55d3), CONTRIBUTING (81e55d3).

## 4. Requisitos e rastreabilidade
Necessidade e solução separadas: React, Vite e o kit visual são decisões de solução.

| ID | Tipo | Requisito | Origem | UC | Pacote |
|---|---|---|---|---|---|
| REQ-01 | Negócio | Reduzir revisões esquecidas ou vencidas | Proprietário, gestor de pequena frota | — | 6.1 |
| REQ-02 | Negócio | Tornar visível o gasto com manutenção preventiva e corretiva | Proprietário, gestor de pequena frota | — | 5.2 |
| REQ-03 | Usuário | Ver num painel a situação de cada item (Em dia, Próximo, Vencido) e filtrar por situação | Proprietário | UC13 | 2.1, 6.1 |
| REQ-04 | Usuário | Registrar serviço preventivo ou corretivo com item, data, km, valor e oficina | Proprietário | UC09, UC10 | 5.1 |
| REQ-05 | Usuário | Atualizar o odômetro e ver os alertas recalculados | Proprietário | UC15 | 3.1 |
| REQ-06 | Funcional | Criar, consultar, editar e inativar veículos, com placa única e sem perder histórico | Proprietário | UC01–04 | 3.1 |
| REQ-07 | Funcional | Criar, editar e remover itens com regra por km e/ou tempo (ao menos um intervalo positivo), preservando o histórico | Proprietário | UC05–08 | 4.1 |
| REQ-08 | Funcional | Editar e excluir serviços recalculando referência do item, alertas e custos | Proprietário | UC11, UC12 | 5.1 |
| REQ-09 | Funcional | Classificar pelo maior desgaste entre km e tempo (Em dia <80%, Próximo 80% a <100%, Vencido ≥100%), usando o percentual não arredondado | Equipe (README, escopo) | UC13 | 6.1 |
| REQ-10 | Funcional | Dar baixa em alerta só por serviço válido; aceitar retroativo coerente e rejeitar inconsistência | Descrição do Protótipo | UC14 | 6.1 |
| REQ-11 | Usuário | Consultar total gasto, distribuição por tipo, últimos seis meses (incluindo meses sem gasto) e histórico | Proprietário, gestor de pequena frota | UC10, UC16 | 5.2 |
| REQ-12 | Não funcional | Telas usáveis em 360, 768 e 1280 px e operáveis pelo teclado, com erros associados aos campos | Equipe (mobile-first) | — | 7.1 |
| REQ-13 | Não funcional | Estados de carga, erro (com nova tentativa), vazio, sucesso e validação | Equipe | — | 2.2 |
| REQ-14 | Restrição | Entrega 1 sem back-end, banco ou autenticação; perfil proprietário; dados em memória | Grupo, patrocinador | — | 2.2 |
| REQ-15 | Restrição | Um único kit visual | Disciplina de PSW | — | 2.1 |
| REQ-16 | Restrição | Instalar com npm ci e Node.js 22.12 ou superior; build sem erro | README | — | 7.4 |
| — | Órfão | Notificações, integração com oficinas, sincronização | Sem origem no termo | — | *Fora do escopo* |

Pendência de especificação: permissões de gestor de frota e condutor, e a seção "Observações" da matriz de perfis (contém só "?").

## 5. Escopo (declaração e linha de base)
- *Objetivo:* entregar até 06/10/2026 o front-end do AutoCUIDA com dados locais, cobrindo UC01–UC16.
- *Produto:* painel, garagem (veículos e odômetro), itens, registro de serviço e histórico, alertas e custos.
- *Projeto:* gestão, base da aplicação, qualidade, aceite, README e entrega.
- *Exclusões e opcionais:* ver Termo, seção 4.
- *Aceite geral:* definição de "front-end completo" (checklist do escopo) e critérios do Dicionário da EAP.
- *Linha de base do escopo:* declaração + EAP + dicionário; só muda com aprovação do patrocinador.

## 6. EAP (orientada a entregas)

AutoCUIDA — Entrega 1 (front-end com dados locais)
├── 1. Gestão do projeto
│   ├── 1.1 Planejamento e artefatos da AV1
│   └── 1.2 Monitoramento, comunicação e mudanças
├── 2. Base da aplicação
│   ├── 2.1 Kit visual, tema, navegação e painel base
│   └── 2.2 Dados por veículo, carga local, estados e URLs
├── 3. Veículos
│   └── 3.1 Gestão de veículos e odômetro (UC01–04, UC15)
├── 4. Itens de manutenção
│   └── 4.1 Itens e regras (UC05–08)
├── 5. Serviços e custos
│   ├── 5.1 Registro, histórico, edição e exclusão (UC09–12)
│   └── 5.2 Custos integrados (UC16)
├── 6. Alertas
│   └── 6.1 Regras, baixa e filtros (UC13–14)
└── 7. Qualidade e entrega
    ├── 7.1 Responsividade e acessibilidade
    ├── 7.2 Roteiro de aceite T01–T23
    ├── 7.3 Correções, documentação e ensaio
    └── 7.4 Conferência e entrega

Mitigações com trabalho certo estão nos pacotes: R1 em 2.2 (contrato de dados), R2 em 6.1 (testes antes da regra), R3 em 2.1 (kit decidido), R4 e R6 em 1.2 (PRs pequenos e conferência de commits), R5 em 7.4 (clone limpo), R7 em 1.2 (validação com o patrocinador).

## 7. Cronograma
*Gestão do cronograma:* unidade = dia de trabalho do grupo (fins de semana de 03–04/10 incluídos). Atraso maior que 1 dia vira mudança. Status diário com o caminho crítico. O docs/cronograma.md do repositório deve ser atualizado com estas datas no mesmo commit.

*Variação e replanejamento (M-01):* a linha de base v1.0 (25/09) previa F01–F04 para 26–29/09. O repositório não registra commits depois de 25/09, então a variação (4 dias) passa da tolerância. A v1.1 mantém escopo e data final e recupera o prazo paralelizando pacotes independentes (mais gente não divide o prazo: o custo é coordenação, risco R1).

| Pacote | Etapa | Dur. (d) | Predecessores (término-início) | v1.1 | Folga (d) | v1.0 |
|---|---|---|---|---|---|---|
| 1.1 | AV1 | 5 | — | 30/09 a 04/10 (prazo 05/10 18:30) | 1 | — |
| 2.1 | F01 | 1 | — | 30/09 | 0 | 26/09 |
| 2.2 | F02 | 1 | — | 30/09 | 0 | 27/09 |
| 3.1 | F03 | 1 | 2.1, 2.2 | 01/10 | 1 | 28/09 |
| 4.1 | F04 | 1 | 2.1, 2.2 | 01/10 | 0 | 29/09 |
| 5.1 | F05 | 1 | 2.1, 2.2 | 01/10 | 0 | 30/09 |
| 6.1 | F06 | 1 | 4.1, 5.1 | 02/10 | 0 | 01/10 |
| 5.2 | F07 | 1 | 5.1 | 02/10 | 0 | 02/10 |
| 7.1 | F08 | 1 | 3.1, 5.2, 6.1 | 03/10 | 0 | 03/10 |
| 7.2 | F09 | 1 | 7.1 | 04/10 | 0 | 04/10 |
| 7.3 | F10 | 1 | 7.2 | 05/10 | 0 | 05/10 |
| 7.4 | F11 | 1 | 7.3 | 06/10 | 0 | 06/10 |

*Caminho crítico* (cadeias paralelas de mesma duração): 2.1/2.2 → 4.1/5.1 → 6.1/5.2 → 7.1 → 7.2 → 7.3 → 7.4 = *7 dias (30/09 a 06/10), sem folga*. A reserva de prazo é o pacote 7.3 (05/10), reservado para correções, que R1, R2 e R3 consomem. Folgas: 3.1 tem 1 dia (só precisa terminar antes de 7.1) e 1.1 tem 1 dia antes do prazo da AV1.

mermaid
flowchart LR
  P21["2.1 Kit e painel<br/>1 d"] --> P31["3.1 Veículos<br/>1 d"]
  P21 --> P41["4.1 Itens<br/>1 d"]
  P21 --> P51["5.1 Serviços<br/>1 d"]
  P22["2.2 Dados e URLs<br/>1 d"] --> P31
  P22 --> P41
  P22 --> P51
  P41 --> P61["6.1 Alertas<br/>1 d"]
  P51 --> P61
  P51 --> P52["5.2 Custos<br/>1 d"]
  P31 --> P71["7.1 Responsivo e acessível<br/>1 d"]
  P61 --> P71
  P52 --> P71
  P71 --> P72["7.2 Roteiro T01-T23<br/>1 d"]
  P72 --> P73["7.3 Correções e ensaio<br/>1 d"]
  P73 --> P74["7.4 Entrega<br/>1 d"]
  classDef crit stroke:#c00,stroke-width:3px;
  class P21,P22,P41,P51,P61,P52,P71,P72,P73,P74 crit;


*Linha de base do cronograma:* as datas v1.1, após aprovação do patrocinador; só mudam por controle de mudanças.

## 8. Finanças
*Gestão financeira:* unidade = hora-pessoa (sem desembolso). Estouro acima de 10% da linha de base (8,4 h) pede mudança. Relatório junto ao status diário.
*Estimativa:* três pontos, (O + 4M + P) / 6. Nos pacotes 2.1 a 7.4, O e P são as faixas do cronograma v1.0 (81e55d3) e M é o ponto médio (premissa). Em 1.1 e 1.2 são estimativas dos gerentes (opinião especializada), a validar.

| Pacote | O | M | P | Estimativa (h) |
|---|---|---|---|---|
| 1.1 AV1 | 10 | 14 | 20 | 14,3 |
| 1.2 Monitoramento e comunicação | 6 | 8 | 12 | 8,3 |
| 2.1 Kit e painel | 6 | 7 | 8 | 7,0 |
| 2.2 Dados e URLs | 4 | 5 | 6 | 5,0 |
| 3.1 Veículos | 4 | 5 | 6 | 5,0 |
| 4.1 Itens | 4 | 5 | 6 | 5,0 |
| 5.1 Serviços | 4 | 5 | 6 | 5,0 |
| 5.2 Custos | 2 | 2,5 | 3 | 2,5 |
| 6.1 Alertas | 3 | 3,5 | 4 | 3,5 |
| 7.1 Responsividade e acessibilidade | 4 | 4,5 | 5 | 4,5 |
| 7.2 Roteiro de aceite | 3 | 3,5 | 4 | 3,5 |
| 7.3 Correções e ensaio | 2 | 2,5 | 3 | 2,5 |
| 7.4 Conferência e entrega | 1 | 1,5 | 2 | 1,5 |

Os pacotes 2.1 a 7.4 somam 45,0 h. Com a etapa F00 (2 a 3 h, já concluída), chegam ao ponto médio de 47,5 h da faixa de 39 a 56 h do cronograma do grupo de PSW.

| Composição do orçamento | Horas |
|---|---|
| Soma dos pacotes (22,6 h de gestão + 45,0 h de desenvolvimento e qualidade) | 67,6 |
| + Reserva de contingência (riscos R1 a R7, seção 12) | 16,2 |
| *= Linha de base de custo* | *83,8* |
| + Reserva de gerenciamento (fora da linha de base; só o patrocinador libera) | 7,0 |
| *= Orçamento autorizado* | *90,8* |

## 9. Partes interessadas e engajamento
| Parte | Interesse | Poder | Impacto | Estratégia | Como engajar |
|---|---|---|---|---|---|
| Prof. Diogo Silveira Mendonça (patrocinador; professor de PSW e de GPTI) | Aceite da Entrega 1 e AV1 correta e no formato das aulas | Alto | Alto | Gerenciar de perto | Valida o critério de "front-end completo"; recebe status nos marcos; decide mudanças; recebe os artefatos da AV1 |
| Equipe de desenvolvimento (D1–D3) | Nota de PSW e portfólio | Alto | Alto | Gerenciar de perto | Decide dentro da sua fatia; status diário. PSW avalia o produto e GPTI avalia a gestão: alinhar prioridades no primeiro encontro |
| Equipe de gerenciamento (GP, G2–G5) | Nota de GPTI | Alto | Médio | Gerenciar de perto | Encontro diário curto; cada um responde por seu domínio |
| Proprietários de veículos | Controle de revisões e custos | Baixo | Alto | Manter informado | Persona/Usuário final principal do sistema. Validação da usabilidade por meio do README e da demonstração do produto. |
| Gestores de frota e condutores | Acompanhar vários veículos | Baixo | Médio | Monitorar | Perfis pendentes de especificação |
| Oficinas mecânicas | Aparecem no campo "oficina" | Baixo | Baixo | Monitorar | Sem contato ativo |

## 10. Comunicação (integrada ao engajamento)
| Para | O quê | Meio | Frequência | Responsável |
|---|---|---|---|---|
| Gerência | Status por pacote e bloqueios | Canal do grupo + Issues e PRs no GitHub | Diária até 18h, inclusive em 03–04/10 | D1–D3 |
| Equipe de gerenciamento | Caminho crítico, riscos, horas | Encontro curto | Diária, após o status | GP |
| Prof. Diogo (patrocinador) | Status resumido, demonstração e pedidos de mudança | E-mail ou aula + link do repositório | Em M1, M4 e M6, e sempre que houver mudança | GP |
| Prof. Diogo (avaliador da AV1) | Artefatos da AV1 | Teams (link da pasta docs/av1) | Uma vez, até 05/10 às 18:30 | GP |
| Usuários-alvo | Como usar e limitações | README e demonstração | Na entrega | D1–D3 |

## 11. Recursos
| Sigla | Pessoa | Função | Commita nos artefatos |
|---|---|---|---|
| GP | Patrick Cruz Azevedo | Gestão de Projeto, Integração e Interface com o Patrocinador | 02-termo-de-abertura.md; Plano §1–3 e §13–15 |
| G2 | Hugo Lima de Almeida Antunes Aguiar | Escopo e qualidade | Plano §4–6; 04-dicionario-da-eap.md |
| G3 | Ronald Teixeira de Assis | Cronograma e finanças | 01-business-case.md; Plano §7–8 |
| G4 | Rodrigo Americo Nascimento D'Icarahy | Partes interessadas e comunicação | Plano §9–10 |
| G5 | Thiago Souza da Silva | Riscos e recursos | Plano §11–12 |
| D1 | Rafael Duarte Yahata | Desenvolvimento: dados, veículos | código |
| D2 | Gabriel Felipe Martins da Silva | Desenvolvimento: itens, alertas, custos | código |
| D3 | Rafael Voigt Villas Boas | Desenvolvimento: kit visual e serviços | código |

*RAM* (R faz; A presta contas, um por pacote; C consultado; I informado). Fatias verticais por funcionalidade, não por camada.

| Pacote | GP | G2 | G3 | G4 | G5 | D1 | D2 | D3 | Patroc. |
|---|---|---|---|---|---|---|---|---|---|
| 1.1 | A/R | R | R | R | R | C | C | C | C |
| 1.2 | A | C | R | R | R | C | C | C | I |
| 2.1 | I | C | I | I | I | C | I | A/R | I |
| 2.2 | I | C | I | I | I | A/R | R | C | I |
| 3.1 | I | C | I | I | I | A/R | C | C | I |
| 4.1 | I | C | I | I | I | C | A/R | I | I |
| 5.1 | I | C | I | I | I | I | C | A/R | I |
| 5.2 | I | C | I | I | I | C | A/R | C | I |
| 6.1 | C | C | I | I | I | C | A/R | I | I |
| 7.1 | I | A | I | I | I | R | R | R | I |
| 7.2 | I | A/R | I | I | I | R | R | R | I |
| 7.3 | A | C | I | I | I | R | R | R | I |
| 7.4 | A | C | I | I | I | R | R | R | C |

O aceite final da Entrega 1 é do patrocinador.
*Fazer ou comprar:* fazer telas e regras com a equipe; reusar gratuitamente o kit visual e bibliotecas open source; sem hospedagem contratada.

## 12. Riscos
Escalas: probabilidade Alta 70%, Média 40%, Baixa 20%. Impacto Alto = atrasa o caminho crítico ou compromete a entrega; Médio = consome folga; Baixo = sem efeito no prazo.

| ID | Tipo | Causa → Evento → Efeito | P | I | Tratamento |
|---|---|---|---|---|---|
| R1 | Ameaça | Paralelizar 2.1/2.2 e 3.1/4.1/5.1 para recuperar 4 dias → modelos de dados incompatíveis entre telas → retrabalho e atraso do caminho crítico | Média | Alto | *Mitigar:* fixar em 2.2 o contrato de dados (veículo, item, registro, referência inicial) e revisar por PR. *Contingência:* sessão conjunta de integração e uso de 7.3 |
| R2 | Ameaça | Percentual arredondado antes de classificar (confirmado em maintenance.js) e tempo por mês médio → classe errada (79,9% vira 80%) ou retroativo mal tratado → falso alerta e retrabalho em 6.1, 5.1 e 5.2 | Média | Alto | *Mitigar:* escrever os casos T15–T17 antes de alterar a função. *Contingência:* reescrever calculateMaintenance com percentual real e data de calendário |
| R3 | Ameaça | Kit visual ainda não escolhido (o package.json não tem kit; o gatilho "tema e painel indisponíveis" já ocorreu) → migração consome o dia → 2.1 atrasa e bloqueia 3.1, 4.1 e 5.1 | Alta | Alto | *Mitigar:* decidir e registrar o kit em 2.1, com componentes padrão e sem personalização extra. *Contingência:* manter o CSS próprio nas telas restantes e registrar como limitação |
| R4 | Ameaça | 3 desenvolvedores em App.jsx (estado compartilhado) com commits grandes → conflitos de merge → retrabalho e histórico ruim | Média | Médio | *Mitigar:* uma branch por pacote, PRs curtos, um responsável por App.jsx. *Contingência:* sessão conjunta de resolução |
| R5 | Ameaça | README exige Node.js 22.12 ou superior → ambiente de quem avalia sem essa versão → build não roda | Baixa | Alto | *Mitigar:* testar clone limpo em 7.4. *Contingência:* instruções com nvm ou build pronto |
| R6 | Ameaça | Hoje 100% dos commits são de um autor → algum dos 8 integrantes segue sem commit próprio até 05/10 → nota invalidada pela regra do professor | Média | Alto | *Mitigar:* coluna "Commita" da seção 11, PR por pessoa, conferir git shortlog -sne em 04/10. *Contingência:* commit real de revisão do artefato antes do prazo |
| R7 | Ameaça | Sem rubrica formal ("front-end completo" definido pelo grupo) → patrocinador espera outro critério → entrega vista como incompleta | Baixa | Alto | *Mitigar:* validar o checklist de "front-end completo" com o patrocinador até 01/10. *Contingência:* escalar e tratar como mudança de escopo |
| R8 | Oportunidade | Componentes prontos do kit (formulário, diálogo de confirmação, gráfico) → menos código em 3.1 a 5.2 → folga em 7.3 | Média | Médio | *Explorar:* adotar diálogos e formulários do kit desde 2.1 |

Aceito conscientemente, sem reserva: dados em memória, restaurados ao recarregar (já documentado no README).

*Reserva de contingência* = probabilidade × (custo da mitigação + custo da contingência):

| Risco | Mitigação (h) | Contingência (h) | Total (h) | P | Reserva (h) |
|---|---|---|---|---|---|
| R1 | 3 | 6 | 9 | 40% | 3,6 |
| R2 | 3 | 5 | 8 | 40% | 3,2 |
| R3 | 2 | 4 | 6 | 70% | 4,2 |
| R4 | 1,5 | 3 | 4,5 | 40% | 1,8 |
| R5 | 1 | 2 | 3 | 20% | 0,6 |
| R6 | 2 | 3 | 5 | 40% | 2,0 |
| R7 | 1 | 3 | 4 | 20% | 0,8 |
| *Total* | | | | | *16,2 h* |

A oportunidade R8 não abate orçamento. R1, R2 e R3 consomem também a reserva de prazo (7.3).
*Risco geral do projeto:* alto, porque a data é fixa, o caminho crítico não tem folga e a variação de 4 dias já ocorreu. Se em 04/10 o roteiro T01–T23 não estiver executado, o patrocinador decide entre cortar opcionais e renegociar a data.

## 13. Qualidade e controle de mudanças
- Qualidade entra no processo: aceite observável por pacote (Dicionário), revisão por PR e roteiro T01–T23.
- *Mudança:* todo pedido fora da linha de base vira Issue, é avaliado pelo GP e, passando da tolerância, decidido pelo patrocinador. Aprovada, atualiza EAP, dicionário, cronograma e orçamento juntos.
- *M-01 (30/09):* replanejamento do cronograma (seção 7). Impacto: escopo e data final inalterados; custo dentro da contingência de R1. Decisão do patrocinador (Prof. Diogo): [aprovado / rejeitado] em _/_.

## 14. Uso de IA e revisão humana
Rascunho assistido por IA e revisado pela equipe, conferido contra o repositório (código, histórico e documentos). *Recusado:* (1) um rascunho anterior que tratava o AutoCUIDA como app de hábitos e humor, por não corresponder ao repositório; (2) [PREENCHER: outros itens alterados ou recusados]. Revisado por: [PREENCHER] em [PREENCHER].

## 15. Integração: como os componentes se conectam
| Se muda... | Então revisar... |
|---|---|
| Requisito (seção 4) | Pacote na EAP → aceite no dicionário → estimativa e cronograma |
| Duração de pacote do caminho crítico | Reserva de prazo (7.3) → status ao patrocinador → mudança, se passar de 1 dia |
| Risco (seção 12) | Reserva de contingência (seção 8) → pacote e aceite afetados → cronograma |
| Responsável (RAM) | Datas por pessoa → engajamento, comunicação e coluna "Commita" |