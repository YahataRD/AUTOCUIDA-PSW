# Base das aulas de Programação de Software Web

Material fornecido pelo grupo em 25/09/2026, no arquivo
`OneDrive_1_25-09-2026.zip`. Autoria indicada nos slides: Prof. Diogo Silveira
Mendonça, CEFET/RJ, Maracanã.

Este documento é uma **síntese em Markdown orientada ao AutoCUIDA**, não uma
transcrição integral dos PDFs. Os exercícios usam um gerenciador de projetos
como exemplo. Seus nomes de arquivos e endpoints não são requisitos literais
do AutoCUIDA. As páginas abaixo são contadas a partir de 1 no respectivo PDF.

## Limites da fonte

O ZIP contém cinco PDFs, totalizando 262 páginas. Não há enunciado específico
da primeira entrega identificado nesse conjunto. O grupo confirmou a data de
06/10/2026, o escopo de front-end sem back-end e a importância dos commits;
essas informações vieram da conversa, não dos slides.

As menções às aulas futuras são indicações do curso, não prova de conteúdo já
ministrado. Há remissões antigas: por exemplo, a aula 1, p. 33, apresenta um
mapa do curso que não corresponde integralmente aos títulos dos PDFs seguintes.
Para esta síntese, prevalece o conteúdo de cada arquivo recebido.

## Conteúdo e aplicação no projeto

| Arquivo | Conteúdo relevante e páginas | Aplicação ao AutoCUIDA |
| --- | --- | --- |
| `psw_aula01.pdf` (45 p.) | Cliente/servidor e HTTP (4–23); HTML/CSS/JS e renderização (24–27); SPA e JSON (29–32); DevTools (34–35) | Explicar o cliente React e observar a carga dos arquivos; conhecer API sem criar back-end nesta entrega |
| `psw_aula02.pdf` (55 p.) | Documento e semântica (4–13); CSS (14–22); responsividade (23–27); frameworks (28–44); atividade (51–52) | Idioma, título, landmarks, um h1, navegação semântica, layout responsivo e adoção de um kit visual |
| `psw_aula03.pdf` (54 p.) | Números e validação (7–10); ausência e coerção (13–21); objetos/JSON (24–27); arrays e transformações (28–41); revisão de IA (42–43) | Validar quilometragem/valor, manter estado imutável, calcular totais e ordenar cópias |
| `psw_aula04.pdf` (53 p.) | Funções/callbacks (4–16); módulos (21–25); Promise/fetch/erros (26–40); simulação e atividade (43, 49–51) | Separar leitura, transformação e tela; usar JSON local e demonstrar sucesso, vazio e erro |
| `psw_aula05.pdf` (55 p.) | React/Vite (5–10); JSX/componentes (11–19); props/listas/eventos (20–26); estado/hooks (27–36); efeitos (37–42); atividade (51–53) | Componentes funcionais, props somente leitura, keys por ID, setters imutáveis, efeitos com limpeza e estados de carregamento |

## Orientações com impacto imediato

### Framework de interface

A aula 2, p. 30, apresenta Tailwind, Bootstrap, Material UI, Ant Design e
shadcn/ui. A p. 43 afirma que a disciplina aceita as opções da lista e orienta
evitar mistura de frameworks na mesma tela. A p. 44 pede um framework nomeado,
sem CSS solto ou `style` na tag, com semântica e responsividade preservadas.

O AutoCUIDA atual usa CSS próprio e estilos inline para barras. Isso é uma
divergência em relação à orientação didática, a tratar no cronograma. A escolha
de MUI como candidato é uma **proposta deste planejamento**, não uma determinação
do professor. Ainda não foi instalado.

### Dados simulados e estados de interface

A aula 4, p. 43, demonstra leitura de JSON local por HTTP. As p. 49–51 pedem
módulos separados, `response.ok`, tratamento de erro e evidência de sucesso,
lista vazia e falha. A aula 5, p. 51–53, retoma o JSON em `public/`, filtro por
estado e esses resultados na interface React.

Para a primeira entrega, propõe-se carregar um JSON estático servido pelo Vite
e manter as alterações em memória. Isso demonstra o conteúdo sem desenvolver
API, banco ou servidor de negócio. JSON Server é citado na aula 5, p. 6, mas
não é necessário para essa proposta. Não serão criados endpoints reais apenas
para imitar os exemplos.

### Componentização e revisão do código

A aula 5, p. 17–24, trata separação de componentes, props somente leitura e
keys estáveis. As p. 29 e 33 tratam atualização imutável e regras dos hooks;
as p. 37–42 distinguem cálculo puro de efeito e pedem manter o Strict Mode.
O projeto já adota boa parte dessa estrutura, que será aproveitada.

As aulas também pedem conferir o código sugerido por IA: aula 2, p. 21–22;
aula 3, p. 42–43 e 52; aula 4, p. 41–42; aula 5, p. 43–44. Os commits devem
registrar mudanças reais, com explicação e validação pelo integrante responsável.

### Navegação e assuntos futuros

A aula 5, p. 54, anuncia rotas, formulários controlados e estado compartilhado
como assunto da próxima aula. Não há PDF da aula 6 neste pacote. Melhorar
Voltar/Avançar e URLs é uma recomendação de qualidade do planejamento, não uma
afirmação de que React Router já foi exigido pelo professor.

## Identificação das fontes

O ZIP original permanece com o grupo. Seu SHA-256 é
`26e5113e7e8005a6fba455d332bb43eb3cdc94336a00b3fcb0dad36974dc328f`.

| Arquivo | SHA-256 |
| --- | --- |
| `psw_aula01.pdf` | `46e97f6b5b7d43aa6fbc7d0033f4e1ddbb091f2d0e2fbadd0c36ea904f18421b` |
| `psw_aula02.pdf` | `5a375dd20788bf2aa9fbc7cd5ce1ce815a64bafcd33e960b1bc98ec4e02e6019` |
| `psw_aula03.pdf` | `4b5517d26db09bf232ef4d431f328b91d8ebe80c7433cc558f18ac01c16542f1` |
| `psw_aula04.pdf` | `8dc88d79ed12d4e76a7b20e84d29a6d5ee6548390daaad2ef5051a47f9cc0489` |
| `psw_aula05.pdf` | `9c8666f347169fcc5dfbf3f433e8d811c95c8511e4fbe4b0575506ac73ca5d4f` |

Referência adicional consultada em 25/09/2026:
[instalação oficial do Material UI](https://mui.com/material-ui/getting-started/installation/).
Ela aceita React 18, mas orienta alinhar `react-is` à versão do React para essa
linha. Essa compatibilidade deverá ser verificada e registrada se MUI for adotado.
