# Manual de instalação

## Requisitos

- Node.js 22.12 ou superior.
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

## Publicação

O workflow do GitHub Actions executa testes e build após cada push na `main`.
O GitHub Pages usa `VITE_DATA_MODE=demo`; nessa modalidade os dados ficam em
memória e são reiniciados ao recarregar a página. O modo demo não substitui o
json-server para desenvolvimento local.

