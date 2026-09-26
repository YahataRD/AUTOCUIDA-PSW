# Descrição do protótipo AutoCUIDA

Documento de origem: `Descrição Protótipo.txt`, do planejamento do projeto.
Conversão para Markdown em 25/09/2026. O conteúdo abaixo preserva a proposta
original; descreve o sistema planejado, não comprova funcionalidades já prontas.
O arquivo original pode ser consultado no commit `b59f1ab`.

## Nome e propósito

**Trabalho de Planejamento de Programação Web.**

AutoCUIDA: gerenciar a manutenção preventiva e corretiva de veículos, prevendo
custos e emitindo alertas de revisão com base no tempo e na quilometragem rodada.

## Business case

Contexto onde o sistema está envolvido e como ele gera valor:

Proprietários de veículos e gestores de pequenas frotas frequentemente enfrentam
altos custos com reparos corretivos não planejados decorrentes do esquecimento
de revisões periódicas (como troca de óleo, substituição de pastilhas de freio e
correias). No processo típico, o motorista depende da memória, de anotações
manuais em cadernos ou de adesivos colados no para-brisa para saber o momento de
realizar a manutenção. Com a rotina corrida, essas datas e quilometragens limite
costumam passar despercebidas, gerando quebras inesperadas, sinistros de trânsito
e custos de reparo que chegam a ser até três vezes superiores aos custos de uma
manutenção preventiva. O sistema AutoCUIDA tem como objetivo automatizar o
acompanhamento da saúde do veículo e o controle de despesas operacionais,
monitorando a evolução do odômetro e o tempo decorrido para disparar alertas
preventivos antes que as falhas ocorram, gerando economia financeira e segurança
para o condutor.

Nota editorial: a estimativa de custos “até três vezes superiores” consta da
fonte original sem referência. Deve ser fundamentada ou retirada antes de ser
apresentada como dado comprovado. Os intervalos da demonstração não substituem
as recomendações do fabricante do veículo.

## Processo de negócio principal

1. O usuário cadastra o veículo informando dados básicos como placa, modelo e
   a quilometragem atual do odômetro: **Cadastro de Veículo**.
2. Vincula os itens de manutenção periódica, como óleo do motor ou filtro de ar,
   definindo regras de intervalo para troca por quilometragem e/ou por tempo:
   **Vinculação de Plano de Manutenção**.
3. À medida que o veículo roda, atualiza a leitura do odômetro ou lança um
   serviço efetuado: **Apontamento de Manutenção**.
4. O sistema calcula o desgaste, gera alertas visuais de revisão pendente ou
   próxima do vencimento e exibe o histórico de despesas no relatório
   consolidado: **Painel de Saúde e Relatório de Custos**.
5. Ao visualizar o alerta e efetuar a manutenção na oficina, o usuário registra
   o serviço concluído, o que limpa o alerta atual e agenda automaticamente o
   próximo ciclo de prevenção.

## Entidades

- Veículo.
- ItemManutencao.
- RegistroManutencao.
- Alerta.

## Casos de uso originais

Os identificadores foram acrescentados nesta conversão para permitir referências
estáveis no planejamento. A proposta original totaliza **16 casos de uso**.

| ID | Grupo | Caso de uso |
| --- | --- | --- |
| UC01 | Veículos | Criar veículo |
| UC02 | Veículos | Consultar veículos |
| UC03 | Veículos | Atualizar veículo |
| UC04 | Veículos | Inativar veículo |
| UC05 | Itens de manutenção | Criar item e regra de troca |
| UC06 | Itens de manutenção | Consultar itens |
| UC07 | Itens de manutenção | Atualizar parâmetros de troca |
| UC08 | Itens de manutenção | Remover item |
| UC09 | Registros de manutenção | Registrar serviço realizado |
| UC10 | Registros de manutenção | Consultar histórico de serviços |
| UC11 | Registros de manutenção | Editar registro |
| UC12 | Registros de manutenção | Excluir registro |
| UC13 | Alertas e relatórios | Visualizar painel de alertas pendentes |
| UC14 | Alertas e relatórios | Confirmar/dar baixa em alerta de revisão |
| UC15 | Alertas e relatórios | Atualizar odômetro/quilometragem do veículo |
| UC16 | Alertas e relatórios | Gerar relatório de custo operacional e preventivo |

## Telas previstas no protótipo mobile-first

### Cadastro e atualização de veículo e odômetro

Tela para inserção dos dados do veículo e leitura rápida da quilometragem atual.

### Registro de manutenção realizada

Tela onde o usuário lança o serviço efetuado, inserindo a quilometragem do dia,
o valor gasto, a oficina e o item substituído.

### Painel de alertas de revisão

Tela mobile principal listando os itens monitorados com seus respectivos
estados: Em dia, Próximo do vencimento ou Vencido, com ações rápidas.

### Relatório de custos e saúde do veículo

Tela exibindo o demonstrativo financeiro dos gastos com manutenção preventiva
e corretiva e o histórico de intervenções do veículo.

## Relação com a validação

A [validação dos requisitos](validacao-requisitos.md) complementa esta proposta
com matrizes e prioridades. Não há uma tela de configuração dos itens descrita
acima, embora UC05 a UC08 já façam parte do escopo funcional original; essa
interface precisa ser contemplada no planejamento da entrega.
