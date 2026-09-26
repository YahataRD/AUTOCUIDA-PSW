# Roteiro de aceite do front-end

Planejado em 25/09/2026 para a entrega de 06/10/2026. Os resultados abaixo
permanecem pendentes até execução. O build inicial aprovado não comprova os
fluxos propostos. A referência de requisitos é o [escopo](../planejamento/escopo-front-end.md).

## Preparação da execução

1. Identificar o commit, data, integrante, navegador e largura de tela.
2. Usar uma cópia limpa com dependências do lockfile e dados de demonstração.
3. Preparar dois veículos, com itens e registros distintos; incluir um veículo
   sem itens e um item sem serviços em cenários separados.
4. Para cálculos, fixar a data de referência nos testes de função; para o
   navegador, anotar a data real usada. Evitar cenários que mudem silenciosamente
   de resultado conforme o dia.
5. Restaurar os dados entre cenários quando houver interferência. Na proposta
   em memória, recarregar restaura o estado inicial.

## Cenários obrigatórios do plano

| ID | Requisito | Ação e condição | Resultado esperado | Estado |
| --- | --- | --- | --- | --- |
| T01 | Execução | Instalar com `npm ci`, iniciar dev e gerar build em cópia limpa | Instalação e build sem erro; tela inicial utilizável | Pendente |
| T02 | Carga local | Abrir com JSON válido e observar atraso simulado | Carregamento visível seguido dos dados, sem bloquear navegação indevidamente | Pendente |
| T03 | Falha de carga | Simular caminho inexistente ou JSON inválido e usar nova tentativa após corrigir | Erro compreensível na tela; `response.ok`/formato tratados; recuperação funciona | Pendente |
| T04 | Navegação | Abrir cada URL, recarregar e usar Voltar/Avançar | Seção correta e navegação coerente; URL desconhecida tem retorno seguro | Pendente |
| T05 | UC01/02 | Criar veículo válido, repetir placa normalizada e enviar campos vazios | Válido aparece e pode ser selecionado; duplicado/inválido não é salvo | Pendente |
| T06 | UC03/04 | Editar veículo; cancelar e confirmar inativação; inativar o último ativo | Cancelar preserva dados; confirmar mantém histórico e trata ausência de veículo ativo | Pendente |
| T07 | UC15 | Enviar odômetro vazio, negativo, decimal, igual, menor e maior | Apenas incremento inteiro válido é aceito; mensagem e recálculo corretos | Pendente |
| T08 | Isolamento | Alternar entre dois veículos e fazer alteração em apenas um | Itens, serviços, alertas e custos do outro permanecem corretos | Pendente |
| T09 | UC05/06/07 | Criar e editar item só por km, só por meses e por ambos; testar zero/negativo/ausência de todos os intervalos | Pelo menos um intervalo positivo obrigatório; consulta e recálculo coerentes | Pendente |
| T10 | UC08 | Cancelar e confirmar remoção de item com serviços | Cancelar preserva; confirmar tira do plano ativo sem apagar histórico/custo | Pendente |
| T11 | UC09 | Registrar serviço preventivo e corretivo válidos | Cada registro aparece uma vez; data, km, valor e oficina corretos; custos atualizados | Pendente |
| T12 | UC09 | Enviar item ausente, data vazia/futura, km inválido, valor vazio/não numérico/zero e oficina em branco | Campos associados aos erros; não há registro parcial nem alteração indevida | Pendente |
| T13 | UC11 | Editar data, km, valor e tipo; cancelar uma edição | Salvar atualiza histórico, alertas e custos; cancelar não altera nada | Pendente |
| T14 | UC12/16 | Excluir o último serviço; cancelar outra exclusão; remover todos em cenário separado | Confirmação explícita; totais recalculados; referência anterior/inicial restaurada; odômetro não diminui | Pendente |
| T15 | UC13 | Isolar desgaste por km em 79,9%, 80%, 99,9% e 100%; filtrar situações | Classificações Em dia, Próximo, Próximo, Vencido segundo a regra proposta; filtro correto | Pendente |
| T16 | UC13 | Isolar prazo por tempo; testar antes/no/depois do vencimento, fim de mês e fevereiro | Data e situação concordam com a regra de calendário acordada; sem divisão por zero | Pendente |
| T17 | UC14 | Registrar serviço atual e retroativo coerente; inserir data/km inconsistentes | Atual inicia ciclo; retroativo preserva última referência correta e mensagem real; inconsistência rejeitada | Pendente |
| T18 | UC10/16 | Usar dois registros de R$ 100 preventiva e R$ 50 corretiva no mesmo mês do período | Total R$ 150, tipos R$ 100/R$ 50, média R$ 25 em seis meses; ordem decrescente; edição/exclusão repercutem | Pendente |
| T19 | Responsividade | Percorrer todas as telas em 360, 768 e 1280 px, incluindo formulários e diálogos | Sem rolagem horizontal da página, corte de conteúdo ou ação inacessível | Pendente |
| T20 | Acessibilidade | Operar por Tab/Shift+Tab/Enter/Espaço; abrir/fechar confirmação, conferir rótulos e zoom de 200% | Foco visível e devolvido ao fechar diálogo; erros associados; conteúdo e ações acessíveis sem depender só da cor | Pendente |
| T21 | Integração | Executar cadastrar veículo → item → odômetro → alerta → serviço → custos → editar/excluir | Nenhuma exceção não tratada ou aviso de key; dados e UI permanecem sincronizados | Pendente |
| T22 | Estados vazios | Carregar zero veículos, zero itens, zero serviços e filtro sem resultado | Mensagem específica e ação útil; gráfico/totais sem valores inválidos; formulários indisponíveis têm orientação | Pendente |
| T23 | Entrega | Seguir README em outra cópia; abrir commits no GitHub; executar demonstração do grupo | Instruções reproduzíveis, versão identificada, colegas com acesso e limites documentados | Pendente |

