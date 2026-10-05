# Prototipagem do AutoCUIDA

## 1. Objetivo

O AutoCUIDA é uma aplicação web para acompanhar a manutenção preventiva e
corretiva de veículos. A prototipagem foi orientada pelo problema de esquecer
revisões, perder o histórico de serviços e não ter uma visão consolidada dos
custos.

O perfil considerado nesta entrega é o proprietário ou responsável por uma
pequena frota. Notificações externas, integração com oficinas, autenticação e
sincronização entre usuários permanecem fora do escopo.

## 2. Fluxos prototipados

1. Selecionar um veículo e consultar seu painel.
2. Cadastrar e consultar veículos.
3. Atualizar o odômetro.
4. Consultar itens de manutenção e seus vencimentos por quilometragem e tempo.
5. Registrar um serviço preventivo ou corretivo.
6. Consultar histórico e custos por veículo.
7. Receber estados de carregamento, erro, vazio e confirmação.

Os dados da prototipagem foram representados em `mock/seed.json`, com dois
veículos, seus itens de manutenção e registros de serviço.

## 3. Decisões de interface

- Navegação principal por quatro seções: Painel, Garagem, Serviço e Custos.
- Seleção de veículo disponível em todas as telas.
- URLs com hash preservando a tela e o veículo selecionado.
- Cards para alertas, resumo do veículo, custos e histórico.
- Formulários com validação associada aos campos e mensagens em português.
- Layout fluido apoiado pelo grid e utilitários do Bootstrap, complementado
  apenas pelos estilos de identidade visual do produto.
- Componentes React pequenos e reutilizáveis.

## 4. Regras de negócio

- O alerta usa o maior desgaste entre quilometragem e tempo.
- Menos de 80%: Em dia; de 80% até antes de 100%: Próximo; a partir de
  100%: Vencido.
- Um serviço não pode possuir data futura.
- A quilometragem de um serviço deve ser coerente com o histórico do item.
- O odômetro só pode avançar.
- Cada registro pertence simultaneamente a um veículo e a um item daquele
  veículo.
- O histórico inicial é preservado; a referência mais recente é calculada a
  partir dos registros válidos.

## 5. Critérios de aceite da prototipagem

- O usuário consegue identificar rapidamente itens próximos ou vencidos.
- A troca de veículo não mistura alertas, serviços ou custos.
- Um serviço válido altera o histórico, os custos e os alertas.
- Campos inválidos são rejeitados antes do envio.
- A aplicação orienta o usuário quando a API está indisponível ou não há dados.
