# AutoCUIDA

Aplicação acadêmica de Programação de Software Web para acompanhar manutenção
preventiva e corretiva de veículos, alertas de revisão e custos dos serviços.

**Primeira entrega: 6 de outubro de 2026.** O objetivo desta etapa é concluir o
front-end com dados simulados, sem back-end próprio ou banco de dados. A evolução
deve ser demonstrável em commits pequenos e descritivos no GitHub.

Repositório: [YahataRD/AUTOCUIDA-PSW](https://github.com/YahataRD/AUTOCUIDA-PSW).

## Situação atual

A versão inicial (`b59f1ab`) contém quatro telas React: Painel, Garagem,
Registro de Serviço e Custos. Já é possível atualizar o odômetro, recalcular
alertas, registrar um serviço e consultar seu impacto no histórico e nos custos.

O front-end **ainda não está completo em relação ao planejamento original**.
Faltam os fluxos completos de veículos, configuração de itens de manutenção,
edição e exclusão de serviços, além do alinhamento visual e dos testes de aceite.
O [escopo e diagnóstico](docs/planejamento/escopo-front-end.md) discrimina essas
pendências e o que significa concluir a primeira entrega.

Os dados permanecem somente na memória do navegador. Recarregar a página
restaura os dados de demonstração. Não há login, API de negócio ou persistência.

## Documentação

Comece pelo [índice da documentação](docs/README.md). Para trabalhar em grupo,
leia o [guia de contribuição e commits](CONTRIBUTING.md).

| Documento | Conteúdo |
| --- | --- |
| [Descrição do protótipo](docs/prototipo.md) | Propósito, processo de negócio, entidades e 16 casos de uso |
| [Validação dos requisitos](docs/validacao-requisitos.md) | Matrizes CRUD, perfis e priorização originais |
| [Arquitetura e execução](docs/arquitetura.md) | Componentes, estado, regras atuais e limitações |
| [Base das aulas](docs/referencias/aulas.md) | Síntese das cinco aulas e referências por página |
| [Escopo do front-end](docs/planejamento/escopo-front-end.md) | Situação do código, decisões propostas e definição de pronto |
| [Cronograma até 06/10](docs/planejamento/cronograma.md) | Etapas diárias, esforço, dependências e commits sugeridos |
| [Roteiro de aceite](docs/testes/aceite-front-end.md) | Cenários para verificar a conclusão do front-end |

Toda documentação ativa do projeto é mantida em Markdown. Os originais
`Descrição Protótipo.txt` e `AutoCUIDA-Validacao-Requisitos.docx` foram substituídos
pelas versões em `docs/` e continuam recuperáveis no commit `b59f1ab`.
Os PDFs fornecidos pelo professor são fontes de consulta; sua síntese está em
Markdown, com identificação de arquivo e página. Não foram publicados no repositório.

## Executar localmente

Pré-requisitos: Git e **Node.js 22.12 ou superior** em uma linha compatível com
o Vite instalado. O npm acompanha o Node.js. O campo `engines` do Vite atual
aceita `^20.19.0 || >=22.12.0`; adotamos 22.12 como mínimo documentado do projeto.

Para quem ainda não tem uma cópia, após aceitar o convite do repositório privado:

```bash
git clone https://github.com/YahataRD/AUTOCUIDA-PSW.git
cd AUTOCUIDA-PSW
npm ci
npm run dev
```

Quem já está na pasta do projeto executa somente `npm ci` e `npm run dev`.
Abra o endereço informado pelo Vite, normalmente `http://localhost:5173/`.
`npm ci` reproduz as dependências do `package-lock.json`. Use `npm install`
quando for alterar dependências intencionalmente, incluindo o lockfile no commit.

Se o PowerShell bloquear scripts, use `npm.cmd ci` e `npm.cmd run dev`, sem
alterar a política de segurança do sistema.

## Build de produção

```bash
npm run build
npm run preview
```

O build é gerado em `dist/`, ignorado pelo Git. No PowerShell, os equivalentes
são `npm.cmd run build` e `npm.cmd run preview`.

Em 25/09/2026, o build da versão inicial foi executado com sucesso. Isso verifica
a compilação; não substitui testes de interação, acessibilidade e responsividade.

## Demonstração do fluxo existente

1. Abra o Painel e observe o Óleo do Motor vencido por quilometragem.
2. Use a ação Registrar manutenção e mantenha o item selecionado.
3. Informe serviço na data e quilometragem atuais, valor positivo e oficina.
4. Registre o serviço e confira o novo ciclo no Painel.
5. Consulte o lançamento no histórico e nos custos.
6. Na Garagem, aumente a quilometragem e confira o recálculo dos alertas.

Serviços retroativos não garantem desgaste de 0% ou ausência de alerta: o tempo
e a distância percorridos desde o serviço continuam contando. Esse cenário e a
mensagem de confirmação atual precisam ser revistos antes da entrega.
