# Integridade das edições — 06/10/2026

## Problemas corrigidos

Antes desta etapa, três gravações podiam deixar os dados incompatíveis com a
validação da próxima leitura: reduzir o odômetro na edição do veículo, editar
um serviço acima do odômetro sem atualizar o veículo e alterar a referência de
um item de forma incompatível com seu histórico.

As regras de veículo e item são compartilhadas entre API e demo. Cadastro e
edição de serviços usam a mesma sequência de persistência: ampliar o odômetro,
se necessário, e só então gravar o serviço. O cache também recebe a nova leitura.

## Verificação executada

- Três testes de regressão do demo/cache falharam antes das correções e passaram
  depois, reproduzindo os defeitos identificados.
- Redução do odômetro rejeitada com erro associado ao campo; leitura igual e
  alteração do modelo continuam aceitas, preservando o histórico.
- Referência incompatível rejeitada, inclusive em item inativo; editar intervalos
  mantém a referência quando não alterada e não reativa o item.
- Edição de serviço com maior km atualiza demo e cache mesmo sem refetch;
  edição posterior com km menor não reduz o odômetro nem duplica registros.
- No json-server, tentativas inválidas não enviam escrita; uma nova instância
  do cliente consegue recarregar a base depois das operações.
- PATCH precede PUT quando a km aumenta. Falha no PATCH impede o PUT; falha no
  PUT preserva o histórico anterior e informa a atualização parcial do odômetro.
- Custos e referência derivada são recalculados; o outro veículo é preservado.
- `npm test`: 45 testes aprovados (35 frontend e 10 integração HTTP).
- `npm run build`: aprovado.

Os testes HTTP usam arquivos temporários e não alteram `mock/db.json`.
O json-server continua sem transações ou controle de concorrência entre clientes.
Esta etapa não corrige dados previamente inválidos nem as demais pendências
de calendário, formulários, filtro ou edição de serviços de itens inativados.
