# Manual do usuário

Revisado em 06/10/2026. Não há login nesta versão acadêmica. Para preservar alterações, use a execução local com json-server; o site de demonstração restaura os dados ao recarregar.

## Conhecendo a tela

- **Painel:** mostra a situação dos itens de manutenção e os alertas.
- **Garagem:** permite cadastrar, consultar, editar e inativar veículos, atualizar o odômetro e gerenciar itens.
- **Serviço:** registra uma manutenção preventiva ou corretiva.
- **Custos:** mostra total, distribuição, gráfico e histórico.
- **Seletor de veículo:** aparece no topo e vale para todas as telas.

## Consultar alertas

No Painel, cada item informa a situação calculada pela quilometragem atual e
pela data de referência:

- **Em dia:** desgaste inferior a 80%.
- **Próximo:** desgaste de 80% até antes de 100%.
- **Vencido:** desgaste igual ou superior a 100%.

O cálculo considera o maior percentual entre tempo e quilometragem.

Use **Filtrar por situação** para mostrar Todos, Em dia, Próximo ou Vencido.
O contador informa quantos itens correspondem à seleção. Se a lista estiver
vazia, **Mostrar todos** restaura a consulta. Trocar de veículo também restaura
Todos. O resumo de alertas no topo sempre considera o plano inteiro do veículo.

O prazo em meses respeita o calendário. Quando o mês de destino não contém o
mesmo dia, vale seu último dia: por exemplo, 31/01/2026 + um mês = 28/02/2026.
Nesse dia o desgaste por tempo atinge 100%. O percentual é exibido com até uma
casa decimal, truncada para não mostrar 80% ou 100% antes de atingir o limite.
Ao deixar a tela aberta de um dia para o outro, recarregue para atualizar a data.

## Cadastrar um veículo

1. Abra **Garagem**.
2. Selecione **Cadastrar veículo**.
3. Preencha placa, modelo, ano e quilometragem inicial.
4. Selecione **Salvar veículo**.

A placa é normalizada e não pode duplicar outra placa cadastrada, inclusive inativa. Informe modelo, ano entre 1886 e o próximo ano, e km inteira não negativa. O novo veículo começa sem itens ou serviços; adicione seu plano na Garagem.

Na Garagem também é possível editar os dados do veículo ou inativá-lo. A
inativação mantém o histórico, mas remove o veículo do seletor de veículos
ativos. Não há ação de reativação na interface.

## Gerenciar itens de manutenção

Na Garagem, use o formulário de itens para informar nome, intervalo em
quilômetros, intervalo em meses e a referência inicial. Pelo menos um dos dois
intervalos deve ser positivo. Itens podem ser editados ou removidos do plano;
remover um item preserva os serviços históricos associados e os custos. A data inicial não pode ser futura e a km inicial não pode superar o odômetro. A edição da referência precisa ser coerente com o histórico. Confirme a remoção somente se quiser tirar o item do plano ativo.

## Atualizar o odômetro

1. Na Garagem, informe a nova quilometragem.
2. Use um número inteiro maior que a leitura atual.
3. Selecione **Atualizar quilometragem**.
4. Volte ao Painel para conferir os alertas recalculados.

## Registrar um serviço

1. Abra **Serviço** ou use o botão de registro em um card do Painel.
2. Escolha preventiva ou corretiva.
3. Escolha o item de manutenção.
4. Informe a quilometragem, a data, o valor e a oficina.
5. Selecione **Registrar serviço**.

A data não pode ser futura. Serviços retroativos são aceitos somente quando
mantêm a ordem coerente de datas e quilometragens do histórico.

O valor deve ser maior que zero (exemplo: 350,00) e a oficina é obrigatória. Durante a gravação, aguarde o retorno. Se a operação informar falha parcial, confira os dados antes de repetir.

No histórico da tela de Custos, use **Editar** para corrigir um serviço ou
**Excluir** para removê-lo após a confirmação. Os alertas, a referência do item
e os custos são recalculados depois da operação.

Serviços de itens removidos também podem ser editados. O item original aparece
como **removido do plano**; mantê-lo no registro não o reativa. Para novos
serviços, somente itens ativos ficam disponíveis.

## Consultar custos e histórico

Abra **Custos** para consultar o total gasto, a divisão por tipo, os últimos
seis meses e os registros do veículo selecionado. Troque o veículo no seletor
para consultar outra base.

## Uso em celular e teclado

O layout é responsivo. No teclado, use `Tab` para avançar entre controles,
`Shift+Tab` para voltar e `Enter` ou `Espaço` para ativar botões. Mensagens de
erro aparecem junto do campo que precisa de correção.

## Limitações que afetam a utilização

- Inativar um veículo preserva dados no mock, mas o retira das telas ativas; não há tela de consulta dos inativos.
- O mock não possui login nem controle de acesso e não é um backend de produção.

Essas condições estão registradas na [matriz de entrega](entrega-avaliacao.md).
