# Validação da migração para Tailwind — 05/10/2026

## Alteração

- Tailwind CSS 4.3.3 e plugin para Vite substituem o Bootstrap.
- Tema, cores, cartões e navegação preservam a identidade existente.
- Layouts usam utilidades e variantes responsivas no JSX. `style.css` reúne
  tokens do tema e receitas reutilizáveis com `@apply`, sem media queries próprias.
- `xs` (368px) evita dividir valores monetários em telas muito estreitas;
  `md` (704px) preserva o início das duas colunas; `lg` (1024px) muda a navegação
  fixa para o fluxo da página e permite duas colunas nos formulários da Garagem.
- Barras do gráfico e de desgaste mantêm dimensões calculadas a partir dos dados.

## Verificação executada

- `npm test`: 38 testes aprovados, incluindo 6 testes HTTP do json-server.
- `npm run build`: aprovado. CSS de produção passou de aproximadamente 242 KB
  para 30 KB (aproximadamente 6,5 KB comprimidos).
- Navegador com viewport de 320, 390, 768 e 1366 pixels: navegação por Painel,
  Garagem, Serviço e Custos; largura do documento igual à largura útil da tela
  em todas as combinações, sem rolagem horizontal.
- Inspeção visual de cartões, gráfico, histórico, cadastro de veículo, edição
  de veículo e edição de serviço em larguras de celular e computador.
- Cadastro e registro de serviço inválidos: mensagens existentes visíveis e
  campos destacados. Foco por teclado visível; botão de registro acessível
  acima da navegação fixa ao avançar com Tab no celular.
- No modo demo isolado: envio de serviço, confirmação em celular e computador,
  cadastro de veículo, seleção automática e custos/histórico vazios do novo veículo.
  Esses envios não alteraram a base local do json-server.

## Limites

As larguras de celular foram simuladas no navegador, sem aparelho físico.
Esta etapa verifica apresentação e navegação; as correções de regras de edição,
calendário, filtro do painel e validações pendentes continuam separadas.
Os documentos de GPTI não foram alterados.
