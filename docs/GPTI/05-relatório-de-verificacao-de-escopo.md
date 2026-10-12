# RELATÓRIO DE VERIFICAÇÃO DO ESCOPO E RECOMENDAÇÃO DE ACEITE (MARCO 1)

**Projeto:** AutoCUIDA — Sistema de Acompanhamento Preditivo de Manutenção Automotiva

**Grupo responsável pelo Gerenciamento (GPTI):** Grupo H (Patrick Cruz Azevedo, Ronald Teixeira de Assis, Hugo Lima de Almeida Antunes Aguiar, Rodrigo Americo Nascimento D'Icarahy, Thiago Souza da Silva)

**Grupo responsável pelo Desenvolvimento (PSW):** Grupo 7 (Rafael Duarte Yahata, Gabriel Felipe Martins da Silva, Rafael Voigt Villas Boas)

---

## 1. Data de Status e Período Coberto

* **Data de Status (Corte da Entrega):** 06/10/2026 (Referente à versão final entregue e homologada no repositório na base [`8133fd6`](https://github.com/YahataRD/AUTOCUIDA-PSW)).


* **Período Coberto:** 23/09/2026 a 06/10/2026 (Desde o início da prototipagem e especificação até o congelamento da entrega do Marco 1).



---

## 2. Situação Geral do Escopo

> **STATUS DO ESCOPO:** **AMARELO**

### Justificativa Factual Baseada em Evidências de Escopo

* **Conformidade Técnica e Funcional:** A execução do software realizada na máquina local da equipe (conforme o Manual de Instalação via `npm ci` e `npm start`) confirmou que 100% dos pacotes de trabalho previstos na EAP do Marco 1 foram entregues e estão operacionais. A suíte automatizada de testes registrou **56/56 testes aprovados** (45 de frontend e 11 de integração HTTP com `json-server`).


* **Motivo da Classificação Amarela (Ressalvas de Processo e Escopo):**

1. **Pendência de Processo de Gerenciamento:** Necessidade de formalização e alinhamento do apontamento rigoroso de horas reais por aluno e por atividade do cronograma com a equipe de desenvolvimento (PSW) para viabilizar o cálculo de Valor Agregado (EVM) no próximo Status Report.

2. **Uso de algo que o professor explicitamente pediu para não se usar:** Uso de `alert` ao excluir algo da aba custos que é intrusivo e acaba com a experiência de usuário. 





---

## 3. Verificação do Escopo Pacote por Pacote (Marco 1)

Conferência de cada entrega do Marco 1 (Frontend com Backend Mockado via `json-server` e modo `demo`) em relação aos critérios observáveis do Dicionário da EAP:

| Pacote EAP | Critério Observável do Dicionário da EAP

 | Resultado da Verificação | Parecer e Recomendação ao Patrocinador |
| --- | --- | --- | --- |
| **2.1 Painel de Desgaste e Alertas** | Exibição dos itens de manutenção com desgaste calculated sem arredondamento (<80% Em dia, 80–99,9% Próximo, ≥100% Vencido). Filtro funcional por situação e tratamento de estados vazios.

 | **Passou**<br> | **Verificado.** Recomendado para Aceite do Patrocinador.

 |
| **3.1 Garagem e Gestão do Odômetro** | Cadastro de veículo com validação de placa única (Mercosul e antiga), modelo, ano e km inicial. Edição do veículo e atualização rápida do odômetro exigindo valor estritamente maior.

 | **Passou**<br> | **Verificado.** Recomendado para Aceite do Patrocinador.

 |
| **4.1 Configuração do Plano de Manutenção** | Cadastro e edição de itens por km e/ou meses. Remoção lógica do item mantendo o histórico de serviços passados preservado.

 | **Passou**<br> | **Verificado.** Recomendado para Aceite do Patrocinador.

 |
| **5.1 Lançamento e Histórico de Serviços** | Form para registro de serviços (tipo, data, km, valor, oficina). Suporte a edição/exclusão de serviços antigos, inclusive mantendo o vínculo com itens inativados.

 | **Passou**<br> | **Verificado.** Recomendado para Aceite do Patrocinador.

 |
| **5.2 Relatório Financeiro e Custos** | Totalizador de gastos, média móvel dos últimos 6 meses (incluindo meses com custo R$ 0,00) e gráfico de barras mensal.

 | **Passou**<br> | **Verificado.** Recomendado para Aceite do Patrocinador.

 |
| **6.1 Interface Responsiva e Roteamento** | Navegação por Hash URL preservando estado e veículo, seletor global de veículos e layout responsivo Tailwind CSS v4.

 | **Passou** *(com ressalva)*<br> | **Verificado com Ressalva.** Recomendado para Aceite com registro de ressalva técnica de estilos.

 |
| **7.1 Testes Automatizados e Mock Backend** | Execução local conjunta via `npm start` (json-server porta 3001), modo `demo` para GitHub Pages e suíte de 56 testes automatizados sem falhas.

 | **Passou**<br> | **Verificado.** Recomendado para Aceite do Patrocinador.

 |

---

## 4. Requisitos do Marco 1 Atendidos e Matriz de Rastreabilidade

### Análise das Três Perguntas de Controle do Escopo

1. **O que está na EAP deste marco foi entregue?**
**SIM.** Todos os 7 pacotes previstos para o Marco 1 (2.1, 3.1, 4.1, 5.1, 5.2, 6.1 e 7.1) foram construídos, integrados e validados em execução local na máquina da equipe.


2. **O que foi entregue está na EAP?**
**SIM.** Não houve adição de funcionalidades extras sem solicitação ("gold plating"). Todo o código entregue corresponde estritamente aos 16 casos de uso e requisitos rastreados na EAP.


3. **O que foi entregue atende ao aceite do dicionário?**
**SIM.** Todos os critérios funcionais foram atendidos integralmente. 



### Matriz de Rastreabilidade de Requisitos (Marco 1)

| Requisito | Descrição Resumida | Pacote EAP Associado | Status na Verificação |
| --- | --- | --- | --- |
| **REQ-01 / REQ-02** | Base de dados compartilhada e persistência mock

 | Pacote 7.1

 | **Atendido** (56/56 testes ok)

 |
| **REQ-03 / REQ-09** | Painel de desgaste por tempo/km e filtro por situação

 | Pacotes 2.1 e 6.1

 | **Atendido**<br> |
| **REQ-04 / REQ-08** | Lançamento e edição de serviços (com itens inativos)

 | Pacote 5.1

 | **Atendido**<br> |
| **REQ-05 / REQ-06** | Gestão de veículos, placa única e odômetro incremental

 | Pacote 3.1

 | **Atendido**<br> |
| **REQ-07** | Configuração de plano de manutenção por item

 | Pacote 4.1

 | **Atendido**<br> |
| **REQ-10** | Roteamento dinâmico por URL / Hash

 | Pacote 6.1

 | **Atendido**<br> |
| **REQ-11** | Consolidação de custos e histórico de 6 meses

 | Pacote 5.2

 | **Atendido**<br> |
| **REQ-12 a REQ-16** | Validações, mensagens de erro, acessibilidade e responsividade

 | Pacotes 6.1 e 7.1

 | **Atendido**<br> |

---

## 5. Registro de Questões (Issue Log) e Registro de Mudanças (Change Log)

### Registro de Questões (Issue Log)

| ID | Descrição do Defeito / Inconformidade / Ocorrência | Causa / Impacto | Responsável (Dono) | Data Limite para Solução |
| --- | --- | --- | --- | --- |
| **ISS-01** | Ausência de apontamento individual de horas detalhado por aluno/atividade do cronograma para o Marco 1.

 | Impede a consolidação do cálculo de Valor Agregado (EVM) para o Status Report 2.

 | Ronald Teixeira (GPTI) / Rafael Yahata (PSW)

 | 16/10/2026 |

### Registro de Mudanças (Change Log)

* **Solicitações de Mudança de Escopo no Marco 1:** **NENHUMA.** Não foram implementadas funcionalidades fora da EAP. Todas as alterações efetuadas na fase de homologação foram estritamente voltadas à correção de defeitos e refinamento de código (ajustes do algoritmo de calendário bissexto P02 e liberação de edição para itens inativos P03).



---

## 6. Próximas Ações e Decisões Solicitadas ao Patrocinador

### Decisões Solicitadas ao Patrocinador (Com Prazo de Resposta)

1. **Aceite Formal do Marco 1 (Prazo: 16/10/2026):**
* **Recomendação da Equipe de Gerenciamento:** Recomendamos o **ACEITE FORMAL DO MARCO 1** (Frontend + Backend Mockado), considerando que a entrega atingiu 100% de cobertura funcional, passou em 56/56 testes automatizados e cumpriu o Manual de Instalação.




2. **Autorização de Início do Marco 2 (Prazo: 16/10/2026):**
* **Solicitação:** Autorização oficial para a transição de fase e início do desenvolvimento da API própria e persistência definitiva em banco de dados.





### Próximas Ações das Equipes (GPTI e PSW)

* **Alinhamento do Registro de Horas (Semana de 12/10 a 16/10):** Estruturar com a equipe de desenvolvimento (PSW) o modelo unificado de registro diário/semanal de horas reais por integrante e por tarefa do cronograma.


* **Preparação do Status Report 2:** Consolidar os dados do registro de horas e avanço físico para apresentar o desempenho de Custos (IDC), Prazos (IDP) e Análise de Valor Agregado (EVM).