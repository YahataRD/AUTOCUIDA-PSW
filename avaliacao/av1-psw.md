# Correção da AV1 — PSW — AutoCUIDA

Repositório: https://github.com/YahataRD/AUTOCUIDA-PSW

A nota de cada aluno é a parte comum do grupo mais a qualidade individual. Sem autoria efetiva na própria parte, a AV1 fica 0. A parte comum vale 60 pontos: stack da disciplina (30) e escopo funcionando (30). Os 40 restantes avaliam a qualidade do que o próprio aluno fez.

| Aluno | Nota |
| --- | ---: |
| Gabriel Felipe Martins da Silva | 100 |
| Rafael Duarte Yahata | 98 |
| Rafael Voigt Villas Boas | 0 |

## Parte comum — 60/60

A stack vale 30/30.

- 5 pontos. React com painel, garagem, serviço e custos. O endereço guarda a seção e o veículo, como em `#/garagem?veiculo=1`. O `package.json` do frontend não traz `react-router-dom`.
- 5 pontos. React Hook Form 7 está nos formulários de veículo, item e serviço.
- 5 pontos. Zod 4 valida esses formulários. A placa `AV11A23` foi recusada com o aviso "Informe uma placa válida, como ABC-1234 ou ABC1D23."
- 5 pontos. TanStack Query 5 consulta a base e refaz a leitura depois das gravações.
- 5 pontos. O JSON Server 0.17.4 sobe com `npm start`, junto com o Vite, em `http://127.0.0.1:3001`.
- 5 pontos. Tailwind CSS 4 é o framework de interface.

O escopo vale 30/30. A régua é a prototipagem: veículo, item de manutenção, registro de serviço, alerta e custos. A inativação de veículo e a remoção de item são lógicas, como o próprio refinamento descreve. O README sobe os dois processos com `npm ci` e `npm start`.

- O painel do Golf lista os quatro itens. O filtro "Vencido" deixou 1 de 4, o Óleo do Motor, com o alerta crítico.
- O cadastro gravou o Civic, placa AVX1B23, ano 2020 e 1.000 km. A edição mudou o modelo para "Civic AV1 Editado". O odômetro foi a 1.500 km e continuou na API. Inativar tirou o veículo da seleção ativa e deixou `active` falso.
- O item "Filtro AV1" entrou no Golf, foi renomeado para "Filtro AV1 Editado" e, ao remover, a tela avisou que o histórico foi preservado. Na API o item ficou com `active` falso.
- O serviço do óleo, 08/10/2026, Oficina AV1, R$ 89,50, apareceu no relatório de outubro. Excluir devolveu 404 para esse registro.
- Os custos do Golf mostram o total por mês e o histórico, com editar e excluir em cada linha.

O repositório também guarda o plano de GPTI. Os commits de Patrick Cruz Azevedo, Hugo Lima de Almeida Antunes Aguiar, Ronald Teixeira de Assis, Rodrigo Americo Nascimento D'Icarahy e Thiago Souza da Silva estão nesses documentos de gestão. Esta nota é a da AV1 de PSW.

## Gabriel Felipe Martins da Silva — 100

O commit "feat: concluir escopo funcional e documentação da entrega" está no nome dele e altera a gestão de veículos, itens e serviços. A nota reúne os 60 pontos do grupo e 40 de qualidade.

Cadastro, edição, inativação, item e histórico que a correção percorreu estão nessa entrega e nas correções seguintes. As telas separam salvando, confirmação e erro de validação.

## Rafael Duarte Yahata — 98

A base por veículo, o cadastro, o JSON Server, o TanStack Query, o React Hook Form, o Zod, o Tailwind e as correções de calendário, filtro e integridade estão nos commits dele. A nota reúne os 60 pontos do grupo e 38 de qualidade.

Desconto na parte individual:

- 2 pontos. `frontend/src/components/MaintenanceCard.jsx` define a largura da barra com `style`, e `frontend/src/components/ExpenseChart.jsx` define a altura da coluna do mesmo modo. Os dois trechos estão no commit inicial dele.

`frontend/src/data/api.js` só segue em frente quando a resposta vem com sucesso. O filtro, a placa e a preservação do histórico na remoção do item funcionaram na tela.

## Rafael Voigt Villas Boas — 0

Não há commit no nome dele. O refinamento e o histórico de contribuições atribuem a ele o kit visual, os serviços e a verificação final, com 2 horas registradas pela equipe. O Tailwind e os serviços estão nos commits de Rafael Duarte Yahata e de Gabriel Felipe Martins da Silva. O commit `0c66171`, de autor Codex, registra a revisão documental e diz que não alterou o código funcional. Sem commit próprio, a AV1 fica 0.
