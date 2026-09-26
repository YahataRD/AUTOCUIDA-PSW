# AutoCUIDA

Aplicação web para acompanhar a manutenção preventiva e corretiva de veículos.
O AutoCUIDA reúne alertas de revisão, registros de serviços e custos de
manutenção, considerando o tempo e a quilometragem percorrida.

Projeto desenvolvido para a disciplina de Programação de Software Web.

## Funcionalidades atuais

| Tela | Funcionalidades |
| --- | --- |
| Painel | Situação dos itens de manutenção, percentuais de desgaste e alertas próximos ou vencidos |
| Garagem | Consulta dos dados do veículo e atualização do odômetro |
| Registro de serviço | Lançamento de manutenção preventiva ou corretiva, com item, data, quilometragem, valor e oficina |
| Custos | Total gasto, distribuição por tipo de manutenção, gráfico dos últimos seis meses e histórico de serviços |

Atualizar o odômetro recalcula os alertas. Registrar um serviço atualiza o
histórico, os custos e a referência de manutenção do item escolhido.

## Primeira entrega

A primeira entrega está prevista para **6 de outubro de 2026**, com o front-end
funcionando com dados simulados, sem back-end ou banco de dados.

Ainda estão previstos:

- Cadastro, seleção, edição e inativação de veículos.
- Cadastro, edição e remoção de itens e suas regras de manutenção.
- Edição e exclusão de serviços, com atualização dos alertas e custos.
- Padronização visual e revisão da navegação, dos formulários e da responsividade.

As etapas e datas estão no [cronograma](docs/cronograma.md).

## Tecnologias

React 18, Vite 8, JavaScript, HTML e CSS. A interface atual utiliza componentes
funcionais, estado local do React e CSS próprio.

## Como executar

É necessário ter Node.js 22.12 ou superior e npm instalados.

```bash
git clone https://github.com/YahataRD/AUTOCUIDA-PSW.git
cd AUTOCUIDA-PSW
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173/`.
Se já tiver o projeto na máquina, execute os comandos npm dentro da pasta dele.
O repositório é privado e exige acesso autorizado para clonagem.

No PowerShell, caso a execução de scripts esteja bloqueada, use `npm.cmd`
no lugar de `npm`.

### Build de produção

```bash
npm run build
npm run preview
```

O build é gerado em `dist/`. O comando de preview permite conferir essa versão
localmente.

## Organização do código

- `src/App.jsx`: estado compartilhado e navegação entre as telas.
- `src/pages/`: Painel, Garagem, Registro de Serviço e Custos.
- `src/components/`: componentes reutilizáveis da interface.
- `src/data/initialData.js`: dados de demonstração.
- `src/utils/`: cálculos de manutenção, custos e formatação.
- `style.css`: estilos da aplicação.

Os arquivos `manutencoes.html`, `registro.html` e `veiculo.html` na raiz são
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

Os dados ficam na memória do navegador e são restaurados ao recarregar a página.
A versão atual trabalha com um único veículo de demonstração e ainda não possui
todos os cadastros e operações previstos para a entrega.

Serviços retroativos, limites de arredondamento e vencimentos por calendário
precisam de revisão. Registrar um serviço antigo não garante desgaste de 0%;
a mensagem de confirmação atual ainda precisa refletir corretamente esse caso.
