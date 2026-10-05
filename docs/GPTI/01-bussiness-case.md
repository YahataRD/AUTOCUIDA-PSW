# Business Case - AutoCUIDA

**Versão:** 2.0  
**Data:** 04/10/2026  
**Patrocinador:** Diogo Silveira Mendonça  
**Equipe de gerenciamento:** Patrick Cruz Azevedo (GP), Ronald Teixeira de Assis, Hugo Lima de Almeida Antunes Aguiar, Rodrigo Americo Nascimento D'Icarahy, Thiago Souza da Silva  
**Equipe de desenvolvimento:** Rafael Duarte Yahata, Gabriel Felipe Martins da Silva, Rafael Voigt Villas Boas

> Este documento justifica o projeto AutoCUIDA, fundamenta o problema com dados reais de mercado automotivo, analisa alternativas, e resume o custo, benefício e viabilidade técnica do escopo aprovado.

## 1. Resumo Executivo

O AutoCUIDA é uma aplicação web focada em gestão de manutenção veicular preventiva. O sistema permite ao usuário registrar veículos, acompanhar alertas de serviços por quilometragem/data e registrar custos associados.

*   **Problema:** Proprietários de veículos negligenciam as revisões programadas por falta de organização, resultando em manutenções corretivas emergenciais que chegam a ser até 4 vezes mais caras.
*   **Solução:** Um painel web simples e responsivo que centraliza os dados do veículo e emite alertas automáticos para as próximas revisões e serviços pendentes.
*   **Investimento:** 83,8 horas de esforço (67,6 h de trabalho + 16,2 h de contingência). O custo econômico do projeto é de **R$ 838,00** (valorizando a hora acadêmica a R$ 10,00), mas o desembolso de caixa é estritamente **R$ 0,00**.
*   **Recomendação:** Seguir com a construção da solução própria (Alternativa C), mantendo o cronograma comprimido aprovado no replanejamento M-01.

## 2. Problema ou Oportunidade

A premissa fundamental do AutoCUIDA é que a falta de organização e o esquecimento dos prazos de revisão geram prejuízos financeiros severos e riscos de segurança. Esta não é apenas uma hipótese, mas uma realidade comprovada por dados do setor automotivo em 2026:

*   **Impacto Financeiro a Longo Prazo:** Levantamentos comparativos de gestão de frotas (Cobli/CalculadoraBrasil, 2026) demonstram que, em um período de 5 anos, a manutenção preventiva (trocas de óleo regulares, filtros, pastilhas programadas) custa entre **R$ 3.000 e R$ 5.000**. Em contrapartida, a manutenção corretiva (esperar a quebra, como rompimento de correia dentada ou retífica de motor) custa entre **R$ 10.000 e R$ 20.000**.
*   **Economia Direta:** A Confederação Nacional do Transporte (CNT) reforça que a manutenção preventiva é, no mínimo, 30% mais barata em peças e mão de obra isoladas, além de evitar os "custos invisíveis" como guincho e dias sem o veículo.

**Oportunidade:** Existe uma lacuna de mercado para condutores comuns (não-frotistas) que precisam de uma ferramenta visual, rápida e focada exclusivamente no roteiro de manutenção do seu carro ou moto, sem a complexidade de apps financeiros genéricos.

## 3. Justificativa do Projeto

Se o projeto for entregue com sucesso, o **valor gerado para o usuário** será a redução drástica de gastos imprevistos com o veículo e o aumento da segurança veicular e valor de revenda. O valor é observável através do uso do painel de alertas do sistema.

Para a equipe do Grupo 7, o projeto cumpre o requisito acadêmico de engenharia de software, garantindo experiência em desenvolvimento React/Vite de ponta a ponta, com restrições reais de prazo e gestão rígida de tempo e escopo.

## 4. Objetivos de Negócio

Metas propostas para medir o sucesso técnico e de gestão do projeto.

