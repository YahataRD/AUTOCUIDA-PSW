# Verificação final — 06/10/2026

Código analisado: **8133fd61e5b0b6dfe901d1c033dbf43147319d1b** (main ao iniciar a revisão).
Responsável informado pela equipe: **Rafael Voigt Villas Boas**. Atividade: comparação do escopo, verificação técnica e preparação documental para avaliação; **2,00 horas** no registro de atividades.
Inspeção e execução assistidas por Codex. Este documento não é aprovação formal do professor nem prova de revisão independente de todos os cenários da EAP.

## Ambiente e método

Clone novo do repositório, Windows/PowerShell, Node.js **22.14.0**, npm **11.6.0**, dependências dos lockfiles. Foram lidos código, seed, documentos atuais e versões históricas de escopo, matrizes e aceite. A execução não alterou código funcional, dependências, testes ou seed.

Os testes foram executados com permissão para criar subprocessos e servidor HTTP local. Uma primeira execução restrita falhou com bloqueio de spawn do ambiente, antes de executar os testes; a execução autorizada abaixo terminou com sucesso. Isso não é uma falha funcional do projeto.

## Resultados efetivamente obtidos

| Verificação | Resultado | Alcance |
| --- | --- | --- |
| npm test | **Aprovado: 47/47**, sendo 37 frontend e 10 mock | Regras, schemas, rotas, cache e cenários HTTP presentes na suíte; não inclui todos os T01–T23 manuais |
| npm run build | **Aprovado**, Vite 8.3.0, 189 módulos | Build no modo API padrão |
| npm start | **Aprovado** | Vite iniciou em 5173 e json-server em 127.0.0.1:3001; db.json criado da seed |
| Navegador local, modo API | **Inspeção limitada realizada** | Painel, Garagem, Serviço e Custos consultados; cards, formulários e histórico presentes |
| Custos da seed | **Conferidos** | Golf R$ 2.200,00; preventivas R$ 950,00; corretivas R$ 1.250,00; 4 serviços; média R$ 20,00 em maio–outubro/2026 |
| Largura móvel | **Verificação parcial** | DOM reportou viewport 360 px e largura do documento 345 px em Garagem e Custos, sem overflow horizontal de página nesses estados |
| Console consultado | Sem mensagens de erro/aviso retornadas | Somente a navegação inspecionada; não equivale a verificar todos os fluxos |
| Limites por km | **Aprovados nos quatro exemplos** | 79,9% Em dia; 80% Próximo; 99,9% Próximo; 100% Vencido |
| Calendário | **Reprovado frente ao requisito** | Em 01/03, ciclo iniciado em 01/02 com intervalo de um mês retorna Próximo e 91,9917864476386%, embora o prazo seja 01/03 |
| Fim de mês | **Divergência reproduzida** | 31/01/2026 + 1 mês retorna prazo 03/03/2026 |
| Serviço de item inativo | **Limitação reproduzida** | Atualização mantendo item removido rejeitada com “Selecione um item ativo deste veículo.” |
| Filtro de situação | **Ausente na inspeção** | DashboardPage renderiza a lista, sem controle de filtro |
| Tecnologias | **Uso localizado** | React, RHF, Zod, Query e Tailwind no código; duas dimensões inline permanecem |
| Autoria | **Parcial em relação às atribuições** | Dois autores de implementação no frontend; atividade atual de Voigt registrada sem alterar autores anteriores |

O redimensionamento para desktop não produziu dimensão efetiva confirmada nesta sessão; não foi contado como nova validação desktop. Os [registros anteriores de Tailwind](tailwind.md) e [formulários](formularios-acoes.md) continuam como evidência histórica, sem serem apresentados como testes refeitos hoje.

## Reprodução dos achados sem alterar o código

Na raiz do repositório, executar:

~~~bash
node --input-type=module -e "import {calculateMaintenance as c} from './frontend/src/utils/maintenance.js'; console.log(c({lastServiceDate:'2026-02-01',lastServiceKm:0,intervalKm:0,intervalMonths:1},0,new Date('2026-03-01T00:00:00Z')));"
~~~

Resultado relevante: nextServiceDate = 2026-03-01; wear = 91.9917864476386; status = soon. Para fim de mês, usar referência 2026-01-31 e avaliação 2026-02-28: prazo calculado 2026-03-03.

Para o item inativo, carregar uma cópia da seed, atribuir active=false ao item id=2 e chamar updateServiceRecord para o serviço id=4, mantendo maintenanceItemId=2 e alterando somente amount. A função rejeita o item inativo. A reprodução foi feita em memória, sem modificar a seed ou a base em disco.

## O que não foi homologado

Não foram reexecutados integralmente cadastro→item→serviço→edição→exclusão no navegador, todas as confirmações, teclado/retorno de foco, leitor de tela, zoom 200%, todos os viewports, todos os estados vazios ou cenários multicliente. Não foi auditada segurança de produção, cobertura total de testes ou origem humana/IA dos estilos. O build demo e o estado da publicação remota não foram revalidados nesta revisão.

O [roteiro T01–T23](aceite-front-end.md) mantém esses limites visíveis. Os resultados positivos não eliminam as pendências da [matriz de entrega](../entrega-avaliacao.md). Os documentos em docs/GPTI/ foram somente lidos e permanecem intactos.
