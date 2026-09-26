# Como contribuir com o AutoCUIDA

O grupo deve conseguir explicar a evolução do projeto a partir do GitHub.
Cada commit registra uma mudança coerente e verificável. O planejamento está
no [cronograma](docs/planejamento/cronograma.md) e a conferência funcional no
[roteiro de aceite](docs/testes/aceite-front-end.md).

## Antes de começar

Cada integrante usa sua própria conta do GitHub e aceita o convite do repositório
privado. Na sua cópia, configure `user.name` com seu nome e `user.email` com um
e-mail verificado na sua conta, ou o endereço de privacidade exibido pelo próprio
GitHub. Não copie a identidade de outro integrante.

Use uma cópia/clonagem própria por integrante. Evite editar a mesma pasta de
trabalho compartilhada via OneDrive ao mesmo tempo; o GitHub é o ponto de
integração das alterações. Consulte `git status` antes de mudar de branch.

## Fluxo de uma tarefa

Com o trabalho anterior salvo e a árvore limpa:

```bash
git switch main
git pull --ff-only origin main
git switch -c feat/cadastro-veiculos
```

Implemente uma parte demonstrável e confira o que mudou:

```bash
git status
git diff
npm run build
```

Execute também os cenários de aceite da parte alterada. Depois selecione os
arquivos da tarefa, confira o que será enviado e crie o commit. No exemplo,
substitua os caminhos pelos arquivos realmente modificados:

```bash
git add src/pages/GaragePage.jsx src/App.jsx
git diff --cached
git commit -m "feat(veiculos): adicionar formulario de cadastro"
git push -u origin feat/cadastro-veiculos
```

Abra um Pull Request (PR), descreva a mudança e peça revisão de um colega.
Novos commits na mesma branch aparecem no mesmo PR. Após aprovação, usar merge
que **preserve os commits individuais** quando houver etapas distintas; evitar
squash que esconda o progresso que o professor quer observar.

Após o merge, iniciar a próxima tarefa a partir da `main` atualizada. Se houver
conflito ou push rejeitado, sincronizar e resolver com o colega responsável;
não usar `push --force` para contornar a divergência.

## O tamanho de um commit

Um commit deve responder: o que mudou, por que mudou e como foi conferido.

Boas separações: cadastrar veículo; editar veículo; inativar com confirmação;
corrigir uma validação específica. Uma operação precisa continuar coerente:
formulário, estado e validação necessários ao cadastro podem pertencer ao mesmo
commit. Não separar artificialmente imports, handlers e telas para aumentar
a contagem. Também não misturar telas sem relação, formatação global e correções.

| Tipo | Uso | Exemplo |
| --- | --- | --- |
| `feat` | Comportamento novo | `feat(servicos): permitir editar registro` |
| `fix` | Corrigir falha | `fix(alertas): usar percentual real na classificacao` |
| `refactor` | Reorganizar mantendo comportamento | `refactor(dados): extrair calculo de custos` |
| `docs` | Documentação | `docs: registrar aceite do cadastro de veiculos` |
| `test` | Testes reproduzíveis | `test(alertas): cobrir vencimento por quilometragem` |
| `chore` | Configuração/dependências | `chore(ui): configurar tema do kit visual` |

Evitar mensagens como “alterações”, “final”, “ajustes” ou “trabalho pronto”.
O tipo é um padrão do grupo, não um requisito formal recebido do professor.

## Evidência mínima por PR

```text
Etapa e casos: F03; UC01/UC02; T05/T08
Mudança: o usuário consegue cadastrar e selecionar um veículo.
Validação: descrever passos, dados, resultado e build.
Pendências: listar somente as que ainda existem.
Revisão: integrante que conferiu a alteração.
```

Mencionar apoio de IA quando usado e explicar a revisão e os testes feitos pelo
integrante. Não atribuir a si testes não executados. Quem apresenta o trabalho
deve compreender o código, inclusive o que foi sugerido por ferramentas.

## Preservação do histórico

O commit `b59f1ab` já contém a versão inicial do aplicativo. Ele permanece como
ponto de partida real. A documentação e as próximas funcionalidades serão
registradas a partir dele, sem reescrever o passado para simular etapas antigas.
Os commits de documentação desta revisão também não equivalem a avanço funcional.

Os documentos de origem continuam recuperáveis no histórico, pelo GitHub ou
por `git show b59f1ab:"Descrição Protótipo.txt"` para o texto. Para baixar o
DOCX original, abrir esse arquivo na árvore do commit `b59f1ab` no GitHub.

## Padrão dos arquivos

- Documentação ativa em Markdown UTF-8, com nomes minúsculos e hífens.
- Um título principal por documento, títulos descritivos e links relativos.
- Datas no padrão DD/MM/AAAA; informar versão/data das análises.
- Distinguir conteúdo original, comportamento atual, decisão proposta e resultado testado.
- Atualizar documentação e cenários relacionados quando uma regra mudar.
- Versionar `package-lock.json`; deixar `node_modules/`, `dist/` e segredos ignorados.
- Não alterar código da aplicação apenas para converter documentação.
