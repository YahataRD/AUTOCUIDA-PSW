# Roteiro de aceite T01–T23 — situação da entrega

Fonte: [roteiro original de 25/09/2026](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/81e55d3/docs/testes/aceite-front-end.md). Consolidação em 06/10/2026, base **8133fd6**, por Rafael Voigt, com verificação assistida por Codex. Não houve alteração dos critérios de aceite para acomodar lacunas.

**Parcial** significa que há implementação/testes ou inspeção de parte do cenário, mas não execução integral do roteiro manual. **Pendente** significa que não foi comprovado nesta revisão. **Reprovado** identifica uma divergência reproduzida ou ausência confirmada. Nenhuma linha parcial deve ser apresentada como homologada.

| ID | Critério/cenário original resumido | Resultado da revisão e evidência |
| --- | --- | --- |
| T01 | Instalar, iniciar e compilar em cópia limpa | Parcial: clone novo, dependências instaladas, start/build aprovados; sem homologação integral da usabilidade |
| T02 | Carga válida e estado de carregamento | Parcial: consulta via API e tests/api.test.js; atraso simulado visual não refeito |
| T03 | Falha de carga, dado inválido e nova tentativa | Parcial: testes de HTTP/JSON/rede; recuperação visual completa não reexecutada |
| T04 | URLs, recarregar, Voltar/Avançar | Parcial: tests/base.test.js e consulta das quatro rotas; histórico do navegador não homologado integralmente |
| T05 | Cadastro válido, placa repetida e campos vazios | Parcial: tests/vehicles.test.js e forms.test.js; ciclo manual não repetido |
| T06 | Editar, cancelar e inativar inclusive último veículo | Parcial: implementação e testes de demo/integridade; todos os diálogos não reexecutados |
| T07 | Odômetro vazio, negativo, decimal, igual, menor e maior | Parcial: regras/schemas/HTTP aprovados; sequência visual não reexecutada |
| T08 | Isolamento por veículo | Parcial: teste de seletores e dados vinculados; sequência completa de edição cruzada não refeita |
| T09 | Itens por km, meses ou ambos, com validação | Parcial: schemas e gestão presentes; validação visual completa não refeita |
| T10 | Cancelar/confirmar remoção preservando histórico | Parcial: regra de preservação testada; confirmação manual não refeita |
| T11 | Serviços preventivo e corretivo, sem duplicação | Parcial: regras e integração existentes aprovadas; ciclo visual dos dois tipos não refeito |
| T12 | Campos inválidos e nenhuma gravação indevida | Parcial: schemas e cenários HTTP aprovados; não confundir com falhas de rede após PATCH, que podem ser parciais |
| T13 | Editar data/km/valor/tipo e cancelar | Regressões de edição aprovadas; valor de serviço de item removido editado e persistido via UI/API nesta rodada. Aceite de todas as combinações continua parcial. |
| T14 | Excluir serviço, confirmar/cancelar e recalcular | Parcial: regra de referência e exclusão em demo; todos os cenários visuais não reexecutados |
| T15 | 79,9/80/99,9/100% e filtro de situação | Limites automatizados aprovados; quatro opções, contagem, teclado e troca de veículo conferidos no navegador. P01 corrigida. |
| T16 | Antes/no/depois do vencimento, fevereiro/fim de mês | Corrigido após a revisão: regressões automatizadas aprovadas, incluindo ano bissexto e dia local. Ver calendario-alertas.md; não equivale a novo aceite manual independente. |
| T17 | Serviço atual/retroativo e cronologia consistente | Parcial: regras e integração aprovadas; sequência visual não repetida |
| T18 | R$ 100 + R$ 50, média R$ 25 e recálculo | Parcial: custos da seed conferidos e funções inspecionadas; fixture exata 100/50 não executada no navegador |
| T19 | Todas as telas em 360, 768 e 1280 px | Parcial: inspeção móvel limitada; registro histórico tailwind.md não equivale a repetir todas as larguras |
| T20 | Teclado, foco, erros, zoom 200% | Pendente de execução completa; existem rótulos e erros associados, sem homologação integral |
| T21 | Fluxo completo sem exceções/avisos e UI sincronizada | Parcial: suíte e navegação consultada sem avisos retornados; fluxo completo não reexecutado manualmente |
| T22 | Zero veículos/itens/serviços e filtro sem resultado | Filtro vazio e Mostrar todos conferidos nesta rodada. Estados básicos anteriores continuam cobertos; conjunto manual completo não reexecutado. |
| T23 | README em outra cópia, commits, ensaio e entrega | Parcial: clone/testes/build e histórico conferidos; ensaio coletivo e envio ao Teams não realizados nesta revisão |

## Como completar o aceite

Executar o [roteiro original](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/81e55d3/docs/testes/aceite-front-end.md) com json-server local. Registrar por cenário: data, integrante, commit, navegador/viewport, dados, passos, resultado e evidência. Atualizar apenas após observação real; um teste automatizado de função não aprova sozinho o fluxo visual. Os itens reprovados devem permanecer visíveis para avaliação, pois esta revisão é somente documental.
