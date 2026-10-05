# Business Case — AutoCUIDA

| Campo | Informação |
|---|---|
| Versão | 2.0 — 04/10/2026 |
| Patrocinador | Prof. Diogo Silveira Mendonça |
| Gerente do projeto (GP) | Patrick Cruz Azevedo |
| Equipe de gerenciamento (GPTI Grupo H) | Ronald Teixeira de Assis, Hugo Lima de Almeida Antunes Aguiar, Rodrigo Americo Nascimento D'Icarahy, Thiago Souza da Silva |
| Equipe de desenvolvimento (PSW Grupo 7) | Rafael Duarte Yahata, Gabriel Felipe Martins da Silva, Rafael Voigt Villas Boas |
| Repositório | https://github.com/YahataRD/AUTOCUIDA-PSW |

> Este documento justifica o projeto AutoCUIDA, fundamenta o problema com dados do setor automotivo, analisa alternativas e resume custo, benefício e risco do escopo proposto.

## 1. Resumo executivo

O AutoCUIDA é uma aplicação web para acompanhar a manutenção preventiva de veículos. O usuário registra veículos, acompanha alertas por quilometragem e por data e registra os custos dos serviços.

- *Problema:* proprietários de veículos esquecem ou adiam revisões por falta de organização, o que tende a levar a reparos corretivos mais caros.
- *Solução:* um painel web simples e responsivo, com alertas visuais (Em dia, Próximo, Vencido) para as próximas revisões, sem notificações nesta entrega.
- *Investimento:* 83,8 horas-pessoa na linha de base (67,6 h de trabalho + 16,2 h de contingência) e 90,8 h com a reserva de gerenciamento de 7,0 h, que só o patrocinador libera. Com o valor de referência de R$ 10,00 por hora, isso equivale a R$ 838,00 (R$ 908,00 com a reserva). O desembolso de caixa é de *R$ 0,00*.
- *Recomendação:* seguir com a solução própria (Alternativa C), conforme o cronograma replanejado em M-01 (aprovação do patrocinador pendente).

## 2. Necessidade de negócio

Hoje o proprietário depende da memória, de anotações e de adesivos no para-brisa para saber quando fazer uma revisão. Quando o prazo passa, a peça tende a falhar e o reparo se torna corretivo e mais caro.

Evidências do setor (indicativas, não medidas por este projeto):

- *Custo:* a manutenção preventiva pode custar até 30% menos que a corretiva, segundo dados do Grupo T-Line citados pela Instacarro.
- *Exemplo:* a troca preventiva da correia dentada pode passar de R$ 2.000 em carros mais sofisticados, enquanto um motor danificado pode custar de R$ 8.000 a R$ 12.000 (Localiza Seminovos).
- *Segurança:* segundo a Instacarro, a CNT relaciona a falta de manutenção preventiva a 27% dos acidentes urbanos e rodoviários.
- *Adesão:* em uma pesquisa-ação feita numa oficina, só 30% dos proprietários procurados faziam manutenção preventiva (Onohara, UFU).

A economia citada é *hipótese de implantação futura*, como registrado no Termo de Abertura. Ela não será medida nesta entrega.

*Oportunidade:* já existem aplicativos com lembretes por quilometragem ou data, como o Drivvo, gratuito para uso pessoal. O AutoCUIDA não se apresenta como lacuna de mercado: é um protótipo acadêmico focado no plano de manutenção por item, em uma regra de desgaste simples (o maior entre km e tempo) e nos custos por veículo.

## 3. Justificativa, estados e valor

*Estados*
- *Atual:* controle por memória, caderno ou adesivo, sem cálculo de desgaste por km e tempo e sem visão de custos.
- *Transição:* Entrega 1, front-end com dados em memória, prevista para 06/10/2026.
- *Futuro:* aplicação com back-end, banco, autenticação e persistência (etapa posterior, sem data).

*Valor para o usuário:* ver, num só painel, o que está em dia, próximo ou vencido e quanto já gastou, para preferir a manutenção preventiva.

*Valor para a equipe do par 7 (PSW Grupo 7 e GPTI Grupo H):* cumprir o requisito acadêmico com desenvolvimento em React e Vite e gestão de projeto sob prazo e escopo fixos.

| Tipo | Valor |
|---|---|
| Tangível | Situação calculada de cada item e total gasto por tipo e por mês (últimos seis meses) |
| Intangível | Previsibilidade e segurança na manutenção; aprendizado e portfólio da equipe |
| Desbenefício | Alerta calculado errado gera falsa segurança; horas tiradas de outras disciplinas; dados em memória podem parecer produto pronto |

## 4. Objetivos de negócio

Os critérios de sucesso do projeto (O1 a O4) estão no Termo de Abertura. Os objetivos abaixo são do business case.

| # | Objetivo | Indicador e meta | Quando medir |
|---|---|---|---|
| *OB1* | Entrega no prazo | Pacotes 2.1 a 7.4 (etapas F01 a F11) integrados, testados e aceitos até a data limite | 06/10/2026 |
| *OB2* | Controle de esforço | Desembolso de R$ 0,00 e estouro de até 10% (8,4 h) sobre a linha de base de 83,8 h | Ao longo da execução |
| *OB3* | Usabilidade | O usuário registra um veículo e cria um item de manutenção em menos de 1 minuto | Ensaios (pacote 7.3) |

## 5. Solução proposta e escopo

O AutoCUIDA é uma interface front-end responsiva, que funciona com dados em memória.

