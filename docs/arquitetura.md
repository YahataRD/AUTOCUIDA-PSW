# Arquitetura e comportamento atual

Inspeção realizada em 25/09/2026 sobre a aplicação do commit `b59f1ab`.
Esta documentação descreve o código existente, distinguindo-o das mudanças
propostas no [escopo da entrega](planejamento/escopo-front-end.md).

## Tecnologias

- React e React DOM 18.3.1, com componentes funcionais.
- Vite 8 e módulos JavaScript ES.
- HTML semântico e CSS responsivo próprio, sem biblioteca visual instalada.
- `Intl` para datas, valores e quilometragens no padrão brasileiro.
- `React.StrictMode` habilitado no ponto de entrada.

## Organização

| Local | Responsabilidade |
| --- | --- |
| [index.html](../index.html) | Documento com idioma, viewport e ponto de entrada |
| [src/main.jsx](../src/main.jsx) | Monta o React e importa os estilos |
| [src/App.jsx](../src/App.jsx) | Estado compartilhado e seleção da tela |
| [src/data/initialData.js](../src/data/initialData.js) | Veículo, itens e serviços de demonstração |
| [src/pages](../src/pages) | Telas do fluxo principal |
| [src/components](../src/components) | Peças reutilizáveis da interface |
| [src/utils/maintenance.js](../src/utils/maintenance.js) | Datas, quilometragem e cálculo dos alertas |
| [src/utils/costs.js](../src/utils/costs.js) | Totais, moeda e agrupamento mensal |
| [style.css](../style.css) | Estilos próprios e pontos de quebra |
| [vite.config.js](../vite.config.js) | Configuração do Vite e plugin React |

Os arquivos `manutencoes.html`, `registro.html` e `veiculo.html` na raiz são
referências do protótipo estático anterior. Não representam as telas ativas da
aplicação React. São código-fonte e não precisam ser convertidos para Markdown.

## Telas e componentes

| Tela | O que já faz | Componentes principais |
| --- | --- | --- |
| `DashboardPage` | Exibe veículo, contagem de alertas, desgaste e atalho para registrar manutenção | `VehicleSummary`, `MaintenanceCard` |
| `GaragePage` | Consulta o veículo fixo e permite aumentar o odômetro | Formulário local com erro e confirmação |
| `ServicePage` | Registra serviço preventivo ou corretivo com item, data, quilometragem, valor e oficina | Formulário controlado e confirmação |
| `CostsPage` | Exibe totais, média mensal, distribuição por tipo e histórico | `CostSummary`, `ExpenseChart`, `ServiceHistory` |

`AppHeader` apresenta título, descrição e quilometragem. `BottomNavigation`
alterna as quatro telas. Os botões mudam `activePage`; não há rotas de URL nem
integração com os botões Voltar/Avançar do navegador.

## Estado e eventos

`App` mantém `vehicle`, `maintenanceItems`, `serviceRecords`, `activePage` e
`selectedMaintenanceItemId`. Dados descem por props; callbacks devolvem os
eventos dos filhos para o componente que mantém o estado.

Atualizar o odômetro modifica `vehicle.currentKm`. Os cartões calculam novamente
seu estado a partir da nova quilometragem e da data corrente.

Registrar um serviço:

1. Localiza o item escolhido e cria um registro com `Date.now()` como ID.
2. Substitui a data e a quilometragem do último serviço daquele item.
3. Acrescenta o registro ao histórico.
4. Atualiza o odômetro somente se a quilometragem informada for maior.

Não existe uma coleção de alertas independente. O estado de cada alerta é
derivado do item de manutenção. Também não existe vínculo `vehicleId` nos itens
e registros iniciais, pois a implementação trabalha com um único veículo.

## Cálculo atual de manutenção

Para cada item, o código calcula:

- Próxima quilometragem: última quilometragem de serviço + intervalo em km.
- Desgaste por distância: distância percorrida desde o serviço / intervalo.
- Desgaste por tempo: meses decorridos / intervalo em meses.
- Desgaste apresentado: o maior dos dois percentuais, arredondados com `Math.round`.

| Percentual calculado e arredondado | Estado |
| --- | --- |
| Menor que 80 | Em dia |
| De 80 até menos de 100 | Próximo |
| A partir de 100 | Vencido |

A barra é limitada visualmente a 100%, mas o texto pode mostrar desgaste maior.
O tempo decorrido usa meses médios de 30,4375 dias; o próximo vencimento usa
adição de meses do calendário. Essa diferença e o arredondamento antes da
classificação precisam ser decididos e testados, inclusive nos fins de mês.

Um serviço retroativo pode deixar desgaste positivo. Por exemplo, com serviço
em 01/09/2026 a 48.000 km, odômetro atual de 48.250 km e intervalos de 10.000 km
e 12 meses, a função atual calcula 7% em 25/09/2026. Logo, a frase antiga
“registrar sempre zera o desgaste” não descrevia todos os casos.

## Custos e histórico

`calculateCostSummary` soma os registros e separa preventivos de corretivos.
`getLastSixMonths` inclui o mês atual e os cinco anteriores; meses sem registros
têm valor zero. A média divide a soma desse período por seis. O total acumulado
considera todos os registros, inclusive os anteriores ao período do gráfico.

`ServiceHistory` ordena uma cópia dos registros por data decrescente. O gráfico
usa CSS e expõe valores mensais por rótulos acessíveis. Ainda não há edição,
exclusão ou filtros de histórico.

## Validações existentes e limites

O odômetro rejeita valores negativos, não inteiros, menores ou iguais ao valor
atual. O cadastro de serviço verifica existência do item, inteiro seguro para
quilometragem, quilometragem não inferior à última manutenção do item, data
obrigatória e não futura, valor positivo e oficina não vazia.

Pendências identificadas por leitura do código:

- A data do serviço pode retroceder em relação ao serviço anterior e substituir
  a referência do item, sem uma regra explícita de ordem cronológica.
- As mensagens dos campos de serviço não estão associadas por `aria-describedby`.
- A confirmação sempre afirma que o alerta foi encerrado, mesmo quando o
  serviço retroativo ainda deixa a manutenção vencida.
- `Date.now()` não garante unicidade para operações no mesmo milissegundo.
- Estados sem veículo, sem itens e sem serviços precisam de ações orientadoras.
- Não há carregamento assíncrono inicial, erro de carga nem nova tentativa.

## Verificações e limites da análise

Em 25/09/2026 foram realizados leitura dos arquivos, build de produção e
execução direta de dois exemplos da função de manutenção: serviço retroativo
(7%) e distância de 7.990 km em intervalo de 10.000 km (79,9% arredondado para
80%, já classificado como Próximo).

Não foi feita nesta revisão documental uma homologação completa no navegador.
O projeto não possui scripts de teste ou lint no `package.json`. Afirmações de
validação e auditoria de dependências do README anterior são registros históricos,
sem evidências anexadas; não foram reapresentadas como verificações atuais.
