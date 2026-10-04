# Termo de Abertura do Projeto — AutoCUIDA

| Campo | Informação |
|---|---|
| **Versão** | 1.2 — 03/10/2026 |
| **Data** | 03/10/2026 |
| **Patrocinador** | Prof. Diogo Silveira Mendonça |
| **Gerente do projeto** | Patrick Cruz Azevedo, aluno da disciplina de GPTI. Presta contas do plano inteiro ao patrocinador. |
| **Equipe de gestão** | GPTI Grupo H (Ronald Teixeira de Assis, Hugo Lima de Almeida Antunes Aguiar, Rodrigo Americo Nascimento D'Icarahy, Thiago Souza da Silva) |
| **Equipe de desenvolvimento** | PSW Grupo 7 (Rafael Duarte Yahata, Gabriel Felipe Martins da Silva, Rafael Voigt Villas Boas) |

## 1. Propósito e justificativa

Este termo autoriza o início de um projeto de desenvolvimento do AutoCUIDA, um protótipo de sistema para gerenciar a manutenção preventiva e corretiva de veículos. Segundo o processo conhecido e pesquisado pelos alunos, os proprietários de veículos frequentemente enfrentam altos custos com reparos corretivos não planejados decorrentes do esquecimento de revisões periódicas. Hoje dependem da memória, de anotações em cadernos ou de adesivos no para-brisa para saber o momento de realizar a manutenção. A solução pretende automatizar o acompanhamento da saúde do veículo, reunindo alertas por km e tempo, além do registro de serviços e despesas, gerando economia e segurança para o condutor.

O projeto será também uma experiência de aprendizagem prática: os três alunos de PSW definirão a arquitetura e desenvolverão e os cinco alunos de GPTI validarão o escopo e conduzirão a gestão do projeto. Desenvolverão conhecimentos em React e JavaScript no front-end. O back-end, banco de dados e autenticação real estão fora do escopo desta entrega (AV1). O produto entregável funcionará com base em dados locais.

## 2. Objetivos do projeto

Os objetivos abaixo são do protótipo. Quem mede é a equipe GPTI, com ciência do patrocinador, na avaliação da AV1. A economia financeira de reparos, citada no caso de negócio, é hipótese de implantação futura.

- O usuário consegue cadastrar veículos, definir planos de manutenção com regras por quilometragem ou tempo, atualizar o odômetro e lançar serviços efetuados.
- O sistema calcula e gera alertas visuais de manutenção (Em dia, Próximo do vencimento, Vencido) sem depender de servidor remoto.
- O histórico de manutenções e o total de gastos do veículo são exibidos em um painel consolidado.
- A AV1, composta pelo Business Case, Termo, Plano e Dicionário, é entregue e o front-end é demonstrado com dados em memória local, sem conexão externa.

## 3. Escopo de alto nível

### Incluído

- Interface front-end mobile-first construída.
- Gestão de veículos (cadastro, seleção, edição, inativação, odômetro).
- Itens de manutenção com regras por km e/ou tempo.
- Registro, edição e exclusão de serviços realizados.
- Painel de alertas de status (Em dia, Próximo, Vencido).
- Relatório de custos e histórico isolado por veículo.
- Tratamento de estados (carregamento, erro, listas vazias) e acessibilidade básica.
- Código no repositório, README documentado e scripts de build.

### Fora do escopo inicial (AV1)

- API e back-end.
- Banco de dados (as informações residem temporariamente no estado do front-end).
- Autenticação real, login ou autorização por perfil (gestor de frota/condutor não serão definidos).
- Notificações por e-mail, push ou SMS.
- Integração com sistemas de oficinas.
- Sincronização em nuvem entre múltiplos usuários.
- Opcionais (só após o aceite essencial): persistência em localStorage, exportação de relatório e filtros financeiros avançados.

## 4. Marcos e entregas

| Marco | Prazo previsto | Entregáveis e critérios de aceite preliminares |
|---|---:|---|
| **M1 — Base pronta** | 30/09/2026 | Kit visual, tema, painel, dados por veículo, carga local, URLs. |
| **M2 — Cadastros essenciais** | 01/10/2026 | Veículos, itens e serviços (concluído). |
| **M3 — Fluxo integrado** | 02/10/2026 | Fluxo integrado do veículo ao painel de custos (concluído). |
| **M4 — Congelamento funcional** | 04/10/2026 | Execução do roteiro T01–T23 sem falha essencial. |
| **M5 — AV1 entregue** | 05/10/2026 (18:30) | Correções, documentação. Link postado no Teams. Artefatos de GPTI (`docs/av1/`). |
| **M6 — Entrega ao patrocinador** | 06/10/2026 | Demonstração final do protótipo com os critérios O1 a O4 atendidos. |

## 5. Requisitos de alto nível e critérios gerais de sucesso

- **O1:** Front-end completo com dados locais demonstrável (UC01–UC16) com o roteiro T01–T23 executado sem falha essencial. Validado pelo Patrocinador.
- **O2:** Alertas gerados corretamente (Testes T15–T17: 79,9%, 80%, 99,9%, 100%, virada de mês e serviço retroativo). Validado pelo GP.
- **O3:** O projeto deve poder ser clonado em um ambiente limpo e executado via `npm ci` e `npm run build` sem erros, utilizando apenas o README. Validado pelo GP.
- **O4:** Os 8 integrantes devem possuir contribuições rastreáveis via commit no repositório (`git shortlog -sne`) até a data limite. Validado pelo Patrocinador.

### Critérios de encerramento e cancelamento

O projeto termina com o aceite formal da Entrega 2.

O patrocinador cancela o projeto se ocorrer uma destas condições:
- O patrocinador altera o escopo de modo incompatível com o prazo, sem ampliar prazo ou equipe.
- Em 04/10 o roteiro T01–T23 não foi executado, a contingência não for suficiente e não houver viabilidade para o corte de funcionalidades opcionais.

## 6. Premissas e restrições

### Premissas

- A entrega ocorrerá no dia 06/10, se baseia no critério de "front-end completo", não possuindo rubrica oficial de avaliação sobre a completude.
- A equipe de desenvolvimento tem disponibilidade para atuar nos fins de semana (03–04/10).
- A regra de alertas adota "o que gerar o maior desgaste entre km e tempo" como base.
- O avaliador usará Node.js 22.12 ou superior.
- A persistência apenas em memória satisfaz a necessidade de validação.

### Restrições

- Não existem conexões com servidores reais ou APIs.

## 7. Governança e responsabilidades

| Papel | Responsabilidades principais | Designação |
|---|---|---|
| **Patrocinador** | Avaliar os artefatos da AV1, receber a demonstração e aprovar grandes desvios. | Prof. Diogo Mendonça |
| **Gerente do projeto (GP)** | Coordenar os gerentes, priorizar os pacotes, aprovar uso da reserva de contingência e atrasos de até 1 dia. | Patrick Cruz Azevedo |
| **Equipe de gestão (GPTI)** | Validar o escopo e fazer a gestão. | Ronald Teixeira de Assis, Hugo Lima de Almeida Antunes Aguiar, Rodrigo Americo Nascimento D'Icarahy, Thiago Souza da Silva |
| **Equipe de desenvolvimento (PSW)** | Definir a arquitetura e desenvolver o front-end React. | Rafael Duarte Yahata, Gabriel Felipe Martins da Silva, Rafael Voigt Villas Boas |

## 8. Estimativa econômica e financiamento

Este projeto tem orçamento de execução exclusivamente em horas. **Os alunos não serão remunerados, logo o desembolso será de R$ 0,00.**

O cronograma avaliado prevê um orçamento total de **83,8 horas por pessoa**. Adicionalmente, foi estipulada uma reserva de gerenciamento de **7,0 horas**, cuja liberação é exclusiva do patrocinador. Desvios que ultrapassem 8,4 horas (10%) ou que necessitem acessar a reserva de gerenciamento deverão ser escalados para o patrocinador. Não haverá custos adicionais com infraestrutura de nuvem, visto que a entrega M6 será unicamente local.

## 9. Autoridade e aprovação

A aprovação deste termo autoriza a continuidade do projeto com a entrega da AV1 e a demonstração com base nos escopos limitados ao front-end local.

| Aprovação | Nome | Assinatura | Data |
|---|---|---|---|
| Patrocinador | Prof. Diogo Mendonça | | 06/10/2026 |
| GP | Patrick Cruz Azevedo | | 03/10/2026 |
