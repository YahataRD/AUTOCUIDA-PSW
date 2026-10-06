# Histórico de mudanças do AutoCUIDA

Este arquivo registra as entregas de desenvolvimento, com as mais recentes
primeiro. Atualize-o no mesmo commit que conclui uma etapa: informe a data,
o que mudou, a validação executada e uma referência ao código ou PR quando
disponível. O hash do próprio commit pode ser acrescentado na atualização seguinte.
Registre o esforço de cada participante em [horas-dev.md](horas-dev.md).

O histórico anterior foi resumido a partir dos commits. Datas de commits não
representam duração de trabalho, e implementação não significa aceite final.

## 2026-10-06

### Formulários e tratamento de falhas

- Campos de itens, edição de serviços e veículos com rótulos e mensagens
  associadas por acessibilidade; datas futuras e referências inválidas rejeitadas.
- Intervalos de manutenção aceitam somente km, somente meses ou ambos;
  um critério vazio equivale a desativá-lo.
- Rascunho e erros da edição de veículo preservados após reconsulta dos dados.
- Remoção de item, exclusão de serviço e inativação de veículo tratam falhas
  da API e bloqueiam cliques repetidos enquanto aguardam a resposta.
- Validação: 47 testes aprovados, builds API e demo, conferência no navegador
  em celular e desktop e falhas HTTP 500 simuladas. Roteiro em
  [formulários e ações](../docs/testes/formularios-acoes.md).
- Horas registradas para esta etapa e para a correção de integridade anterior.
- Próxima prioridade: calendário e percentuais dos alertas.

### Integridade das edições

- Impedida a redução do odômetro pela edição de veículo, mantendo alterações
  de modelo/placa/ano e leituras iguais ou maiores disponíveis.
- Referências de itens incompatíveis com o histórico são rejeitadas antes de
  gravar; API e demo compartilham a mesma validação.
- A edição de serviço amplia o odômetro quando necessário, antes de salvar o
  registro. Demo e cache do TanStack Query acompanham a atualização.
- Falha parcial na gravação informa o usuário e mantém a base legível.
- Validação: 45 testes aprovados, incluindo sete regressões novas, e build
  de produção aprovado. Detalhes em [integridade das edições](../docs/testes/integridade-edicoes.md).
- Próximas prioridades: erros/rótulos dos formulários e falhas das ações;
  calendário e percentuais dos alertas; filtro por situação e serviços de itens
  inativados; conferência final da entrega.

## 2026-10-05

### Correção da tabela de horas

- Ajustada a linha de separação para as cinco colunas do cabeçalho, restaurando
  a renderização Markdown sem alterar os valores ou os links.

### Simplificação do registro de horas

- Consolidado o registro em uma tabela com entregas, commits e subtotais.
- Mantidas colunas distintas para tempo estimado e tempo confirmado.

### Estimativas retrospectivas de esforço

- Preenchida a tabela de horas com estimativas por entrega e autor dos commits,
  incluindo faixas de incerteza e critérios de cálculo.
- Separadas as estimativas do tempo efetivamente trabalhado, que continua
  pendente de confirmação individual.
- Rafael Voigt Villas Boas permanece sem estimativa: a equipe confirmou que
  ele ainda não possui commits. O subtotal cobre somente contribuições identificadas.

### Registro de mudanças e horas

- Criados este changelog e a tabela de horas por desenvolvedor e entrega.
- Incluídos links no README para facilitar a atualização pela equipe.
- Horas anteriores permanecem sem lançamento até confirmação dos responsáveis.

### Migração para Tailwind CSS

- Tailwind CSS 4 e seu plugin para Vite substituem o Bootstrap.
- Preservadas as cores, os cartões, a navegação e as funcionalidades existentes.
- Layouts responsivos passam a usar classes do Tailwind, sem media queries próprias.
- Ajustados os cartões de custos em telas estreitas e os espaçamentos dos formulários.
- Validação: 38 testes aprovados; builds de API e demo aprovados; navegação pelas
  quatro telas em viewports de 320, 390, 768 e 1366px, sem rolagem horizontal.
- Referência: [ebec85b](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/ebec85b).
  Detalhes e limites em [validação do Tailwind](../docs/testes/tailwind.md).

### Gestão de veículos, itens e serviços

- Acrescentadas edição e inativação de veículos, gestão de itens de manutenção
  e edição/exclusão de serviços.
- Referência: [0d6897a](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0d6897a).
- A revisão identificou pendências de integridade nas edições, calendário de
  alertas, filtro por situação e mensagens de validação. Esta entrada registra
  a implementação; não declara essas pendências resolvidas.

## 2026-10-04

### Formulários com React Hook Form e Zod

- Adaptados cadastro de veículo, odômetro e registro de serviço, com schemas
  compartilhados, conversão dos campos e mensagens de validação.
- Referência: [56efc1e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/56efc1e).

### Integração com json-server e TanStack Query

- Integradas consultas e gravações ao mock, com dados iniciais versionados,
  atualização de cache e tratamento de falhas.
- Unificados instalação, execução, testes e build pelos comandos da raiz.
- Referências: [0195f64](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0195f64)
  e [0711ffd](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0711ffd).

### Organização do frontend

- Movidos os arquivos da aplicação para `frontend/`, ajustando os caminhos
  e a publicação sem reorganizar os documentos de gestão.
- Referência: [409ec2e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/409ec2e).

## 2026-10-02

### Cadastro de veículos

- Implementados cadastro, validação de placa e seleção automática do novo veículo.
- Referência: [255a20f](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/255a20f).

### Publicação no GitHub Pages

- Criado workflow de publicação após testes e build na `main`.
- Referência: [e87b48a](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/e87b48a).
- Atualmente o Pages usa o modo demo em memória; o json-server roda localmente.

### Base compartilhada

- Organizados os dados por veículo, a carga validada, os estados de erro/vazio
  e a navegação por URL, com documentação para continuidade do trabalho.
- Referências: [f48f9a7](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/f48f9a7)
  e [e65bcd2](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/e65bcd2).

## 2026-09-25

### Organização da documentação

- Convertidos materiais para Markdown, mapeados requisitos e revisados o
  cronograma e a organização dos documentos de desenvolvimento.
- Referências: [d7e5b6f](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/d7e5b6f),
  [b75f7c2](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/b75f7c2),
  [81e55d3](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/81e55d3) e
  [9db6516](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/9db6516).

## 2026-09-23

### Versão inicial

- Incluídos os protótipos, as telas React, os componentes visuais e os cálculos
  iniciais de manutenção e custos.
- Referência: [b59f1ab](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/b59f1ab).
