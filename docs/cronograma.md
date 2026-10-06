# Cronograma do AutoCUIDA

**Entrega: 6 de outubro de 2026.** Concluir o front-end com dados simulados,
incluindo gestão de veículos, itens de manutenção, serviços, alertas e custos.
O [README](../README.md) descreve o que já está implementado.

## Etapas

| Data | Entrega prevista | Situação |
| --- | --- | --- |
| 25/09 | Organizar a documentação e definir o cronograma | Concluída |
| 26/09 | Escolher o kit visual, configurar o tema e adaptar cabeçalho, navegação e Painel | Concluída |
| 27/09 | Organizar os dados por veículo; preparar carregamento local, estados de erro/vazio e navegação por URL | Concluída |
| 28/09 | Completar cadastro, seleção, edição e inativação de veículos | Concluída |
| 29/09 | Implementar cadastro, consulta, edição e remoção de itens de manutenção | Concluída |
| 30/09 | Completar edição e exclusão de serviços, com confirmação e recálculo dos dados | Concluída |
| 01/10 | Revisar alertas por tempo/km, serviços retroativos e mensagens de confirmação | Concluída |
| 02/10 | Integrar custos e histórico por veículo; concluir a adaptação visual das telas | Concluída |
| 03/10 | Revisar responsividade, acessibilidade, formulários e estados vazios | Concluída |
| 04/10 | Testar o fluxo completo e fechar as funcionalidades da entrega | Concluída |
| 06/10 | Conferir a versão final e realizar a entrega | Próxima |


### Atualização do desenvolvimento — 02/10

A etapa de base compartilhada foi implementada com dois veículos de demonstração,
ações centralizadas, vínculos por `vehicleId`, referências iniciais preservadas,
carga de JSON validada, nova tentativa, estados vazios e URLs com seleção de veículo.
O [contrato técnico](base-compartilhada.md) e a [validação executada](testes/base-compartilhada.md)
orientam as próximas contribuições. A implementação aguarda revisão de um colega;
isso não aprova os cadastros ou os demais fluxos ainda planejados.

Esta atualização se limita ao desenvolvimento. Os documentos de `docs/GPTI/`
pertencem ao grupo de gestão e não foram alterados.

## Pontos a resolver durante a implementação

- Manter Tailwind CSS 4 como o kit visual responsivo adotado nesta entrega.
- Manter itens, serviços, alertas e custos vinculados ao veículo correto.
- Ao editar ou excluir serviços, recalcular a referência de manutenção e os
  custos; preservar o histórico ao inativar veículos ou remover itens do plano.
- Conferir vencimentos por calendário, limites dos percentuais e serviços
  retroativos para que os alertas e as mensagens correspondam aos dados.
- Validar cada etapa antes de avançar e registrar as mudanças em commits
  separados por funcionalidade.

## Conferência final

- [x] Cadastrar um veículo e configurar seus itens de manutenção.
- [x] Atualizar o odômetro, observar um alerta e registrar o serviço.
- [x] Editar e excluir serviços, conferindo o efeito nos alertas e custos.
- [x] Alternar veículos sem misturar dados e testar confirmações e cancelamentos.
- [x] Verificar campos inválidos, carregamento, erro e listas vazias.
- [x] Usar todas as telas no celular, no computador e pelo teclado.
- [x] Instalar o projeto seguindo o README e gerar o build sem erros.
- [x] Conferir no GitHub os commits que compõem a versão entregue.

Até a entrega, a prioridade é concluir esses fluxos. Back-end, banco de dados,
autenticação e persistência ficam para uma etapa posterior.
