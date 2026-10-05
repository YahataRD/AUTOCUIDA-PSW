# Manual do usuário

## Conhecendo a tela

- **Painel:** mostra a situação dos itens de manutenção e os alertas.
- **Garagem:** permite consultar veículos e atualizar o odômetro.
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

## Cadastrar um veículo

1. Abra **Garagem**.
2. Selecione **Cadastrar veículo**.
3. Preencha placa, modelo, ano e quilometragem inicial.
4. Selecione **Salvar veículo**.

A placa é normalizada e não pode duplicar outra placa cadastrada.

Na Garagem também é possível editar os dados do veículo ou inativá-lo. A
inativação mantém o histórico, mas remove o veículo do seletor de veículos
ativos.

## Gerenciar itens de manutenção

Na Garagem, use o formulário de itens para informar nome, intervalo em
quilômetros, intervalo em meses e a referência inicial. Pelo menos um dos dois
intervalos deve ser positivo. Itens podem ser editados ou removidos do plano;
remover um item preserva os serviços históricos associados.

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

No histórico da tela de Custos, use **Editar** para corrigir um serviço ou
**Excluir** para removê-lo após a confirmação. Os alertas, a referência do item
e os custos são recalculados depois da operação.

## Consultar custos e histórico

Abra **Custos** para consultar o total gasto, a divisão por tipo, os últimos
seis meses e os registros do veículo selecionado. Troque o veículo no seletor
para consultar outra base.

## Uso em celular e teclado

O layout é responsivo. No teclado, use `Tab` para avançar entre controles,
`Shift+Tab` para voltar e `Enter` ou `Espaço` para ativar botões. Mensagens de
erro aparecem junto do campo que precisa de correção.
