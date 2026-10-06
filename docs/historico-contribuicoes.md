# Histórico de contribuições e responsabilidades

Data: **06/10/2026**. Código analisado: [`8133fd6`](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/8133fd61e5b0b6dfe901d1c033dbf43147319d1b).
Responsável pela verificação final: **Rafael Voigt Villas Boas**, conforme informado pela equipe.
Revisão documental e verificações assistidas por Codex; não houve alteração do código funcional nesta revisão.

## Critério de leitura

Foram consultados git log --all, git shortlog -sn HEAD e os arquivos alterados por commit. Autor Git identifica a autoria registrada, não prova sozinho quem digitou cada linha, tempo de trabalho ou aprovação por colega. O mapa de nomes segue o [plano do projeto](GPTI/03-plano-do-projeto.md) e a [tabela de horas](../mudancas/horas-dev.md). Commits de merge não contam como implementação independente.

## Desenvolvimento — PSW Grupo 7

| Integrante e atribuição planejada | Evidência no histórico analisado | Situação |
| --- | --- | --- |
| Rafael Duarte Yahata — dados e veículos | Autor “Rafael Yahata”: f48f9a7 base, 255a20f cadastro, 0195f64 API/Query, 56efc1e RHF/Zod, ebec85b Tailwind, 598b1a2 e 8133fd6 correções | Participação de código comprovada; também implementou partes atribuídas a outras frentes. |
| Gabriel Felipe Martins da Silva — itens, alertas e custos | Autor “Gabriel Felipe”: 0d6897a altera gestão de veículos/itens/serviços, API/demo, testes e cálculo; 495d543 é merge | Participação de código comprovada; o commit não demonstra conclusão integral dos filtros/calendário nem autoria exclusiva de todos os custos. |
| Rafael Voigt Villas Boas — kit visual e serviços | Nenhum commit próprio localizado na base 8133fd6. Kit/Tailwind e serviços aparecem em commits dos outros autores acima | Nesta revisão, a equipe identifica Voigt como responsável pela verificação final, análise de aderência e revisão da documentação. Atividade registrada com 2,00 h. Isso não comprova retroativamente a autoria do kit ou dos serviços. |

## Gestão — GPTI Grupo H

| Integrante | Autor Git e exemplo verificável | Natureza |
| --- | --- | --- |
| Patrick Cruz Azevedo | Patrick Cruz: cae9abb, 8f998f2, c94fa9c | Termo de abertura e plano |
| Hugo Lima de Almeida Antunes Aguiar | Hugo Lima: 1d329d1 | Dicionário da EAP |
| Ronald Teixeira de Assis | Ronald Teixeira de Assis: 7e2ace5, e844b8b, 143d723, 6ce7759, 585ed5a | Business case, termo, plano e EAP |
| Rodrigo Americo Nascimento D'Icarahy | Ramerico11: 370f6d6; associação ao nome conforme plano da equipe | Plano do projeto |
| Thiago Souza da Silva | Thiago Souza Da Silva: 8b1ccd3 | Plano do projeto |

Na base analisada, shortlog apresenta 24 commits de Rafael Yahata, 12 de Ronald, 3 de Patrick, 2 de Gabriel, 1 de Hugo, 1 de Ramerico11 e 1 de Thiago, incluindo merges. Esses números não medem esforço ou qualidade. Os cinco integrantes de GPTI têm atribuições de gestão, não de frontend.

## Como conferir

~~~bash
git log --all --format="%h | %an | %ad | %s" --date=short
git shortlog -sn 8133fd6
git show --stat 0d6897a
git show --stat ebec85b
git log --all -- frontend/src src
~~~

[Abrir o histórico no GitHub](https://github.com/YahataRD/AUTOCUIDA-PSW/commits/main/). Esta adequação documental mantém os commits existentes. A identidade técnica do novo commit deve ser lida no GitHub; responsabilidade pela revisão e autoria técnica do commit são registros distintos. Não foram fabricados commits, datas, coautores ou redistribuídas contribuições anteriores.
