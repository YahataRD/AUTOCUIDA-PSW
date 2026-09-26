# Cronograma da primeira entrega

Período: **25/09 a 06/10/2026**. Data final confirmada pelo grupo: **06/10/2026**.
Objetivo: atender à [definição de front-end completo](escopo-front-end.md), com
dados locais e evolução verificável no GitHub. O desenvolvimento das etapas
abaixo ainda está planejado; esta atualização entrega a documentação.

## Premissas e capacidade

- Aproveitar o React/Vite existente e o fluxo principal já implementado.
- Usar um kit visual único; MUI é o candidato proposto, a decidir em 26/09.
- Cobrir os 16 casos de uso originais sem implementar back-end.
- Estimativa inicial: **39 a 56 horas-pessoa**, somadas para o grupo, incluindo
  documentação, revisão e reserva de correções em 05/10. Não é uma garantia.
- O plano usa os fins de semana de 26–27/09 e 03–04/10. Em 25/09, confirmar
  disponibilidade e distribuir nomes. Se essa capacidade não existir, renegociar
  entregas intermediárias com o grupo e o escopo com o professor desde o início.
- Reservar 05/10 para correções e ensaio; 06/10 para entrega, sem novas funções.
- Ao final de cada bloco: executar o cenário indicado, registrar evidência,
  revisar o diff e criar um commit que descreva exatamente a mudança.

## Etapas e datas

Os IDs T referem-se ao [roteiro de aceite](../testes/aceite-front-end.md).
Cada linha pode gerar mais de um commit quando houver mudanças independentes.

| ID e data | Resultado verificável | Dependência | Esforço | Aceite e responsável sugerido |
| --- | --- | --- | --- | --- |
| F00 · 25/09, sex. | Converter documentos, mapear aulas/pendências, definir cronograma e distribuição do grupo | Fontes recebidas | 2–3 h | Documentação entregue nesta atualização; nomes/capacidade ainda a definir pelo grupo |
| F01 · 26/09, sáb. | Registrar escolha do kit; configurar tema, cabeçalho e navegação; migrar Painel e peças compartilhadas | F00 | 6–8 h | T01 e primeira passagem de T19/T20; responsável de interface + revisor |
| F02 · 27/09, dom. | Organizar dados por veículo, IDs e referência inicial; carregar JSON local com estados; dar URL às seções | F01 | 4–6 h | T02/T03/T04/T22; responsável de estado/dados + revisor |
| F03 · 28/09, seg. | Completar Garagem no kit: criar, listar, selecionar, editar, inativar e atualizar odômetro | F02 | 4–6 h | UC01–04/15; T05–T08; responsável de veículos + revisor |
| F04 · 29/09, ter. | Entregar gestão de itens no kit: criar, consultar, editar regras e remover do plano | F03 | 4–6 h | UC05–08; T09/T10; responsável de manutenção + revisor |
| F05 · 30/09, qua. | Migrar registro/histórico para o kit; acrescentar editar/excluir, cancelamento e recálculo | F04 | 4–6 h | UC09–12; T11–T14; responsável de serviços + revisor |
| F06 · 01/10, qui. | Consolidar regras de alerta por tempo/km, retroatividade, baixa real e filtros por situação | F05 | 3–4 h | UC13/14; T15–T17; responsável de regras + revisor |
| F07 · 02/10, sex. | Concluir Custos no kit e integrar todas as telas por veículo, incluindo vazios e totais após alterações | F06 | 2–3 h | UC16; T08/T14/T18/T22; responsável de integração + revisor |
| F08 · 03/10, sáb. | Revisar telas em 360/768/1280 px, teclado, rótulos, foco, erros e confirmação; corrigir problemas | F07 | 4–5 h | T19/T20/T21; responsável de qualidade + autor da tela |
| F09 · 04/10, dom. | Executar roteiro completo em cópia limpa, registrar evidências e congelar funcionalidades | F08 | 3–4 h | Todos os T01–T23; revisor diferente do autor quando possível |
| F10 · 05/10, seg. | Usar reserva para corrigir falhas, atualizar documentação e ensaiar apresentação | F09 | 2–3 h | Reexecutar afetados; nenhum bloqueio essencial; grupo |
| F11 · 06/10, ter. | Conferir acesso ao GitHub, versão final e evidências; realizar a entrega | F10 | 1–2 h | T23; entrega registrada com hash da versão; responsável pela submissão |

Se a estimativa de uma etapa estourar, atualizar o cronograma no mesmo dia.
Testes de cada funcionalidade acontecem junto de sua implementação; 03–04/10
são a revisão integrada, não o início dos testes.

## Commits sugeridos por etapa

São exemplos para mudanças futuras reais. Não criar commits vazios para cumprir
quantidade e não registrar código antes de implementá-lo e verificá-lo.

