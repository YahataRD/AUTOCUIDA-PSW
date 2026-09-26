# Documentação do AutoCUIDA

Documentação padronizada em Markdown em 25/09/2026. Primeira entrega confirmada:
**06/10/2026**, com front-end funcional e sem back-end.

## Onde encontrar cada informação

| Documento | Finalidade | Natureza |
| --- | --- | --- |
| [Protótipo](prototipo.md) | Propósito, fluxo, entidades e 16 casos de uso | Conversão do TXT original, com notas editoriais identificadas |
| [Validação dos requisitos](validacao-requisitos.md) | CRUD, perfis e prioridades | Conversão das três matrizes do DOCX, com pendências preservadas |
| [Arquitetura](arquitetura.md) | Telas, componentes, dados e cálculos existentes | Inspeção do código inicial, não arquitetura futura já implementada |
| [Aulas recebidas](referencias/aulas.md) | Relação do conteúdo das cinco aulas com o projeto | Síntese por tema/página, não transcrição integral nem rubrica da entrega |
| [Escopo](planejamento/escopo-front-end.md) | O que falta e como definir conclusão | Diagnóstico e decisões propostas para a primeira entrega |
| [Cronograma](planejamento/cronograma.md) | Etapas, dependências, esforço e commits até 06/10 | Plano de execução a acompanhar pelo grupo |
| [Aceite](testes/aceite-front-end.md) | Cenários e registro de evidências | Testes planejados, com verificações já feitas separadas |
| [Contribuição](../CONTRIBUTING.md) | Branches, autoria, PRs e commits pequenos | Convenção do grupo proposta para o trabalho |

O [README principal](../README.md) contém a instalação e a demonstração do fluxo
que já existe. Para organizar o trabalho, começar por Escopo → Cronograma → Aceite.

## Destino dos documentos anteriores

| Origem | Documento ativo |
| --- | --- |
| `Descrição Protótipo.txt` | [prototipo.md](prototipo.md) |
| `AutoCUIDA-Validacao-Requisitos.docx` | [validacao-requisitos.md](validacao-requisitos.md) |
| `README.md` extenso | [README principal](../README.md) e [arquitetura.md](arquitetura.md) |
| Cinco PDFs no ZIP enviado pelo grupo | [Síntese das aulas](referencias/aulas.md), com páginas, autoria e identificação das fontes |

Os originais TXT/DOCX foram retirados da árvore atual após conversão e permanecem
no commit `b59f1ab`. O ZIP original permanece fora do repositório. HTML, CSS, JSX,
JSON e configurações são código e continuam em seus formatos próprios.

## Manutenção

Não manter duas versões ativas da mesma especificação em Word e Markdown.
Registrar decisões no escopo, prazos no cronograma e resultados no aceite, usando
os IDs UC, F e T para relacioná-los. Manter fonte, data e limite de cada afirmação;
não marcar uma funcionalidade como pronta só porque foi documentada.
