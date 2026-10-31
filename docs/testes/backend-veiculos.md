# Verificação de veículos e dependências — 31/10/2026

Responsável: Rafael Duarte Yahata. Rodada referente aos incrementos de serviços,
router preparado para JWT e atualização dos lockfiles.

## Resultado

- Instalação completa reproduzida com `npm ci`.
- `npm test`: **93 testes aprovados**: 45 frontend, 11 mock e 37 backend.
- Builds API e demo aprovados com Vite 8.3.5.
- `npm start` iniciou frontend e mock; GET do frontend e lista de veículos
  retornaram HTTP 200. A árvore de processos criada para o teste foi encerrada.
- `npm audit` sem alertas conhecidos na raiz, frontend, mock e backend após as
  atualizações; isso não substitui revisão de segurança ou futuras auditorias.
- `git diff --check` sem erros de espaços.

## Cenários novos cobertos

1. Listas e consultas restritas ao proprietário recebido da autenticação.
2. Mutações alheias retornam 403; inexistência retorna 404 e ID inválido, 400.
3. Entrada sem identidade válida é recusada; router exige middleware explícito.
4. Cadastro/edição rejeitam proprietário/ativação indevidos, operadores e números inválidos.
5. Duplicidade de placa retorna 409 com erro de campo sem informar dono existente.
6. Gravações simultâneas de odômetro preservam a maior leitura aceita.
7. Edição com versão antiga não desfaz leitura ou dados alterados posteriormente.
8. Inativação é idempotente, preserva o veículo e bloqueia alterações pendentes.
9. JSON confirmado não inclui proprietário, `_id` ou `__v`.
10. Erros inesperados não expõem mensagens/consultas internas.

Banco real temporário (`mongodb-memory-server`), sem usar `MONGO_URL` pessoal e
sem gravar dados ou índices no Atlas compartilhado. As identidades usadas nos
testes HTTP são fixtures locais, não tokens JWT.

## Correções de dependências

Atualizados somente lockfiles, respeitando as faixas dos manifestos existentes:

| Área | Dependências corrigidas |
| --- | --- |
| Raiz | concurrently 9.2.5 e shell-quote 1.12.0 |
| Mock | body-parser 1.20.9 e qs 6.16.2 |
| Frontend | Vite 8.3.5, Zod 4.6.7 e source-map-js 1.2.2, com transitivas compatíveis |

Não houve troca de framework ou alteração das telas. Os alertas registrados
historicamente na etapa 1 foram resolvidos nesta rodada.

## Limites e pendências reais

- Voigt ainda precisa implementar JWT/cadastro/login. O router foi testado
  isoladamente e ainda não é montado no `app.js` sem o middleware real.
- Após JWT, montar `/vehicles`, inicializar índices antes de `listen` e verificar
  novamente com dois usuários/tokens reais.
- Seed real ainda depende de usuários da aplicação e modelos de itens/serviços;
  preservar a correspondência entre todos os identificadores durante a importação.
- A integração transacional serviço/odômetro pertence à frente de serviços e deve
  respeitar as condições de km/ativação e incrementar a versão do veículo.
- Aceite visual completo T01–T23, teclado/zoom e regra de estilos inline não foram
  homologados nesta rodada; permanecem para o fechamento do frontend.
- Nenhum teste realizado autoriza afirmar que o sistema completo com JWT,
  frontend e todos os módulos já está integrado ou pronto para produção.

Interfaces e montagem do módulo: [guia de veículos](../backend-veiculos.md).
