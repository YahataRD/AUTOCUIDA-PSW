# Formulários e ações — 06/10/2026

Validação executada com uma cópia em memória de `mock/seed.json`, sem alterar
o banco de desenvolvimento. Frontend ligado à API mock pela variável `VITE_API_URL`.

- `npm test`: 47 testes aprovados (37 do frontend e 10 de integração HTTP).
  As novas regressões cobrem intervalos opcionais, datas inválidas/futuras
  e associação dos erros aos campos pelo resolver Zod.
- Builds de produção nos modos API e demo aprovados.
- Cadastro vazio de item: erros junto dos campos, foco no primeiro erro e
  referências `aria-describedby` válidas. Cadastro com intervalo somente em km
  concluído com mensagem de sucesso.
- Edição de veículo com odômetro menor: operação rejeitada, mensagem exibida e
  modelo digitado preservado após a reconsulta.
- Edição de serviço com valor inválido e oficina vazia: mensagens por campo.
  Campos vazios também rejeitados. Layout conferido em 390 × 844 e 1366 × 900,
  sem transbordamento horizontal da página.
- Falhas HTTP 500 simuladas na remoção de item, exclusão de serviço e inativação
  de veículo: mensagem visível, dados preservados e controles bloqueados durante
  a requisição. Nenhum erro de execução registrado no console consultado.
- Nova tentativa de exclusão após recuperar a API: sucesso, histórico de quatro
  para três serviços e total de R$ 2.200,00 para R$ 2.080,00.

O calendário dos alertas e a edição de serviços de itens inativados serão
verificados nas próximas etapas.
