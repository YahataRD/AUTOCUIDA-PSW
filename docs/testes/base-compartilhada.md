# Validação da base compartilhada

Data: 02/10/2026. Código: `f48f9a7`, branch `codex/base-compartilhada`.
Execução assistida por Codex; revisão independente de um integrante ainda pendente.
Ambiente: Windows, Node 24.18.0, npm 11.16.0, navegador integrado do Codex.

## Verificações automatizadas

`npm test`: **17 testes aprovados**, sem falhas. Arquivo: `tests/base.test.js`.
As datas dos cenários são fixas, com referência em 02/10/2026.

- Formato inicial, listas vazias, IDs e vínculos inválidos.
- Isolamento de itens, registros, custos e odômetro entre dois veículos.
- Atualizações imutáveis e rejeição de km igual, menor, fracionária ou inválida.
- Rejeição de item de outro veículo, inativo ou inexistente.
- Veículo/item inativo preservando histórico e custos.
- Serviço retroativo coerente mantendo a referência recente e o odômetro.
- Recuperação de referência anterior/inicial quando o conjunto de registros muda.
- Desempate por km em serviços no mesmo dia.
- Campos inválidos, data futura, ID duplicado e identidade controlada pela base.
- Intervalo de km ou tempo desabilitado sem NaN/infinito.
- Carga HTTP, encaminhamento do AbortSignal, falha de rede/status/JSON/formato e nova leitura.
- URLs, parâmetros codificados, IDs ausentes/inativos e item de outro veículo.

`npm run build`: **aprovado**, 36 módulos. Nenhuma dependência foi adicionada
ao projeto. `git diff --check`: aprovado. A comparação do JSON com a cópia
anterior aos testes manuais confirmou a restauração dos dados de demonstração.

## Verificações no navegador

| Cenário e preparação | Resultado observado |
| --- | --- |
| Abrir sem hash | Normalização para `#/painel?veiculo=1`; Golf, 48.250 km e quatro itens |
| Selecionar Onix e abrir Custos | Zero serviços e custos, gráfico sem valores inválidos e mensagem de histórico vazio |
| Registrar no Onix um serviço de R$ 100, 22.000 km, em 02/10 | Um serviço no histórico, total R$ 100 e média R$ 16,67 |
| Trocar para Golf após o registro | Quatro registros e total R$ 2.200 preservados |
| Voltar e Avançar entre as seleções na tela Custos | URL, veículo e valores corretos; dados em memória preservados |
| Preencher valor/oficina no Golf e trocar para Onix | Formulário limpo, item e km do Onix; sem transportar o rascunho |
| Recarregar em `#/servico?veiculo=2` | Tela Serviço e Onix preservados na URL; dados iniciais restaurados |
| Atualizar Golf para 49.000 km e selecionar Onix | Golf atualizado; Onix continua em 22.000 km; feedback do Golf não aparece no Onix |
| JSON temporariamente sem as listas obrigatórias | Mensagem de dados indisponíveis, navegação presente e botão Tentar novamente |
| Restaurar JSON e clicar Tentar novamente | Recuperação da tela e do veículo solicitado, sem exceção |
| JSON temporariamente sem itens do Onix | Formulário substituído por orientação e botão Ver painel; painel mostra mensagem sem itens |
| JSON com três listas vazias | Mensagem Nenhum veículo ativo, opção de recarregar e URL sem ID inválido |
| Resposta do JSON atrasada 15 s em servidor local de teste | Carregando veículos visível; depois, Custos do Onix corretamente exibidos |
| URL `#/inexistente?veiculo=999&item=5` | Retorno seguro a `#/painel?veiculo=1` |
| URL `#/servico?veiculo=2&item=1` | Item do outro veículo removido da URL; formulário apresenta somente o item do Onix |
| Garagem com seletor em viewports 360, 768 e 1280 px | Sem rolagem horizontal da página; inspeção visual em 360 px |
| Logs dos fluxos observados | Nenhum aviso ou erro retornado pelo navegador |

O atraso de 15 s existiu apenas no servidor de teste fora do repositório; não foi
introduzido no aplicativo. Os JSONs temporários foram restaurados antes do commit.

## Como reproduzir carga e vazios

Em uma cópia local de teste, guardar `public/data/autocuida.json` e restaurá-lo
ao final. Um objeto sem as três listas deve mostrar erro; corrigir o arquivo e
usar Tentar novamente deve recuperar a tela. Três listas vazias devem mostrar
ausência de veículos. Para testar um veículo sem itens, retirar seus itens e
registros juntos, mantendo o veículo. Para simular carga lenta, usar limitação
de rede das ferramentas do navegador, sem mudar a aplicação.

Não enviar os dados temporários de teste para a branch de entrega.

## Limites desta aprovação

Este registro valida a etapa de base, não o front-end completo nem todos os
cenários T01–T23 do planejamento. Cadastro/edição/inativação de veículos,
gestão de itens, edição/exclusão de serviços, filtro, kit visual e revisão
completa de teclado/zoom/responsividade continuam nas próximas etapas.

Os limites de arredondamento e o vencimento por calendário ainda precisam de
correção específica. O teste de referência anterior não afirma que já existe
interface para excluir serviços. Nenhum documento de `docs/GPTI/` foi alterado.