| # | Objetivo | Indicador e Meta | Quando medir |
| :--- | :--- | :--- | :--- |
| **O1** | **Entrega do Caminho Crítico** | 100% dos pacotes F01 a F11 integrados, testados e entregues até a data limite. | 06/10/2026 |
| **O2** | **Controle de Custos e Esforço** | Desembolso de caixa R$ 0,00. Estouro máximo de tolerância de 10% (8,4h) sobre a linha de base de 83,8h. | Ao longo da execução |
| **O3** | **Usabilidade do Produto** | O usuário deve ser capaz de registar um veículo e um novo alerta de manutenção em menos de 1 minuto de navegação. | Fase de Ensaios (Pacote 7.3) |

## 5. Solução Proposta

O AutoCUIDA está estruturado como uma interface front-end responsiva.

*   **Dentro do escopo:** Painel de visão geral do veículo, registro de veículos, cadastro de itens (peças/fluidos), catálogo de serviços realizados, registro de custos de manutenção, alertas automáticos (status de quilometragem ou data) e interface adaptável (mobile/desktop).
*   **Fora do escopo:** Integração direta com sistemas de oficinas mecânicas ou Detran, pagamentos dentro da plataforma, e manutenção preditiva via telemetria (OBD2).

## 6. Benefícios Esperados

*   **Para o utilizador final:** Transformar a manutenção corretiva emergencial (alto custo) em manutenção preventiva calendarizada (baixo custo), gerando uma poupança média superior a R$ 5.000 num ciclo de 5 anos de vida do veículo.
*   **Para a equipa:** Conhecimento aplicado em metodologias ágeis, documentação estruturada, ferramentas de planeamento (PERT, CPM) e desenvolvimento de interfaces.

## 7. Alternativas Consideradas

A decisão técnica foi baseada numa matriz quantitativa, avaliando Custo, Benefício e Risco numa escala de 1 a 5 (onde 5 é o melhor cenário).

| Alternativa | Descrição | Custo (Peso 3) | Benefício (Peso 4) | Risco (Peso 3) | Pontuação Final |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A. Fazer nada** | Utilizador continua a usar papel, cabeça ou Excel. | 5 (Nulo) | 1 (Nenhum) | 1 (Alto risco de esquecimento) | **22** |
| **B. Apps Genéricos** | Uso de apps de despesas diárias (ex: Mobills). | 3 (Freemium) | 3 (Controla dinheiro, mas não peças/km) | 3 (Médio) | **30** |
| **C. AutoCUIDA** | Desenvolvimento de solução dedicada. | 4 (Apenas esforço) | 5 (Foco total no problema veicular) | 2 (Risco técnico da equipa) | **38 (Recomendada)** |

A alternativa **C (AutoCUIDA)** obteve a maior pontuação por oferecer a melhor relação de benefício focado no problema da manutenção, sem incorrer em custos financeiros de subscrição de plataformas de terceiros.

## 8. Análise Financeira (Custo Econômico)

Como o projeto possui uma restrição de **zero desembolso financeiro** aprovada no Termo de Abertura, a análise é baseada no custo de oportunidade e esforço (hora-pessoa). 

*   **Valor Base da Hora:** Para fins de maturidade de projeto, estipulou-se o custo da hora técnica a R$ 10,00.
*   **Estimativa de Esforço (PERT):** Calculada pela fórmula `(O + 4M + P) / 6`, somando 67,6 horas de desenvolvimento e gestão.
*   **Reserva de Contingência:** 16,2 horas alocadas especificamente para cobrir os riscos R1, R2 e R3 mapeados no plano.
*   **Custo da Linha de Base:** 83,8 horas totais.
*   **Investimento Econômico Total:** 83,8 horas × R$ 10,00 = **R$ 838,00**.
*   **Limite de Tolerância:** Estouro acima de 10% (8,4 h) exige pedido formal de mudança.

## 9. Fontes e Referências
*   Termo de Abertura e Plano de Projeto do AutoCUIDA.
*   Confederação Nacional do Transporte (CNT). "Manutenção preventiva gera economia".
*   Cobli & Calculadora Brasil (2026). "Custo de manutenção de frota e veículos de passeio: preventiva x corretiva".
- *Riscos principais:* integração do trabalho em paralelo (R1), regra de alertas (R2), kit visual (R3), histórico individual de commits (R6). Detalhes no Plano do Projeto.

## 7. Recomendação
Opção C. O trade-off aceito é não ter back-end nem persistência agora, em troca de valor visível e demonstrável na data fixa de 06/10/2026.