| Etapa | Separação sugerida dos commits |
| --- | --- |
| F00 | `docs: converter planejamento e matrizes de requisitos para Markdown`; `docs: mapear aulas e pendencias do front-end para a primeira entrega`; `docs: definir cronograma e aceite da entrega de 6 de outubro` |
| F01 | `chore(ui): configurar kit visual e tema`; `refactor(ui): migrar cabecalho e painel para o kit` |
| F02 | `refactor(dados): vincular itens e servicos aos veiculos`; `feat(dados): carregar exemplos locais com estados de erro e vazio`; `feat(navegacao): permitir acesso por URL e historico do navegador` |
| F03 | `feat(veiculos): cadastrar e selecionar veiculos`; `feat(veiculos): editar e inativar com confirmacao` |
| F04 | `feat(manutencao): cadastrar e consultar regras`; `feat(manutencao): editar e remover itens preservando historico` |
| F05 | `feat(servicos): editar registros e recalcular manutencao`; `feat(servicos): excluir registros com confirmacao` |
| F06 | `fix(alertas): corrigir limites e servicos retroativos`; `feat(alertas): filtrar itens por situacao` |
| F07 | `feat(custos): integrar totais e historico por veiculo` |
| F08 | `fix(a11y): associar erros e ajustar foco dos formularios`; `fix(ui): corrigir layout nas larguras de aceite` |
| F09 | `test: verificar regras e fluxos essenciais do front-end`; `docs: registrar evidencias da homologacao` |
| F10 | `fix(escopo-afetado): descrever a falha realmente corrigida`; `docs: atualizar roteiro e limitacoes da entrega` |
| F11 | Registrar o hash entregue na documentação; criar commit apenas se houver atualização real |

Durante F01–F07, cada tela nova ou modificada já deve usar o kit e ter seus
estados de validação. Não deixar toda a migração visual para 03/10.

## Marcos de controle

- **Até 27/09:** kit escolhido, modelo local e navegação prontos; todos conhecem
  o formato de veículo, item, registro e referência inicial.
- **Até 30/09:** cadastros essenciais com criação, edição e remoção/inativação.
- **Até 02/10:** fluxo integrado de veículo até custos, sem ações decorativas.
- **Até 04/10:** congelamento funcional e roteiro de aceite executado.
- **Em 05/10:** somente correções, evidências, documentação e ensaio.
- **Em 06/10:** versão identificada e entrega realizada.

## Distribuição do grupo

Os nomes e o tamanho do grupo não foram informados. Os papéis da tabela são
responsabilidades de trabalho, não pessoas fictícias. Um integrante pode assumir
mais de um papel. Preencher aqui antes da implementação:

| Frente | Integrante | Revisor | Disponibilidade no período |
| --- | --- | --- | --- |
| Integração e estado compartilhado | A definir pelo grupo | A definir | A definir |
| Interface e navegação | A definir pelo grupo | A definir | A definir |
| Veículos e itens | A definir pelo grupo | A definir | A definir |
| Serviços, alertas e custos | A definir pelo grupo | A definir | A definir |
| Qualidade, evidências e apresentação | A definir pelo grupo | A definir | A definir |

Uma pessoa coordena alterações em `App.jsx`, no modelo de dados e no tema para
evitar conflitos. Após acordar os contratos, testes e formulários independentes
podem avançar em paralelo. Integrar diariamente por Pull Request curto.

## Riscos e resposta

| Risco | Sinal para agir | Resposta |
| --- | --- | --- |
| Kit visual consumir o prazo | Tema/Painel ainda indisponíveis ao fim de 26/09 | Reduzir personalização e usar componentes padrão do único kit escolhido |
| Regra de dados bloquear cadastros | Vínculos/IDs indefinidos em 27/09 | Parar expansão de telas e concluir contrato mínimo por veículo |
| CRUD não integrado | Edição/exclusão altera lista mas não alertas/custos em 30/09 | Priorizar recálculo e testes antes de novos filtros |
| Faltarem horas do grupo | Disponibilidade abaixo da estimativa ou marco perdido | Replanejar com o grupo e levar eventual redução de escopo ao professor; não declarar completo |
| Material das aulas incompleto | Surgirem novos critérios | Registrar origem, avaliar impacto e atualizar plano no mesmo dia |
| Conflitos e commits grandes | Vários integrantes editando os mesmos arquivos | Dividir responsabilidades, sincronizar branches e revisar mudanças diariamente |

Em caso de atraso, os primeiros cortes são opcionais: persistência local,
exportação, filtros avançados e polimento extra. Os 16 casos de uso, a coerência
dos dados, a navegação e a validação essencial não podem desaparecer sem revisão
explícita do escopo. O plano não garante que o professor aceite uma entrega parcial.

## Acompanhamento

Para concluir uma etapa, anexar à descrição do PR: IDs UC/T atendidos, mudanças
observáveis, passos de teste, resultado e pendências. Registrar o hash após o
commit. O checklist de aceite guarda o estado de qualidade; este arquivo guarda
datas, responsáveis e dependências. Ver [guia de contribuição](../../CONTRIBUTING.md).