Os limites T15/T16 refletem a proposta de correção do planejamento. Se o grupo
adotar outra regra, atualizar o escopo, os exemplos e estes resultados esperados
no mesmo commit antes de homologar. Simulações de erro devem usar dados/caminhos
de teste locais e não alterar permanentemente a versão de apresentação.

## Como registrar evidências

Usar um bloco por execução ou um link para o PR que contenha as mesmas informações:

```text
Cenários: T05, T08
Data e responsável: preencher na execução
Commit: hash real da versão testada
Ambiente: navegador, versão e largura
Preparação e passos: dados usados e ações realizadas
Resultado: aprovado / reprovado / bloqueado
Evidência: caminho de captura, vídeo, saída de comando ou relato reproduzível
Pendências: descrição e ID da tarefa, se houver
```

Capturas podem ficar em `docs/testes/evidencias/` quando houver material real;
não é necessário criar arquivos vazios. Alterar “Pendente” para “Aprovado”
somente após anexar resultado. Após uma correção, reexecutar os casos afetados.

## Verificações realizadas nesta revisão documental

| Verificação | Data | Resultado e limite |
| --- | --- | --- |
| Build do código inicial `b59f1ab` | 25/09/2026 | Aprovado com 29 módulos; não foi uma instalação limpa nem homologação visual |
| Comparação das matrizes DOCX/Markdown | 25/09/2026 | Todas as células de dados preservadas em três tabelas, com 17, 17 e 18 linhas |
| Dois exemplos diretos de `calculateMaintenance` | 25/09/2026 | Confirmados 7% em serviço retroativo e arredondamento de 79,9% para 80%; são achados para revisão, não aceite da regra futura |

Esta revisão não implementou as funcionalidades faltantes nem aprovou os
cenários T01–T23. Sua execução está distribuída no [cronograma](../planejamento/cronograma.md).

## Roteiro final de apresentação

1. Mostrar o propósito e o limite sem back-end.
2. Criar/selecionar um veículo e configurar seu item de manutenção.
3. Atualizar o odômetro e explicar o alerta calculado.
4. Registrar o serviço e demonstrar o efeito no painel e nos custos.
5. Editar/excluir um registro e mostrar o recálculo, incluindo cancelamento.
6. Mostrar estado vazio, validação, recuperação de erro e comportamento no celular.
7. Abrir dois ou três commits representativos, explicar o que mudou e como foi validado.
