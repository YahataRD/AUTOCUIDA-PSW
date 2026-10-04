# AutoCUIDA

Aplicação web para acompanhar a manutenção preventiva e corretiva de veículos.
O AutoCUIDA reúne alertas de revisão, registros de serviços e custos de
manutenção, considerando o tempo e a quilometragem percorrida.

Projeto desenvolvido para a disciplina de Programação de Software Web.

## Demonstração online

[Abrir o AutoCUIDA](https://YahataRD.github.io/AUTOCUIDA-PSW/).

A publicação no GitHub Pages é atualizada automaticamente após alterações na
`main`, desde que os testes e o build passem. O andamento pode ser acompanhado
na [aba Actions](https://github.com/YahataRD/AUTOCUIDA-PSW/actions/workflows/deploy-pages.yml).
O Pages usa o modo `demo`, identificado na interface: cada visitante usa dados
em memória, restaurados ao recarregar. A integração com json-server roda localmente.

## Funcionalidades atuais

| Tela | Funcionalidades |
| --- | --- |
| Painel | Situação dos itens de manutenção, percentuais de desgaste e alertas próximos ou vencidos |
| Garagem | Cadastro, seleção do veículo, consulta dos dados e atualização do odômetro |
| Registro de serviço | Lançamento de manutenção preventiva ou corretiva, com item, data, quilometragem, valor e oficina |
| Custos | Total gasto, distribuição por tipo de manutenção, gráfico dos últimos seis meses e histórico de serviços |

Atualizar o odômetro recalcula os alertas. Registrar um serviço atualiza o
histórico, os custos e a referência de manutenção do item escolhido.

A base compartilhada consulta veículos, itens e serviços na API do json-server.
Os dados iniciais incluem dois veículos. Cada veículo tem seus próprios itens, serviços e custos. A seleção está
disponível em todas as telas e é preservada na URL, junto com a seção aberta.
Voltar/Avançar funciona entre essas URLs. O carregamento trata falhas com nova
tentativa e as telas orientam quando não há veículos, itens ou serviços.

## Primeira entrega

A primeira entrega está prevista para **6 de outubro de 2026**, com o front-end
integrado ao backend mockado com json-server, sem backend real ou banco de dados.
TanStack Query, React Hook Form e Zod estão integrados. A adoção de um framework
responsivo, também exigido pelo professor, continua pendente.

Ainda estão previstos:

- Edição e inativação de veículos.
- Cadastro, edição e remoção de itens e suas regras de manutenção.
- Edição e exclusão de serviços, com atualização dos alertas e custos.
- Padronização visual e revisão da navegação, dos formulários e da responsividade.

As etapas e datas estão no [cronograma](docs/cronograma.md).

## Tecnologias

React 18, Vite 8, JavaScript ES6+, TanStack Query 5, React Hook Form 7, Zod 4
e json-server 0.17.4. Os formulários usam schemas Zod por meio de
`@hookform/resolvers`. A interface ainda usa CSS próprio.

## Como executar

É necessário ter Node.js 22.12 ou superior e npm instalados.

Execute na raiz do repositório, em um único terminal:

```bash
git clone https://github.com/YahataRD/AUTOCUIDA-PSW.git
cd AUTOCUIDA-PSW
npm ci
npm start
```

`npm ci` instala as dependências da raiz, do frontend e do mock. `npm start`
inicia os dois serviços juntos, com logs identificados. Abra o endereço exibido
pelo Vite, normalmente `http://localhost:5173/AUTOCUIDA-PSW/`. Ctrl+C encerra ambos.
Se um serviço encerrar, o outro também é encerrado.

As pastas `frontend/` e `mock/` organizam o código; não exigem terminais separados.
Após a primeira instalação, basta executar `npm start`. `npm run dev` é um atalho
equivalente. Os comandos individuais das duas pastas continuam disponíveis.

O mock atende em `http://127.0.0.1:3001`. Na primeira execução, copia `mock/seed.json`
para `mock/db.json`. As alterações persistem nesse arquivo, ignorado pelo Git.
Reiniciar o projeto preserva os dados.

Para mudar a API, copie `frontend/.env.example` para `frontend/.env`, ajuste
`VITE_API_URL` e reinicie o projeto. O padrão é a API local; falhas nunca ativam o demo.
Para restaurar os dados, pare o projeto e execute `npm run reset` na raiz.
O reset descarta as alterações locais e restaura a seed versionada.

O repositório é público; para enviar alterações, é necessário acesso de colaboração.

No PowerShell, caso a execução de scripts esteja bloqueada, use `npm.cmd`
no lugar de `npm`.

### Build de produção

```bash
npm run build
npm run preview
```

Execute ambos os comandos na raiz. O build é gerado em `frontend/dist/`.
`npm run preview` inicia o mock e a prévia desse build juntos, normalmente em
`http://localhost:4173/AUTOCUIDA-PSW/`. Pare `npm start` antes de iniciar a prévia.

### Publicação

O workflow `.github/workflows/deploy-pages.yml` instala as dependências, executa
os testes de `frontend/` e `mock/`, verifica o build com API e gera o demo com
`VITE_DATA_MODE=demo`. Publica somente o conteúdo de
`frontend/dist/`. Também pode ser
executado manualmente pela aba Actions na branch `main`.

Em **Settings → Pages → Build and deployment**, a fonte deve ser **GitHub Actions**.
O caminho `/AUTOCUIDA-PSW/` está definido em `frontend/vite.config.js` e é usado também pelo
site. A seed do demo é incluída no bundle; o Pages não executa a API. Não é necessário versionar `frontend/dist/`, criar uma branch `gh-pages` ou
publicar os documentos do repositório.

### Verificar a base compartilhada

```bash
npm test
npm run build
```

`npm test` na raiz executa as duas suítes, usando o executor nativo do Node.js.
A integração HTTP usa uma base temporária e não altera `mock/db.json`.
Veja os registros de [integração](docs/testes/integracao-mock.md) e
[formulários](docs/testes/formularios.md).
O [contrato da base](docs/base-compartilhada.md) explica como continuar o
desenvolvimento. O [registro de validação](docs/testes/base-compartilhada.md)
separa os testes executados das funcionalidades ainda pendentes.

## Organização do código

A aplicação, suas dependências, testes e protótipos ficam em `frontend/`.
Os caminhos de código abaixo são relativos a essa pasta. A documentação permanece
em `docs/` e o workflow de publicação em `.github/workflows/` na raiz do repositório.

- `src/App.jsx`: ligação da base compartilhada com as telas.
- `src/hooks/`: TanStack Query, comandos assíncronos e navegação por hash.
- `src/state/autoCuida.js`: ações de odômetro/serviço e consultas por veículo.
- `src/navigation/routes.js`: interpretação e construção das URLs.
- `src/pages/`: Painel, Garagem, Registro de Serviço e Custos.
- `src/components/`: componentes reutilizáveis da interface.
- `src/data/`: cliente HTTP, consultas/mutações, adaptador demo e validações.
- `src/data/formSchemas.js`: schemas de cadastro, odômetro e serviço; conversão de campos.
- `../mock/seed.json`: fonte única dos dados iniciais da API e do demo.
- `src/utils/`: cálculos de manutenção, custos e formatação.
- `style.css`: estilos da aplicação.

Os arquivos `manutencoes.html`, `registro.html` e `veiculo.html` em `frontend/` são
referências do protótipo anterior. A aplicação React usa `index.html` como
ponto de entrada.

## Como funcionam os alertas e custos

Cada item possui uma referência de último serviço e intervalos por distância
e tempo. O sistema usa o maior desgaste entre os dois. Na implementação atual,
os percentuais são arredondados antes da classificação: abaixo de 80% indica
**Em dia**, de 80% a menos de 100% indica **Próximo** e a partir de 100% indica
**Vencido**.

O total de custos considera todos os serviços registrados. O gráfico e a média
mensal consideram o mês atual e os cinco anteriores, incluindo meses sem gastos.

## Limitações atuais

No modo API, os dados persistem no mock. As validações ficam no frontend; o
json-server não implementa autenticação, regras de negócio ou transações.
Gravações simultâneas de vários clientes não têm garantia de exclusividade.

Um serviço pode exigir PATCH do odômetro seguido de POST do registro. Se o POST
falhar, o odômetro pode já ter sido atualizado. A interface orienta conferir o
histórico antes de repetir; gravações não são repetidas automaticamente.
Somente no modo demo os dados são restaurados ao recarregar a página.
Ainda faltam edição/inativação de veículos, gestão de itens e edição/exclusão de serviços.

Na Garagem, **Cadastrar veículo** permite informar placa, modelo, ano e km inicial.
Placas antigas e Mercosul são aceitas; placas repetidas são bloqueadas mesmo com
diferenças de caixa, espaços ou hífen. Ao salvar, o novo veículo é selecionado e
começa sem itens ou serviços. Cancelar descarta apenas o formulário.

Serviços retroativos coerentes não substituem uma referência mais recente e não
diminuem o odômetro. A confirmação informa o recálculo, sem prometer que o alerta
foi encerrado. Os limites de arredondamento e vencimentos por calendário ainda
precisam de revisão na etapa de alertas. O kit visual ainda não foi adotado.
