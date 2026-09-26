# Escopo da primeira entrega do front-end

Data de referência: **25/09/2026**. Entrega confirmada pelo grupo: **06/10/2026**.
Base de código analisada: `b59f1ab`. O objetivo é entregar interfaces navegáveis
e funcionais com dados simulados, cobrindo o planejamento original do AutoCUIDA.

## Origem das decisões

| Origem | O que estabelece |
| --- | --- |
| Informação do grupo em 25/09 | Front-end completo em 06/10, sem back-end, evolução visível por commit |
| [Protótipo](../prototipo.md) e [matrizes](../validacao-requisitos.md) | Processo de manutenção e 16 casos de uso, com geração/encerramento automático de alertas |
| [Cinco aulas recebidas](../referencias/aulas.md) | Semântica, responsividade, kit visual, JavaScript moderno, React, estados e leitura simulada |
| Proposta deste planejamento | Critérios de aceite, datas intermediárias, regras ainda não decididas e organização das entregas |

Não foi fornecida uma rubrica formal. “Front-end completo” é operacionalizado
abaixo a partir das fontes disponíveis; não representa aprovação antecipada
do professor. Funcionalidades ausentes não serão chamadas de concluídas por
existirem somente no planejamento.

## Diagnóstico dos casos de uso

**Existe** significa localizado no código, ainda sujeito à homologação.
**Parcial** significa fluxo incompleto. **Falta** significa ausência de interface
ou ação correspondente. Esta tabela é o retrato de 25/09; atualizar conforme
os testes forem executados.

| ID | Caso de uso | Situação | Trabalho necessário na entrega |
| --- | --- | --- | --- |
| UC01 | Criar veículo | Falta | Formulário, validação e inclusão na coleção local |
| UC02 | Consultar veículos | Parcial | Listar e selecionar veículos; hoje só há um fixo |
| UC03 | Atualizar veículo | Falta | Editar placa, modelo e ano, preservando referências |
| UC04 | Inativar veículo | Falta | Confirmar inativação, preservar histórico e tratar seleção vazia |
| UC05 | Criar item/regra | Falta | Vincular item ao veículo e definir intervalos/referência inicial |
| UC06 | Consultar itens | Parcial | Painel mostra itens; falta gestão das regras e estado vazio |
| UC07 | Atualizar regra | Falta | Editar intervalos e recalcular alertas |
| UC08 | Remover item | Falta | Confirmar remoção do plano sem destruir histórico |
| UC09 | Registrar serviço | Existe | Revisar datas, referências e confirmação; migrar formulário ao kit |
| UC10 | Consultar histórico | Existe | Tratar vazio e respeitar veículo selecionado |
| UC11 | Editar registro | Falta | Formulário preenchido, salvar/cancelar e recalcular resultados |
| UC12 | Excluir registro | Falta | Confirmar/cancelar, recalcular custos e último serviço válido |
| UC13 | Visualizar alertas | Existe | Tratar vazio, filtros e regras de limite/data |
| UC14 | Dar baixa em alerta | Parcial | Registro já altera a referência; mensagem e retroatividade precisam ser coerentes |
| UC15 | Atualizar odômetro | Existe | Manter validações e testar por veículo |
| UC16 | Relatório de custos | Existe | Validar totais após edição/exclusão e seleção de veículo |

Geração e encerramento de alertas são comportamentos derivados de UC13/UC14,
não telas manuais adicionais. A baixa acontece pelo registro de um serviço
válido; uma ação que apenas esconda o aviso não fecha o ciclo de manutenção.

## Escopo adotado para planejar a entrega

- Gerenciar veículos e itens, além dos serviços já existentes, em estado local.
- Usar o perfil de proprietário como contexto da demonstração, sem login.
- Isolar itens, serviços, alertas e custos por veículo selecionado.
- Usar um único kit visual e manter a aplicação mobile-first.
- Exibir carregamento, falha com nova tentativa e estados vazios orientadores.
- Garantir criação, consulta, edição, inativação/remoção, cancelamento e feedback.
- Validar consistência dos cálculos e completar a revisão de acessibilidade.
- Guardar evidências por etapa, com commits e instruções reproduzíveis.

Ficam para depois desta entrega: API de negócio, banco de dados, autenticação
real, autorização por perfil, notificações por e-mail/push, integração com
oficinas e sincronização entre usuários. Redux, servidor Node e JSON Server não
são dependências obrigatórias deste plano. Persistência em `localStorage`,
exportação de relatório e filtros financeiros avançados são opcionais, somente
após o aceite essencial; não devem consumir a reserva de correções.

## Decisões propostas para os fluxos ainda ausentes

Estas decisões tornam o planejamento executável. Devem ser revisadas pelo grupo
na etapa inicial; não foram implementadas nem atribuídas ao professor.

