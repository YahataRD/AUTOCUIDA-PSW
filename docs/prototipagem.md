# Prototipagem — AutoCUIDA

Data: **06/10/2026**. Código analisado: [`8133fd6`](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/8133fd61e5b0b6dfe901d1c033dbf43147319d1b).
Responsável pela verificação final: **Rafael Voigt Villas Boas**, conforme informado pela equipe.
Revisão documental e verificações assistidas por Codex; não houve alteração do código funcional nesta revisão.

## Objetivo e público

O AutoCUIDA propõe reunir plano de manutenção, registros de serviços e gastos de veículos, ajudando o proprietário ou responsável por pequena frota a acompanhar revisões por tempo e quilometragem. A AV1 demonstra o perfil de proprietário, sem login ou permissões por perfil.

Esta versão em Markdown consolida a [descrição original](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/d7e5b6f/docs/prototipo.md) e a [matriz CRUD e de perfis](https://github.com/YahataRD/AUTOCUIDA-PSW/blob/d7e5b6f/docs/validacao-requisitos.md). É uma revisão para entrega, não uma declaração de que todas as funcionalidades planejadas já existiam no protótipo inicial. Os arquivos HTML preservados em frontend/ são referências visuais; a versão inicial b59f1ab também já continha React.

## Processo proposto

1. Cadastrar e selecionar um veículo.
2. Configurar itens de manutenção e intervalos por km e/ou meses.
3. Atualizar o odômetro e consultar os alertas.
4. Registrar o serviço realizado, com data, km, valor e oficina.
5. Recalcular o ciclo de manutenção e consultar histórico e gastos.
6. Corrigir registros quando necessário, preservando os vínculos entre as entidades.

## Telas e navegação

| Tela | Conteúdo e ações planejadas | Referência existente |
| --- | --- | --- |
| Painel | Resumo do veículo, cards Em dia/Próximo/Vencido, acesso ao registro e filtro de situação | frontend/src/pages/DashboardPage.jsx; frontend/manutencoes.html como referência histórica |
| Garagem | Cadastro, consulta, edição, inativação, odômetro e gestão de itens | frontend/src/pages/GaragePage.jsx; frontend/veiculo.html |
| Serviço | Formulário preventivo/corretivo, item, data, km, valor e oficina | frontend/src/pages/ServicePage.jsx; frontend/registro.html |
| Custos | Total, tipos, gráfico de seis meses, média, histórico e ações de edição/exclusão | frontend/src/pages/CostsPage.jsx |

A navegação principal tem quatro seções; o seletor de veículo aparece em todas. URLs com hash preservam seção e veículo. O tema usa fundo escuro, cartões, contraste por situação e rótulos textuais. O layout atual usa **Tailwind CSS 4** e variantes responsivas; Bootstrap foi uma etapa intermediária substituída no histórico.

## Entidades e casos de uso

| Entidade | Operações da proposta | Realização atual |
| --- | --- | --- |
| Veículo | UC01 criar, UC02 consultar, UC03 atualizar, UC04 inativar; UC15 odômetro | Coleção vehicles; inativação lógica |
| Item de manutenção | UC05 criar, UC06 consultar, UC07 atualizar, UC08 remover | maintenanceItems ligada por vehicleId; remoção lógica |
| Registro de manutenção | UC09 registrar, UC10 consultar, UC11 editar, UC12 excluir | serviceRecords ligada ao veículo e ao item |
| Alerta | UC13 visualizar e UC14 dar baixa, geração e encerramento automáticos | Derivado das referências e dos intervalos; sem coleção própria |
| Relatório | UC16 consultar custos | Agregação dos serviços do veículo |

## Regras e critérios de aceite planejados

- Desgaste: maior valor entre tempo e km; Em dia abaixo de 80%, Próximo de 80% a menos de 100%, Vencido a partir de 100%. Classificar antes de arredondar para exibição.
- Tempo: respeitar vencimento por calendário, inclusive fim de mês e fevereiro. P02 foi corrigida após a revisão documental; veja a [validação dos alertas](testes/calendario-alertas.md).
- Odômetro só avança; placa é única após normalização; serviço não aceita data futura, valor zero ou campos obrigatórios vazios.
- Referência inicial do item e histórico determinam a referência mais recente. Serviço retroativo coerente não reduz odômetro nem substitui a referência mais recente.
- Inativar veículo/remover item preserva o histórico. Excluir um serviço recalcula os custos e a referência sem diminuir odômetro.
- Trocar de veículo não mistura dados; carregamento, erro, vazio e confirmação devem orientar o usuário.
- Validar todas as telas, formulários e confirmações em celular, desktop, teclado e zoom.

## Limites e resultado da prototipagem

Não foram prometidos na AV1 autenticação real, notificações externas, integração com oficinas, banco de produção ou sincronização. Exportação e filtros financeiros avançados eram opcionais. O filtro por situação do Painel, previsto como essencial, foi implementado na [rodada final](testes/filtro-historico.md).

A maior parte dos fluxos evoluiu para React com API mockada. A [matriz de entrega](entrega-avaliacao.md) compara os 16 casos de uso e explicita limitações. A presença de uma tela ou um protótipo não é evidência suficiente de aceite funcional; consulte o [refinamento](refinamento-prototipagem.md) e a [verificação final](testes/verificacao-final.md).
