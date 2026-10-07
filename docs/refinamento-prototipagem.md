# Refinamento da prototipagem — AutoCUIDA

Data: **06/10/2026**. Código analisado: [`8133fd6`](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/8133fd61e5b0b6dfe901d1c033dbf43147319d1b).
Responsável pela verificação final: **Rafael Voigt Villas Boas**, conforme informado pela equipe.
Revisão documental e verificações assistidas por Codex; não houve alteração do código funcional nesta revisão.

## Evolução comprovada

A versão inicial já continha páginas React e referências HTML estáticas. O refinamento organizou o estado por veículo, ampliou a gestão, integrou dados ao mock HTTP e adotou as bibliotecas exigidas. Não se atribui toda a migração de HTML para React a uma etapa posterior inexistente no histórico.

| Etapa | Mudança observável | Commit |
| --- | --- | --- |
| Base por veículo | Seletores, vínculos, estados e URLs | [f48f9a7](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/f48f9a7) |
| Cadastro | Placa normalizada/única e seleção do novo veículo | [255a20f](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/255a20f) |
| Organização | Aplicação e testes separados em frontend/ | [409ec2e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/409ec2e) |
| Integração HTTP | json-server, seed única e TanStack Query | [0195f64](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0195f64) |
| Formulários | React Hook Form e Zod nos fluxos principais | [56efc1e](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/56efc1e) |
| Gestão | Edição/inativação de veículos, itens, edição/exclusão de serviços; Bootstrap intermediário | [0d6897a](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/0d6897a) |
| Responsividade | Tailwind CSS 4 substitui Bootstrap | [ebec85b](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/ebec85b) |
| Integridade | Proteção do odômetro e das referências, tratamento de gravação parcial | [598b1a2](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/598b1a2) |
| Feedback | Rótulos, erros associados aos campos e falhas de ações | [8133fd6](https://github.com/YahataRD/AUTOCUIDA-PSW/commit/8133fd6) |
| Alertas | Calendário com fim de mês/anos bissextos e percentual legível sem antecipar limites | Nesta etapa; [validação](testes/calendario-alertas.md) |

## Arquitetura e tecnologias na versão entregue

- React 18 e ES6+: componentes, hooks, módulos, async/await e transformações imutáveis.
- Vite 8: desenvolvimento e build; frontend/src/main.jsx é a entrada React.
- Tailwind CSS 4: plugin no Vite, tema e utilidades responsivas xs:, md: e lg:. Estilos específicos permanecem em frontend/style.css.
- React Hook Form 7 e Zod 4: formulários controlados por useForm e zodResolver, schemas compartilhados em frontend/src/data/formSchemas.js.
- TanStack Query 5: consulta da base, mutações, cache e invalidação em frontend/src/data/queries.js e frontend/src/hooks/useAutoCuida.js.
- json-server 0.17.4: API local para vehicles, maintenanceItems e serviceRecords; seed versionada e cópia de trabalho persistente.

## Decisões de refinamento e seus efeitos

| Decisão | Efeito para o usuário | Limite |
| --- | --- | --- |
| URL com seção e veículo | Link restaurável e navegação Voltar/Avançar | Normalização de rota não é autenticação |
| Filtrar dados por vehicleId | Painel, histórico e custos correspondem ao selecionado | Inativos não têm consulta pela interface ativa |
| Referências derivadas do histórico | Editar/excluir serviço recalcula o ciclo sem apagar referência inicial | Edição de serviço de item removido ainda é bloqueada |
| Validação no frontend | Erros junto aos campos e rejeição de datas/valores inválidos | Escrita direta na API pode contornar regras |
| Reconsulta após mutação | Interface acompanha dados do mock e informa falhas | Sem transação entre odômetro e serviço |
| API local e demo separados | API persiste entre sessões; Pages permite demonstração em memória | Pages não comprova integração com json-server |

## Validação e resultado

Na revisão final, passaram 37 testes de frontend e 10 testes de integração HTTP, além do build com API. Foram reproduzidos os limites de km (79,9/80/99,9/100%) e a falha de calendário. A inspeção das telas confirma as funções descritas nos manuais, sem representar homologação completa de acessibilidade.

Após essa revisão, o calendário e a apresentação dos percentuais foram corrigidos, com 53 testes e builds API/demo aprovados. O refinamento **não está integralmente concluído**: falta filtro de situação; serviços de itens inativos não podem ser editados mantendo o vínculo; gráficos e barras ainda usam dimensão inline, divergindo da EAP. A [matriz de pendências](entrega-avaliacao.md) explica impacto e evidência. O registro anterior permanece como histórico, sem atribuir os novos testes à revisão de Rafael Voigt.

Nesta preparação da entrega foram ajustados somente documentos e registro de horas. Nenhuma dessas pendências foi corrigida nem marcada como funcional por essa revisão.