| Tema | Proposta de comportamento |
| --- | --- |
| Kit visual | Adotar Material UI como candidato inicial, por já oferecer peças React para formulários, navegação e confirmação; validar compatibilidade antes da migração |
| Dados | Carregar JSON estático via Vite; após a carga, realizar operações em memória; informar que recarregar restaura a demonstração |
| Navegação | Dar URL às seções, preferencialmente por hash nesta entrega estática; usar links para navegação e botões para ações, com Voltar/Avançar coerentes |
| Veículos | IDs estáveis, placa única normalizada e estado ativo/inativo; inativar não apaga serviços; se necessário, selecionar outro ativo |
| Itens | Vincular ao veículo; aceitar intervalo por km, por tempo ou ambos, exigindo pelo menos um positivo; desabilitado não participa do cálculo |
| Remover item | Retirá-lo do plano ativo e impedir novos serviços, preservando os registros e os custos anteriores |
| Último serviço | Manter uma referência inicial definida e calcular a última manutenção a partir dos registros válidos, com regra documentada para ordem de data e km |
| Editar/excluir serviço | Recalcular referência do item e custos; se não houver registro restante, usar a referência inicial; nunca reduzir automaticamente o odômetro |
| Retroatividade | Aceitar histórico coerente sem substituir indevidamente uma manutenção mais recente; rejeitar inconsistência de data/quilometragem com mensagem clara |
| Limites dos alertas | Classificar pelo percentual não arredondado e arredondar só para exibir; definir tempo por vencimento de calendário e testar fim de mês |
| Confirmação | Mostrar a situação efetivamente recalculada; não prometer encerramento ou 0% quando ainda houver desgaste/vencimento |

A decisão sobre rotas é qualidade de navegação proposta, baseada também no
anúncio da aula seguinte; não há exigência comprovada de uma biblioteca de rotas.
Para campos dinâmicos como progresso e gráfico, usar componentes/recursos do kit
em vez de manter `style` inline solto. Customizações devem ficar no tema ou na
API de estilo do kit, com o acordo registrado pelo grupo.

## Pendências técnicas e evidências atuais

| Local | Evidência | Ação planejada |
| --- | --- | --- |
| `App.jsx`, `initialData.js` | Um objeto de veículo e coleções sem `vehicleId` | Preparar modelo local para isolamento por veículo |
| `GaragePage.jsx` | Apenas consulta e atualização do odômetro | Completar cadastro, edição, listagem e inativação |
| `ServiceHistory.jsx` | Lista somente de leitura | Adicionar edição e exclusão com confirmação |
| `App.jsx` e `ServicePage.jsx` | Um novo serviço sempre troca a referência; confirmação afirma baixa incondicional | Revisar retroatividade e recálculo após alterações |
| `maintenance.js` | Percentuais arredondados antes de classificar; mês médio versus data de calendário | Consolidar regra e testar limites |
| `ServicePage.jsx` | Mensagens sem vínculo de descrição nos campos | Associar erros, indicar foco e conferir teclado |
| `style.css`, `MaintenanceCard`, `ExpenseChart` | CSS próprio e `style` para tamanho das barras | Migrar gradualmente para kit visual |
| `App.jsx` | Navegação só por estado, carga síncrona dos exemplos | Implementar navegação verificável e carga local com estados |

Build aprovado em 25/09/2026. Exemplos diretos do cálculo confirmaram desgaste
retroativo positivo e arredondamento antecipado no limiar. A inspeção foi de
código; acessibilidade, responsividade e os fluxos completos ainda precisam
ser executados no navegador. Ver [arquitetura](../arquitetura.md).

## Definição de front-end completo

A primeira entrega só deve receber o estado “concluída” quando:

- [ ] UC01 a UC16 forem demonstráveis com dados locais e nenhum fluxo essencial faltar.
- [ ] As decisões propostas acima tiverem sido adotadas ou substituídas com justificativa registrada.
- [ ] Criação, alteração, cancelamento e confirmação produzirem estado consistente.
- [ ] Veículos não compartilharem indevidamente itens, histórico ou custos.
- [ ] Todos os estados de carga, erro, vazio, sucesso e validação estiverem acessíveis.
- [ ] O kit visual estiver aplicado a todas as telas ativas, com navegação e formulários semânticos.
- [ ] As telas couberem em 360, 768 e 1280 px e permitirem operação por teclado.
- [ ] Os cenários de aceite tiverem resultado, data, responsável e evidência.
- [ ] Instalação a partir do lockfile e build funcionarem em uma cópia limpa.
- [ ] README, limitações e histórico Git corresponderem à versão apresentada.
- [ ] O grupo conseguir explicar os componentes, o estado e as alterações de cada etapa.

Não há evidência suficiente para marcar esse checklist como atendido hoje.
