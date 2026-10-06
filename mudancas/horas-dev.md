# Registro de horas da equipe de desenvolvimento

## Leitura dos valores

**Os valores históricos abaixo são estimativas de esforço equivalente, não horas
medidas nem comprovantes de trabalho realizado.** Foram propostos em 05/10/2026
a partir do escopo das alterações integradas à `main` até `5c8c674`.
Cada participante deve substituir ou confirmar os valores com base no tempo
que efetivamente trabalhou. Até isso ocorrer, o total realizado permanece sem registro.

A autoria do commit identifica o nome registrado como autor no Git; não comprova que essa pessoa
executou todo o trabalho sozinha. Apoio de IA, trabalho em dupla, código reaproveitado,
experiência e atividades fora do repositório podem alterar bastante o tempo real.
Estas estimativas não servem para comparar produtividade dos integrantes.

## Critério da estimativa

- Leitura do escopo, arquivos alterados e complexidade de implementação, integração,
  testes e documentação. Não foi aplicada uma conversão de linhas em horas.
- Valores centrais acompanhados de uma faixa aproximada de incerteza; as faixas
  expressam julgamento técnico, não intervalos estatísticos.
- Datas correspondem às datas dos commits, não necessariamente aos dias trabalhados.
  Intervalos entre commits não foram usados como duração.
- Commits de uma mesma etapa foram agrupados quando adequado. Lockfiles, arquivos
  gerados e simples movimentações não foram tratados como código escrito do zero.
- Merges puros não geram horas adicionais. Em `5c8c674`, só foi estimada a criação
  do changelog, da tabela e dos links; o Tailwind já está contabilizado em `ebec85b`.
- Autores mapeados: `Rafael Yahata` → Rafael Duarte Yahata; `Gabriel Felipe` →
  Gabriel Felipe Martins da Silva. Não foi localizado autor correspondente a
  Rafael Voigt Villas Boas nas referências consultadas. A equipe confirmou que
  ele ainda não possui commits; por isso, não foi atribuída uma estimativa a ele.
- Commits do grupo de GPTI não entram neste levantamento. Pendências e correções
  futuras não foram consideradas concluídas nem incluídas como trabalho realizado.

## Estimativas históricas por entrega

Todos os lançamentos desta seção estão **pendentes de confirmação pelo responsável**.
As etapas podem ser consultadas no [changelog](CHANGELOG.md).

| Data do commit | Desenvolvedor atribuído no Git | Entrega/etapa | Escopo considerado | Estimativa (h) | Faixa (h) | Commits |
| --- | --- | --- | --- | ---: | ---: | --- |
| 2026-09-23 | Rafael Duarte Yahata | Versão inicial | Telas React, componentes, estilos, cálculos e protótipos | 6,00 | 4,00–8,00 | [b59f1ab](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/b59f1ab) |
| 2026-09-25 | Rafael Duarte Yahata | Organização da documentação | Conversão para Markdown, levantamento de requisitos e revisão do cronograma | 2,50 | 1,50–3,50 | [d7e5b6f](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/d7e5b6f), [b75f7c2](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/b75f7c2), [81e55d3](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/81e55d3), [9db6516](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/9db6516) |
| 2026-10-02 | Rafael Duarte Yahata | Base compartilhada | Dados por veículo, navegação, validações, estados e testes | 4,00 | 3,00–5,00 | [f48f9a7](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/f48f9a7) |
| 2026-10-02 | Rafael Duarte Yahata | Documentação da base compartilhada | Contrato de dados, instruções de continuidade e registro de testes | 1,00 | 0,50–1,50 | [e65bcd2](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/e65bcd2) |
| 2026-10-02 | Rafael Duarte Yahata | Publicação no GitHub Pages | Workflow, configuração do caminho e conferência da publicação | 1,00 | 0,50–1,50 | [e87b48a](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/e87b48a) |
| 2026-10-02 | Rafael Duarte Yahata | Cadastro de veículos | Formulário, validação, seleção automática e testes | 2,50 | 1,50–3,50 | [255a20f](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/255a20f) |
| 2026-10-04 | Rafael Duarte Yahata | Organização do frontend | Movimentação de arquivos e ajuste de comandos/caminhos | 0,50 | 0,25–0,75 | [409ec2e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/409ec2e) |
| 2026-10-04 | Rafael Duarte Yahata | Integração com json-server e TanStack Query | Cliente HTTP, cache, mock, demo e testes de integração | 4,00 | 3,00–5,00 | [0195f64](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0195f64) |
| 2026-10-04 | Rafael Duarte Yahata | Comandos unificados | Instalação, execução e testes pela raiz, com atualização das instruções | 0,50 | 0,25–0,75 | [0711ffd](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0711ffd) |
| 2026-10-04 | Rafael Duarte Yahata | Formulários com React Hook Form e Zod | Schemas compartilhados, adaptação dos formulários e testes | 2,50 | 1,50–3,50 | [56efc1e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/56efc1e) |
| 2026-10-05 | Gabriel Felipe Martins da Silva | Gestão de veículos, itens e serviços | Edição/inativação, gestão de itens, serviços, testes e manuais da entrega | 4,50 | 3,00–6,00 | [0d6897a](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0d6897a) |
| 2026-10-05 | Rafael Duarte Yahata | Migração para Tailwind CSS | Tema, layouts, integração Vite e conferência em viewports diferentes | 3,00 | 2,00–4,00 | [ebec85b](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/ebec85b) |
| 2026-10-05 | Rafael Duarte Yahata | Registro de mudanças e horas | Changelog, tabela de horas e links no README; somente conteúdo novo do merge | 0,50 | 0,25–0,75 | [5c8c674](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/5c8c674) |

## Resumo por desenvolvedor

A soma estimada inclui apenas as contribuições identificadas acima. Ausência de
commits identificáveis não significa ausência de trabalho nem equivale a zero horas.

| Desenvolvedor | Total estimado (h) | Faixa estimada (h) | Total realizado confirmado (h) |
| --- | ---: | ---: | ---: |
| Rafael Duarte Yahata | 28,00 | 18,25–37,75 | Sem registro |
| Gabriel Felipe Martins da Silva | 4,50 | 3,00–6,00 | Sem registro |
| Rafael Voigt Villas Boas | Sem estimativa | Contribuições a identificar | Sem registro |
| **Subtotal das contribuições identificadas** | **32,50** | **21,25–43,75** | **Sem registro** |

## Lançamentos de tempo efetivamente trabalhado

Use uma linha por pessoa, data e atividade, vinculada à entrega e ao commit/PR.
Use horas decimais: 30 minutos = 0,50 h; 1h30 = 1,50 h. Desconte pausas.
Em uma sessão de uma hora em dupla, cada participante registra 1,00 h: são
2,00 horas-pessoa. Evite contar duas vezes o mesmo período de uma pessoa.

As linhas abaixo são modelos. Ao confirmar uma estimativa histórica, registre
a duração real aqui e indique qual etapa ela substitui. **Não some estimativas
e horas confirmadas da mesma atividade.** Atualize manualmente o resumo;
Markdown não calcula os totais automaticamente.

| Data trabalhada | Desenvolvedor | Entrega/atividade | Tempo real (h) | Commit ou PR | Conferência |
| --- | --- | --- | ---: | --- | --- |
| A preencher | Rafael Duarte Yahata | A preencher | A preencher | A preencher | Pendente |
| A preencher | Gabriel Felipe Martins da Silva | A preencher | A preencher | A preencher | Pendente |
| A preencher | Rafael Voigt Villas Boas | A preencher | A preencher | A preencher | Pendente |
