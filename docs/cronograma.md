# Cronograma e situação de entrega — AutoCUIDA

Entrega prevista: **06/10/2026**. Situação conferida na base **8133fd6**. Datas abaixo são as metas originais; não representam a data efetiva de conclusão nem homologação. A revisão substitui as marcações gerais de “Concluída” que não distinguiam implementação e aceite.

Atualização após 0c66171: calendário e percentuais corrigidos conforme
[validação dos alertas](testes/calendario-alertas.md); demais ressalvas preservadas.

| Meta | Etapa | Situação observada em 06/10 |
| --- | --- | --- |
| 25/09 | Documentação e cronograma | Revisados para entrega; análise consolidada em entrega-avaliacao.md |
| 26/09 | Kit visual, tema, navegação e Painel | Tailwind presente; percentuais corrigidos; dimensões inline ainda divergem da EAP |
| 27/09 | Dados por veículo, carga, estados e URLs | Implementados; hoje a carga usa API mockada, não JSON estático |
| 28/09 | Veículos e odômetro | Implementados, com testes de validação e persistência |
| 29/09 | Gestão de itens | Implementada; remover preserva histórico, custos e edição do serviço original |
| 30/09 | Edição e exclusão de serviços | Implementadas, inclusive edição mantendo item removido; P03 corrigida |
| 01/10 | Alertas, tempo/km, retroatividade | Calendário, percentuais e filtro implementados e validados nas rodadas finais |
| 02/10 | Custos e histórico | Implementados por veículo; totais da seed conferidos |
| 03/10 | Responsividade, acessibilidade e formulários | Há registros anteriores e inspeção atual limitada; teclado/zoom completos não homologados |
| 04/10 | Aceite integral e congelamento | Não comprovado integralmente; há correções no histórico em 06/10 e pendências abertas |
| 06/10 | Verificação final e entrega | Verificação/documentação por Rafael Voigt; envio ao Teams não realizado por esta revisão |

Consulte [aderência e pendências](entrega-avaliacao.md), [registro de verificação](testes/verificacao-final.md) e [roteiro de aceite](testes/aceite-front-end.md). A evolução real consta no [changelog](../mudancas/CHANGELOG.md). Documentos de GPTI permanecem como histórico do grupo de gestão.
