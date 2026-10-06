# Manual de instalação

Revisado em 06/10/2026 para a base 8133fd6. Consulte as [ressalvas da entrega](entrega-avaliacao.md).

## Requisitos

- Node.js 22.12+ na linha 22, ou linha 24. Esta revisão executou Node.js 22.14.0 e npm 11.6.0; o workflow usa Node 24.
- npm.
- Git.
- Navegador moderno.

## Instalação

No PowerShell:

```powershell
git clone https://github.com/YahataRD/AUTOCUIDA-PSW.git
Set-Location .\AUTOCUIDA-PSW
npm ci
```

O comando instala as dependências da raiz, do frontend e do mock.

## Execução local

```powershell
npm start
```

Abra o endereço exibido pelo Vite, normalmente
`http://localhost:5173/AUTOCUIDA-PSW/`. O json-server atende em
`http://127.0.0.1:3001`.

No PowerShell com execução de scripts bloqueada, use `npm.cmd` no lugar de
`npm`.

## Configuração da API

O padrão é `http://127.0.0.1:3001`. Para usar outro endereço:

```powershell
Copy-Item .\frontend\.env.example .\frontend\.env
```

Edite `frontend/.env` e defina `VITE_API_URL`. Reinicie o Vite depois da
alteração.

## Dados iniciais e reset

`mock/seed.json` é a seed versionada e contém os dados iniciais dos veículos,
itens e serviços. Na primeira execução, `mock/prepare-db.js` cria
`mock/db.json`; esse arquivo é local e ignorado pelo Git.

Para descartar alterações locais e restaurar a seed, pare o projeto e execute:

```powershell
npm run reset
```

## Testes e build

```powershell
npm test
npm run build
```

Para testar a prévia de produção:

```powershell
npm run preview
```

O comando inicia o mock e a prévia. Pare qualquer `npm start` antes de
executá-lo.

## Problemas de instalação e execução

- Execute os comandos na raiz, onde está o package.json que coordena frontend e mock. Não use apenas os HTML antigos.
- Se npm ci falhar, confira rede, acesso ao registro npm e versão do Node; mantenha os lockfiles para reproduzir as versões.
- Se a porta 3001 estiver ocupada, encerre a instância anterior do mock. Se o Vite usar outra porta, abra a URL impressa no terminal.
- Se aparecer “Dados indisponíveis”, confira o terminal do mock e VITE_API_URL. API indisponível não ativa o demo automaticamente.
- Para restaurar apenas os exemplos, use o reset documentado; ele apaga as alterações de mock/db.json.
- No build, variáveis VITE_* são incorporadas ao bundle: se mudar a API ou o modo, gere o build novamente.

## Publicação

O workflow do GitHub Actions executa testes e build após cada push na `main`.
O GitHub Pages usa `VITE_DATA_MODE=demo`; nessa modalidade os dados ficam em
memória e são reiniciados ao recarregar a página. O modo demo não substitui o
json-server para desenvolvimento local.