- *Dentro do escopo:* gestão de veículos (cadastro, seleção, edição, inativação e odômetro); itens de manutenção com regras por km e/ou tempo; registro, edição e exclusão de serviços; alertas visuais no painel; relatório de custos e histórico por veículo; estados de carregamento, erro e lista vazia; interface mobile e desktop; README e build.
- *Fora do escopo:* back-end e API, banco de dados, autenticação real, notificações por e-mail, push ou SMS, integração com oficinas ou Detran, pagamentos, sincronização em nuvem e manutenção preditiva por telemetria (OBD2).

## 6. Alternativas consideradas

Critérios avaliados de 1 a 5 (5 = melhor cenário). Em Risco, a nota mede o risco de não entregar o valor esperado.

| Alternativa | Descrição | Custo (peso 3) | Benefício (peso 4) | Risco (peso 3) | Total (máx. 50) |
|---|---|---|---|---|---|
| *A. Fazer nada* | Continuar com papel, memória ou planilha | 5 (nulo) | 1 (nenhum) | 1 (alto risco de esquecimento) | *22* |
| *B. Aplicativos existentes* | Mobills (despesas) ou Drivvo (lembretes por km e data) | 3 (gratuitos com anúncios ou assinatura) | 4 (atende em parte, mas é genérico) | 3 (médio) | *34* |
| *C. AutoCUIDA* | Solução dedicada | 4 (apenas esforço) | 5 (foco no plano de manutenção por item) | 2 (risco técnico da equipe) | *38 (recomendada)* |

Atender ao trabalho de PSW é restrição eliminatória, e só a Alternativa C a cumpre. Mesmo sem ela, C lidera, mas por pouco (38 contra 34), o que mostra que o ganho de C está no aprendizado e no controle das regras, e não em uma lacuna de mercado.

## 7. Custo, benefício e risco

### 7.1 Custo
- *Esforço:* 67,6 h, calculadas pela fórmula de três pontos (O + 4M + P) / 6 (22,6 h de gestão e 45,0 h de desenvolvimento e qualidade). Nos pacotes de desenvolvimento, O e P vêm do cronograma do grupo de PSW e M é o ponto médio (premissa).
- *Reserva de contingência:* 16,2 h para os riscos R1 a R7 (probabilidade × custo de mitigação e contingência), conforme o Plano, seção 12.
- *Linha de base:* 83,8 h. *Reserva de gerenciamento:* 7,0 h, fora da linha de base. *Orçamento autorizado:* 90,8 h.
- *Valor de referência:* R$ 10,00 por hora-pessoa, definido pela equipe só para dimensionar o esforço, pois ninguém é remunerado. Linha de base: R$ 838,00. Orçamento autorizado: R$ 908,00.
- *Tolerância:* estouro acima de 10% (8,4 h) exige pedido formal de mudança.

### 7.2 Benefício
Valor tangível e intangível na seção 3. A economia de até 30% é hipótese e só poderá ser medida em uso real, depois da etapa com back-end.

### 7.3 Risco
| ID | Risco | Probabilidade | Impacto |
|---|---|---|---|
| R1 | Paralelizar pacotes gera modelos de dados incompatíveis | Média | Alto |
| R2 | Regra de alertas com falhas conhecidas (arredondamento, retroatividade, calendário) | Média | Alto |
| R3 | Kit visual ainda não definido atrasa o pacote 2.1 | Alta | Alto |
| R6 | Algum integrante termina sem commits próprios | Média | Alto |
| R7 | O patrocinador espera outro critério de "front-end completo" | Baixa | Alto |

O risco geral do projeto é *alto*, porque a data é fixa e o caminho crítico não tem folga. Detalhes no Plano do Projeto, seção 12.

### 7.4 Modelos econômicos
VPL, TIR e payback não se aplicam: não há receita nem desembolso, e o custo é esforço. A decisão usa a matriz da seção 6.

## 8. Premissas

| Premissa | Risco se falhar |
|---|---|
| A entrega de 06/10 vale como "front-end completo", sem rubrica formal de avaliação | R7 |
| O kit visual é decidido sem atrasar o pacote 2.1 | R3 |
| Os 3 desenvolvedores trabalham nos fins de semana de 03 e 04/10 | R1 |
| Dados em memória bastam para o aceite | R7 |

## 9. Recomendação

Seguir com a *Alternativa C*. O trade-off aceito é não ter back-end nem persistência agora, em troca de valor demonstrável na data fixa de 06/10/2026. Uma etapa com back-end exigirá novo business case.

## 10. Fontes e referências

- Termo de Abertura e Plano do Projeto do AutoCUIDA.
- INSTACARRO. Manutenção preventiva pode reduzir gastos com o carro em até 30%. https://www.instacarro.com/blog/?p=314802
- LOCALIZA SEMINOVOS. Quando trocar a correia dentada? https://seminovos.localiza.com/blog/posts/quando-trocar-correia-dentada
- ONOHARA, E. Y. Manutenção automotiva preventiva: na ótica do proprietário da oficina. UFU. https://repositorio.ufu.br/handle/123456789/27667
- DRIVVO. Controle completo do seu veículo. https://drivvo.com/en/personal-use/

## 11. Histórico de versões

| Versão | Data | Mudança | Autor |
|---|---|---|---|
| 1.1 | 30/09/2026 | Primeira versão em docs/av1/ | Ronald Teixeira de Assis |
| 2.0 | 04/10/2026 | Fundamentação com fontes, alternativas, objetivos e análise de custo; revisão de português e alinhamento ao Termo e ao Plano | Ronald Teixeira de Assis |
