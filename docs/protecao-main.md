# Proteção da branch main

O workflow `Publicar no GitHub Pages` executa o job `build` nos pull requests para `main`. Esse job instala as dependências, executa `npm test`, verifica o build com API, gera a demonstração do Pages e prepara seu artefato. Qualquer falha impede o sucesso do job. A publicação real continua restrita à `main` e depende do sucesso de `build`.

## Ativar a regra no GitHub

O arquivo `.github/rulesets/main.json` é a configuração da regra. Sua presença no repositório **não ativa a proteção**. Um administrador deve aplicá-la pelo GitHub, depois de integrar a alteração do workflow.

Em **Settings → Rules → Rulesets → New ruleset → Import a ruleset**, importe o JSON e confirme que a regra está **Active**, direcionada a `main`, sem atores na lista de bypass e com `build` do GitHub Actions como verificação obrigatória.

Alternativamente, na raiz do projeto, com GitHub CLI autenticado em uma conta com permissão de administração do repositório:

```sh
gh api --method POST repos/YahataRD/AUTOCUIDA-PSW/rulesets \
  --input .github/rulesets/main.json
```

Esse comando cria uma regra; execute-o uma única vez. Confira o resultado em Settings → Rules → Rulesets.

A regra exige pull request, branch atualizada com `main` e sucesso de `build`; também impede force pushes e exclusão da `main`. Não exige aprovações de revisores nem permite bypass por administradores. Pushes diretos para `main` ficam bloqueados. Commits locais e pushes para branches de trabalho continuam permitidos para possibilitar a execução das verificações.

## Limite do deploy do Pages

O deploy real acontece após o merge. Por isso, seu resultado não pode impedir retroativamente esse mesmo merge. A regra exige antes do merge os testes e toda a preparação do site; falhas de publicação ou de infraestrutura do Pages ainda podem ocorrer depois. Exigir o job `deploy` como check do pull request não resolve isso, pois ele é ignorado nesse evento.

## Conferir a proteção

Após ativar a regra, confira em um pull request para `main` se `build` aparece como obrigatório e se o merge fica indisponível enquanto o job está pendente ou falhando. Após cada novo commit no pull request, a verificação deve ser executada novamente. Não faça um push inválido na `main` para testar a regra.
