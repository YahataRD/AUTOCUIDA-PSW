# Dicionário da EAP — AutoCUIDA

Define o "pronto" de cada pacote por critério observável, sem datas nem horas (estão no Plano do Projeto). Siglas de pessoas: seção 11 do Plano. *A* presta contas; *R* executa.
Os cenários T01–T23 estão no roteiro de aceite (docs/testes/aceite-front-end.md, commit 81e55d3).

> Pendência da equipe (remover esta nota depois): restaurar esse arquivo no main com git checkout 81e55d3 -- docs/testes/aceite-front-end.md, porque o último commit o apagou.

| Pacote | Dono (A) / Executa (R) | Aceite (observável) | Fora deste pacote | Refs |
|---|---|---|---|---|
| *1.1* Planejamento e artefatos da AV1 | A: GP / R: GP, G2–G5 | Os quatro artefatos estão em docs/av1/ no main, cada gerente tem ao menos um commit na sua seção e o link da pasta foi postado no Teams até 05/10 às 18:30 | Código da aplicação | O5 |
| *1.2* Monitoramento, comunicação e mudanças | A: GP / R: G3, G4, G5 | Há status diário registrado, docs/cronograma.md mostra as datas v1.1 e a situação real de cada pacote, e git shortlog -sne lista os 8 integrantes antes de 05/10 às 18:30 | Execução do desenvolvimento | O4, R4, R6 |
| *2.1* Kit visual, tema, navegação e painel base | A/R: D3 (D1 consultado) | O kit escolhido está registrado em docs/ ou no README; cabeçalho, navegação e painel usam componentes do kit, sem style inline solto para tamanhos dinâmicos; npm run build termina sem erro | Conteúdo interno das demais telas | REQ-15, T01 |
| *2.2* Dados por veículo, carga local, estados e URLs | A/R: D1 (R: D2) | Itens, serviços e alertas estão ligados ao vehicleId; a carga do JSON local mostra carregamento e, em falha, erro com "tentar novamente"; cada seção tem URL e Voltar/Avançar funcionam; listas vazias mostram mensagem específica | Back-end e banco de dados | REQ-13, REQ-14, T02, T03, T04, T22 |
| *3.1* Gestão de veículos e odômetro | A/R: D1 | Veículo válido aparece e pode ser selecionado; placa repetida (normalizada) ou campos vazios não salvam; cancelar edição preserva os dados; confirmar inativação mantém o histórico; odômetro só aceita incremento inteiro válido; alternar veículos não mistura dados | Regra de cálculo dos alertas (6.1) | REQ-05, REQ-06, UC01–04, UC15, T05–T08 |
| *4.1* Itens e regras de manutenção | A/R: D2 | É possível criar e editar item só por km, só por meses ou por ambos; sem nenhum intervalo positivo o item não salva; remover do plano preserva serviços e custos anteriores | Registro de serviço (5.1) | REQ-07, UC05–08, T09, T10 |
| *5.1* Registro, histórico, edição e exclusão de serviço | A/R: D3 | Serviço preventivo e corretivo aparece uma vez com data, km, valor e oficina; campo inválido mostra erro associado e não grava registro parcial; editar atualiza histórico, alertas e custos; excluir com confirmação restaura a referência anterior ou inicial e não reduz o odômetro | Totais de custo (5.2) | REQ-04, REQ-08, UC09–12, T11–T14 |
| *5.2* Custos integrados | A/R: D2 | Com R$ 100 preventiva e R$ 50 corretiva no mesmo mês, a tela mostra total R$ 150, tipos R$ 100 e R$ 50 e média R$ 25 em seis meses; totais recalculam após editar ou excluir; sem registros há mensagem e nenhum valor inválido | Exportação de relatório (opcional) | REQ-02, REQ-11, UC16, T18 |
| *6.1* Regras de alerta, baixa e filtros | A/R: D2 | 79,9% é Em dia, 80% e 99,9% são Próximo e 100% é Vencido, pelo percentual não arredondado; por tempo, antes, no e depois do vencimento, fim de mês e fevereiro dão a classe esperada; baixa só por serviço válido; retroativo coerente preserva a última referência e inconsistente é rejeitado; o filtro por situação funciona | Layout do painel (2.1) | REQ-01, REQ-03, REQ-09, REQ-10, UC13–14, T15–T17 |
| *7.1* Responsividade e acessibilidade | A: G2 / R: D1, D2, D3 (cada um nas suas telas) | As telas não têm rolagem horizontal nem ação inacessível em 360, 768 e 1280 px; Tab, Shift+Tab, Enter e Espaço operam tudo; o foco é visível e devolvido ao fechar diálogo; erros associados aos campos; zoom de 200% sem perda; o fluxo integrado roda sem exceção nem aviso de key | Funcionalidades novas | REQ-12, T19–T21 |
| *7.2* Roteiro de aceite | A/R: G2 (R: D1, D2, D3) | T01–T23 executados em clone limpo, por quem não escreveu a funcionalidade, cada um com resultado (aprovado, reprovado ou bloqueado), data, commit e evidência; funcionalidades congeladas | Correções (7.3) | O1, T01–T23 |
| *7.3* Correções, documentação e ensaio | A: GP / R: D1, D2, D3 | Cada falha corrigida foi reexecutada nos cenários afetados; README e limitações refletem a versão entregue; o roteiro final de 7 passos foi ensaiado; nenhuma função nova entrou | Novos requisitos | O1 |
| *7.4* Conferência e entrega | A: GP / R: D1 | Seguindo só o README em outra cópia, instalação e build funcionam; o patrocinador e os colegas conseguem abrir o repositório; o hash da versão entregue está registrado; a entrega foi realizada em 06/10 | Novas correções | REQ-16, O3, T23 |

*Regras do dicionário*
- Um pacote só está pronto quando o aceite é observado por alguém diferente de quem o executou (revisão por PR).
- O aceite não recebe desejos novos; pedido novo é mudança (Plano, seção 13).
- Pacote sem aceite em uma frase ainda está grosso e deve ser decomposto.
