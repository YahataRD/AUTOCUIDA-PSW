# Termo de Abertura do Projeto — AutoCUIDA

| | |
|---|---|
| Patrocinador | Prof. Diogo Silveira Mendonça |
| Gerente do projeto (GP) | Patrick Cruz Azevedo |
| Equipe de gerenciamento (GPTI Grupo H) | Ronald Teixeira de Assis, Hugo Lima de Almeida Antunes Aguiar, Rodrigo Americo Nascimento D'Icarahy, Thiago Souza da Silva |
| Equipe de desenvolvimento (PSW Grupo 7) | Rafael Duarte Yahata, Gabriel Felipe Martins da Silva, Rafael Voigt Villas Boas |
| Início | 25/09/2026 |
| Versão | 1.1 — 30/09/2026 |

## 1. Valor esperado (uma frase)
Permitir que o proprietário de um veículo saiba, num só painel, quais manutenções estão próximas ou vencidas e quanto já gastou.

## 2. Caso de negócio resumido
Controlar a manutenção de cabeça, em cadernos ou adesivos, gera revisões vencidas e custos invisíveis. O AutoCUIDA reúne alertas por km e tempo, registro de serviços e custos numa aplicação web. Recomendada a Opção C do Business Case (01-business-case.md).

## 3. Objetivos mensuráveis e critérios de sucesso
| # | Objetivo | Medida | Quem valida |
|---|---|---|---|
| O1 | Front-end completo com dados locais até 06/10/2026 | UC01–UC16 demonstráveis; roteiro T01–T23 executado sem falha essencial | Patrocinador |
| O2 | Alertas corretos | T15–T17 aprovados (79,9%, 80%, 99,9%, 100%; fim de mês; serviço retroativo) | GP |
| O3 | Instalação reproduzível | T01 e T23: em clone limpo, seguindo só o README, npm ci e npm run build sem erro | GP |
| O4 | Participação individual rastreável | Cada um dos 8 integrantes com ao menos um commit próprio até 05/10 (git shortlog -sne) | Patrocinador |
| O5 | Artefatos da AV1 entregues | Business Case, Termo, Plano e Dicionário em docs/av1/, link postado no Teams até 05/10 às 18:30 | Prof. Diogo |

Sucesso = aceite formal da Entrega 1 pelo patrocinador com O1 a O4 atendidos.

## 4. Limites de escopo
*Dentro:* gestão de veículos (cadastro, seleção, edição, inativação, odômetro); itens de manutenção com regras por km e/ou tempo; registro, edição e exclusão de serviços; alertas e painel; custos e histórico; dados isolados por veículo; um único kit visual; mobile-first; estados de carga, erro e vazio; acessibilidade básica; README e build. Perfil proprietário, sem login.
*Fora:* API e back-end, banco de dados, autenticação real, autorização por perfil (gestor de frota e condutor não definidos), notificações por e-mail ou push, integração com oficinas, sincronização entre usuários.
*Opcional (só após o aceite essencial):* persistência em localStorage, exportação de relatório, filtros financeiros avançados.

## 5. Marcos de alto nível
| Marco | Cronograma v1.0 (25/09) | Cronograma v1.1 (30/09) |
|---|---|---|
| M0 — Termo, escopo e cronograma definidos | 25/09 | 25/09 (concluído) |
| M1 — Base pronta: kit, tema, painel, dados por veículo, carga local, URLs | 27/09 | 30/09 |
| M2 — Cadastros essenciais (veículos, itens, serviços) | 30/09 | 01/10 |
| M3 — Fluxo integrado do veículo aos custos | 02/10 | 02/10 |
| M4 — Congelamento funcional e roteiro T01–T23 executado | 04/10 | 04/10 |
| M5 — Correções, documentação e AV1 entregue | 05/10 | 05/10 (AV1 até 18:30) |
| M6 — Entrega 1 ao patrocinador | 06/10 | 06/10 |

## 6. Premissas e riscos iniciais
| Premissa | Risco se falhar |
|---|---|
| O grupo confirmou entrega em 06/10, com front-end sem back-end; não há rubrica formal ("front-end completo" foi definido pelo grupo) | R7: patrocinador espera outro critério |
| Kit visual decidido em 30/09 (Material UI é só candidato) | R3: atraso do caminho crítico |
| Os 3 desenvolvedores trabalham nos fins de semana de 03–04/10 e no ritmo do cronograma v1.1 | R1: retrabalho e atraso |
| A regra "maior desgaste entre km e tempo" é a definitiva | R2: retrabalho em alertas e custos |
| Quem avalia usa Node.js 22.12 ou superior | R5: build não roda |
| Dados em memória bastam para o aceite | R7 |

## 7. Partes interessadas (registro inicial)
Prof. Diogo Silveira Mendonça (patrocinador e avaliador da AV1); equipe de gerenciamento (5, GPTI); equipe de desenvolvimento (3, PSW); proprietários de veículos (usuário-alvo); gestores de frota e condutores; oficinas. Estratégias no Plano do Projeto.

## 8. Recursos e autoridade
- *Recursos:* nenhum desembolso. Orçamento em horas-pessoa: 83,8 h na linha de base e 7,0 h de reserva de gerenciamento, liberada só pelo patrocinador.
- *Autoridade do GP:* coordena os outros quatro gerentes, prioriza pacotes e aprova atraso de até 1 dia e uso da contingência. Não tem autoridade hierárquica sobre os desenvolvedores (turmas diferentes), então as prioridades dos pacotes são acordadas com o patrocinador. Mudança de escopo, atraso maior que 1 dia, estouro acima de 8,4 h (10%) e reserva de gerenciamento vão ao patrocinador.

## 9. Requisitos para aprovação
Termo assinado e Plano do Projeto v1.1 entregue como AV1.

## 10. Encerramento e cancelamento
- *Encerramento:* aceite formal da Entrega 1, versão final no main com hash registrado, README atualizado e lições aprendidas registradas.
- *Cancelamento ou encerramento antecipado:*
  1. O patrocinador cancela ou altera o escopo de modo incompatível com o prazo, sem ampliar prazo ou equipe.
  2. Em 04/10 o roteiro T01–T23 não foi executado e a reserva de 05/10 (pacote 7.3) não basta: o patrocinador decide entre cortar opcionais (e só depois revisar UCs essenciais) e renegociar a data.

## 11. Assinaturas (simbólicas)
Patrocinador (Prof. Diogo): ________  GP (Patrick): ________  Data: _/_/2026
