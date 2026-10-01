# Business Case — AutoCUIDA

| | |
|---|---|
| Projeto | AutoCUIDA (PSW), gerenciado pelo Grupo H de GPTI |
| Repositório | https://github.com/YahataRD/AUTOCUIDA-PSW |
| Versão | 1.1 — 30/09/2026 |
| Autores | Equipe de gerenciamento: Patrick Cruz Azevedo (GP), Ronald Teixeira de Assis, Hugo Lima de Almeida Antunes Aguiar, Rodrigo Americo Nascimento D'Icarahy, Thiago Souza da Silva |
| Equipe de desenvolvimento (PSW Grupo 7) | Rafael Duarte Yahata, Gabriel Felipe Martins da Silva, Rafael Voigt Villas Boas |

## 1. Necessidade de negócio
Proprietários de veículos e gestores de pequenas frotas enfrentam custos altos com reparos corretivos não planejados, causados pelo esquecimento de revisões periódicas (óleo, pastilhas de freio, correias). Hoje dependem da memória, de cadernos ou de adesivos no para-brisa. As datas e quilometragens limite passam despercebidas e geram quebras, riscos de segurança e gastos que o grupo estima serem até três vezes maiores que os da manutenção preventiva (hipótese do grupo, sem fonte; validar antes da entrega).

## 2. Estados
- *Atual:* controle por memória, caderno ou adesivo, sem cálculo de desgaste por km e tempo e sem visão de custos.
- *Transição:* Entrega 1, front-end com dados simulados, prevista para 06/10/2026.
- *Futuro:* aplicação com back-end, banco, autenticação e persistência (etapa posterior, sem data).

## 3. Valor esperado
Permitir que o proprietário saiba, num só painel, quais itens de manutenção estão em dia, próximos ou vencidos e quanto já gastou, para preferir a manutenção preventiva.

| Tipo | Valor | Como se observa |
|---|---|---|
| Tangível | Situação calculada de cada item e total gasto por tipo e por mês (últimos seis meses) | Painel e tela de Custos na demonstração |
| Intangível | Previsibilidade e segurança na manutenção; aprendizado e portfólio da equipe | Aceite do patrocinador; commits de cada integrante |

## 4. Corrente de valor
| Elo | No AutoCUIDA |
|---|---|
| Saída | Front-end mobile-first com os fluxos de veículo e odômetro, registro de manutenção, painel de alertas e relatório de custos (UC01–UC16), testado |
| Entrega | Versão identificada por commit, instalável pelo README, apresentada e aceita em 06/10/2026 |
| Resultado | Acompanhar itens, alertas e custos de cada veículo em uma só ferramenta |
| Benefício | Menos revisões vencidas sem percepção; decisões com base em custo real. Com dados simulados o benefício é demonstrado, não realizado |
| Desbenefício | Alerta calculado errado gera falsa segurança; horas tiradas de outras disciplinas; dados simulados podem parecer produto pronto |

## 5. Alternativas
- *A — Manter o controle manual* (memória, caderno, planilha): sem custo, mas sem cálculo por km e tempo e sem visão de custos.
- *B — Usar aplicativo existente:* rápido, mas não atende ao trabalho de PSW e não permite adaptar as regras de alerta.
- *C — Desenvolver o AutoCUIDA* (React + Vite, dados simulados agora, back-end depois): atende à necessidade e à disciplina, ao custo de horas da equipe.

Ser o trabalho de PSW é restrição eliminatória, por isso não é critério. Notas de 1 a 5, julgamento da equipe, sujeitas a revisão por pares.

| Critério | Peso | A | B | C |
|---|---|---|---|---|
| Aderência à necessidade (km + tempo + custos) | 4 | 2 | 4 | 5 |
| Viabilidade no prazo e risco técnico | 3 | 5 | 4 | 3 |
| Custo (horas e dinheiro) | 2 | 5 | 3 | 3 |
| Controle sobre a evolução das regras | 2 | 1 | 1 | 5 |
| *Total (máx. 55)* | | *35* | *36* | *45* |

VPL, TIR e payback não se aplicam: não há receita nem desembolso; o custo é esforço.

## 6. Custo, benefício e risco
- *Custo:* 83,8 h-pessoa na linha de base (67,6 h de trabalho + 16,2 h de contingência) e 90,8 h autorizadas com a reserva de gerenciamento. Sem desembolso financeiro.
- *Benefício:* seções 3 e 4.
- *Riscos principais:* integração do trabalho em paralelo (R1), regra de alertas (R2), kit visual (R3), histórico individual de commits (R6). Detalhes no Plano do Projeto.

## 7. Recomendação
Opção C. O trade-off aceito é não ter back-end nem persistência agora, em troca de valor visível e demonstrável na data fixa de 06/10/2026.
