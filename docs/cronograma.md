# Cronograma do AutoCUIDA

**Entrega: 6 de outubro de 2026.** Concluir o front-end com dados simulados,
incluindo gestão de veículos, itens de manutenção, serviços, alertas e custos.
O [README](../README.md) descreve o que já está implementado.

## Etapas

| Data | Entrega prevista | Situação |
| --- | --- | --- |
| 25/09 | Organizar a documentação e definir o cronograma | Concluída |
| 26/09 | Escolher o kit visual, configurar o tema e adaptar cabeçalho, navegação e Painel | Planejada |
| 27/09 | Organizar os dados por veículo; preparar carregamento local, estados de erro/vazio e navegação por URL | Planejada |
| 28/09 | Completar cadastro, seleção, edição e inativação de veículos | Planejada |
| 29/09 | Implementar cadastro, consulta, edição e remoção de itens de manutenção | Planejada |
| 30/09 | Completar edição e exclusão de serviços, com confirmação e recálculo dos dados | Planejada |
| 01/10 | Revisar alertas por tempo/km, serviços retroativos e mensagens de confirmação | Planejada |
| 02/10 | Integrar custos e histórico por veículo; concluir a adaptação visual das telas | Planejada |
| 03/10 | Revisar responsividade, acessibilidade, formulários e estados vazios | Planejada |
| 04/10 | Testar o fluxo completo e fechar as funcionalidades da entrega | Planejada |
| 05/10 | Corrigir problemas restantes, atualizar o README e ensaiar a apresentação | Planejada |
| 06/10 | Conferir a versão final e realizar a entrega | Planejada |

Os responsáveis por cada etapa ainda serão definidos pelo grupo. O planejamento
considera trabalho nos fins de semana de 26–27/09 e 03–04/10; as datas
intermediárias devem ser ajustadas conforme a disponibilidade dos integrantes.

## Pontos a resolver durante a implementação

- Escolher um único kit visual antes de ampliar as telas. Material UI é uma
  opção em avaliação, ainda não adotada.
- Manter itens, serviços, alertas e custos vinculados ao veículo correto.
- Ao editar ou excluir serviços, recalcular a referência de manutenção e os
  custos; preservar o histórico ao inativar veículos ou remover itens do plano.
- Conferir vencimentos por calendário, limites dos percentuais e serviços
  retroativos para que os alertas e as mensagens correspondam aos dados.
- Validar cada etapa antes de avançar e registrar as mudanças em commits
  separados por funcionalidade.

## Conferência final

- [ ] Cadastrar um veículo e configurar seus itens de manutenção.
- [ ] Atualizar o odômetro, observar um alerta e registrar o serviço.
- [ ] Editar e excluir serviços, conferindo o efeito nos alertas e custos.
- [ ] Alternar veículos sem misturar dados e testar confirmações e cancelamentos.
- [ ] Verificar campos inválidos, carregamento, erro e listas vazias.
- [ ] Usar todas as telas no celular, no computador e pelo teclado.
- [ ] Instalar o projeto seguindo o README e gerar o build sem erros.
- [ ] Conferir no GitHub os commits que compõem a versão entregue.

Até a entrega, a prioridade é concluir esses fluxos. Back-end, banco de dados,
autenticação e persistência ficam para uma etapa posterior.
