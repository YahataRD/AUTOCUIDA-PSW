# Filtro e histórico — rodada final de 06/10/2026

Base: `d6f0755`. Implementação e validação por Rafael Duarte Yahata, com assistência
do Codex. Dados do navegador servidos por json-server com cópia temporária em
memória da seed. `mock/db.json`, seed e documentos de GPTI preservados.

- `npm test`: **56 testes aprovados**, 45 frontend e 11 HTTP. As três regressões
  novas verificam edição de item removido em demo/API, persistência, custos,
  isolamento, cronologia e rejeição de novos vínculos com itens inativos.
- Builds API e demo aprovados.
- Filtro no Golf: Todos 4, Em dia 2, Próximo 1, Vencido 1; contagens e cards
  correspondentes conferidos. O resumo continua representando o veículo inteiro.
- Onix sem vencidos: estado vazio e Mostrar todos funcionando. Trocar de veículo
  restaura Todos. Seleção por teclado conferida.
- Remoção do Filtro de Ar pela Garagem: histórico preservado; em Custos, item
  original aparece como removido do plano e seu serviço aceita edição de valor.
- Valor alterado de R$ 120 para R$ 150: total R$ 2.230 e média R$ 25, persistidos
  após recarregar. Item removido permanece ausente do cadastro de novos serviços.
- Filtro vazio e lista conferidos em 390 × 844 e 1366 × 900, sem transbordamento
  horizontal. Console consultado sem erros ou avisos retornados.

P01 e P03 estão corrigidas. Esta rodada não representa execução integral de
T01–T23 por revisor independente. A evidência de contribuições e a ressalva da
EAP sobre dimensões inline continuam no [relatório](../entrega-avaliacao.md).
