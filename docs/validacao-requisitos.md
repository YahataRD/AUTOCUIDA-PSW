# Validação dos requisitos do AutoCUIDA

Documento de origem: `AutoCUIDA-Validacao-Requisitos.docx`.
Conversão para Markdown em 25/09/2026, preservando as três matrizes e as
observações originais. Esta é uma validação do **planejamento**, não um relatório
de testes do software. O DOCX original está preservado no commit `b59f1ab`.

## Matriz CRUD

Legenda: **C** = criar; **R** = consultar; **U** = atualizar;
**D** = excluir, inativar ou encerrar. Célula vazia indica ausência de marcação
na matriz de origem.

| Funcionalidade ou caso de uso | Veículo | ItemManutencao | RegistroManutencao | Alerta |
| --- | --- | --- | --- | --- |
| Criar veículo | C | | | |
| Consultar veículos | R | | | |
| Atualizar veículo e odômetro | U | | | |
| Inativar veículo | D | | | |
| Criar item e regra de troca | | C | | |
| Consultar itens de manutenção | | R | | |
| Atualizar parâmetros de troca | | U | | |
| Remover item | | D | | |
| Registrar serviço realizado | | | C | U (baixa automática) |
| Consultar histórico de serviços | | | R | |
| Editar registro | | | U | |
| Excluir registro | | | D | |
| Visualizar painel de alertas | | | | R |
| Confirmar / dar baixa em alerta | | | | U |
| Gerar alertas por tempo e quilometragem | | | | C |
| Encerrar alerta atendido | | | | D |
| Gerar relatório de custos | R | R | R | R |

### Validação e complementos da fonte

Os três cadastros principais (Veículo, ItemManutencao e RegistroManutencao)
possuem o ciclo CRUD completo **na proposta**. A entidade Alerta não é
cadastrada manualmente: ela é criada automaticamente pelo motor de regras,
consultada no painel, atualizada quando confirmada e encerrada quando o serviço
é registrado. Por isso, foram acrescentados os casos de uso “Gerar alertas por
tempo e quilometragem” e “Encerrar alerta atendido”.

O relatório apenas consulta dados das entidades e, portanto, as letras R
indicam entidades lidas para sua composição.

## Matriz de perfil por funcionalidade

Perfis considerados na fonte:

- **Proprietário:** administra um ou mais veículos próprios.
- **Gestor de frota:** acompanha vários veículos e seus custos operacionais.
- **Operador/condutor:** atualiza odômetro e registra serviços realizados.

Apesar dos três perfis citados, a matriz recebida só contém a coluna
**Proprietário**. As permissões dos demais perfis não foram definidas; não foram
inventadas nesta conversão.

| Funcionalidade | Proprietário |
| --- | --- |
| Criar veículo | X |
| Consultar veículos | X |
| Atualizar veículo e odômetro | X |
| Inativar veículo | X |
| Criar item e regra de troca | X |
| Consultar itens de manutenção | X |
| Atualizar parâmetros de troca | X |
| Remover item | X |
| Registrar serviço realizado | X |
| Consultar histórico de serviços | X |
| Editar registro | X |
| Excluir registro | X |
| Visualizar painel de alertas | X |
| Confirmar / dar baixa em alerta | X |
| Gerar alertas por tempo e quilometragem | X |
| Encerrar alerta atendido | X |
| Gerar relatório de custos | X |

### Observações da fonte

A seção de observações do documento original contém apenas `?`, sem explicação.
Ela permanece registrada como pendência da especificação.

## Priorização e responsáveis originais

Os responsáveis abaixo são **áreas técnicas**, não integrantes nomeados do
grupo. As referências a back-end pertencem ao planejamento geral. Para a entrega
de 06/10/2026, o comportamento necessário será simulado no cliente, conforme o
escopo informado pelo grupo.

| Prioridade | Caso de uso | Valor ou dependência | Responsável principal na fonte |
| --- | --- | --- | --- |
| 1 | Visualizar painel de alertas pendentes | Entrega diretamente o valor central: prevenir falhas | Front-end |
| 2 | Gerar alertas por tempo e quilometragem | Habilita a prevenção automática | Back-end / regras de negócio |
| 3 | Confirmar / dar baixa em alerta de revisão | Fecha o ciclo de prevenção | Front-end / back-end |
| 4 | Registrar serviço realizado | Atualiza a saúde e agenda o próximo ciclo | Back-end / entidade RegistroManutencao |
| 5 | Atualizar odômetro / quilometragem | Alimenta o cálculo dos alertas | Front-end / entidade Veículo |
| 6 | Gerar relatório de custo operacional e preventivo | Permite medir economia e despesas | Front-end / relatórios |
| 7 | Consultar histórico de serviços | Apoia análise da saúde do veículo | Front-end / entidade RegistroManutencao |
| 8 | Criar item e regra de troca | Configura o monitoramento preventivo | Back-end / entidade ItemManutencao |
| 9 | Consultar itens de manutenção | Permite revisar regras cadastradas | Front-end / entidade ItemManutencao |
| 10 | Atualizar parâmetros de troca | Mantém o plano adequado ao veículo | Back-end / entidade ItemManutencao |
| 11 | Criar veículo | Pré-requisito para todas as operações | Back-end / entidade Veículo |
| 12 | Consultar veículos | Permite selecionar o veículo acompanhado | Front-end / entidade Veículo |
| 13 | Atualizar veículo | Mantém os dados cadastrais corretos | Back-end / entidade Veículo |
| 14 | Inativar veículo | Funcionalidade administrativa fora do fluxo principal | Back-end / entidade Veículo |
| 15 | Editar registro de manutenção | Corrige informações já lançadas | Back-end / entidade RegistroManutencao |
| 16 | Excluir registro de manutenção | Operação excepcional e administrativa | Back-end / entidade RegistroManutencao |
| 17 | Remover item | Operação administrativa fora do fluxo principal | Back-end / entidade ItemManutencao |
| 18 | Encerrar alerta atendido | Ação automática após confirmação e registro | Back-end / entidade Alerta |

## Notas de consistência da conversão

1. A [descrição do protótipo](prototipo.md) possui 16 casos de uso. Esta fonte
   tem 18 linhas de prioridade porque explicita geração e encerramento de
   alertas. Esses comportamentos automáticos não obrigam duas novas telas.
2. A matriz CRUD tem 17 linhas porque reúne atualização cadastral do veículo
   e do odômetro; a lista de prioridades separa essas ações. As contagens foram
   preservadas e a diferença foi explicada.
3. A matriz descreve o relatório lendo todas as entidades. No código inicial,
   a página de custos calcula seus resultados a partir dos registros de
   manutenção; planejamento e implementação não são equivalentes.
4. A marcação D de Alerta significa encerramento do ciclo, sem exigir apagar
   o histórico de serviços. O código inicial calcula alertas a partir dos itens;
   não mantém uma coleção persistida de alertas.
5. Autenticação e autorização dos perfis não integram a primeira entrega
   informada pelo grupo. A definição dos demais perfis continua pendente para
   uma fase posterior.
