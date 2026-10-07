# Calendário e percentuais — 06/10/2026

Correção posterior à revisão documental `0c66171`, realizada por Rafael Duarte
Yahata com assistência do Codex. O registro de Rafael Voigt em
[verificacao-final.md](verificacao-final.md) descreve a base anterior.

## Regra aplicada

- O vencimento soma meses à referência e limita o dia ao último dia do mês de
  destino: 31/01/2026 + um mês = 28/02/2026; em 2024, 29/02.
- O desgaste temporal é a fração dos dias transcorridos em relação aos dias
  entre referência e vencimento. No prazo exibido, chega exatamente a 100%.
- Considera-se o dia local do usuário ao renderizar. Não há timer para atualizar
  uma tela deixada aberta até o dia seguinte; recarregar atualiza o cálculo.
- O maior desgaste entre km e tempo continua determinando a classe, com precisão
  integral. Apenas a apresentação é truncada para uma casa decimal: 79,99% vira
  79,9%, mantendo Em dia; 99,99% vira 99,9%, mantendo Próximo.

## Verificações

- `npm test`: **53 aprovados**, sendo 43 frontend e 10 HTTP.
- Seis testes novos em `frontend/tests/maintenance.test.js`: antes/no/depois do
  prazo, fevereiro, fim de mês, ano bissexto, mudança de ano, limiar de 80%,
  horários do mesmo dia, intervalos desativados e formatação nos limites.
- Mesmos testes aprovados com `TZ=America/Sao_Paulo` e `TZ=Pacific/Auckland`.
- `npm run build`: API e demo aprovados.
- Painel no navegador, modo demo, em 390 × 844 e 1366 × 900: percentuais curtos
  (ex.: 121,6%), datas e classes visíveis, sem transbordamento horizontal.
- `mock/seed.json`, `mock/db.json` e documentos de GPTI preservados.

P02 está corrigida. P04 está corrigida quanto às casas decimais, mas a ressalva
da EAP sobre dimensões inline permanece. Filtro (P01), edição de serviços de
itens removidos (P03) e aceite completo continuam pendentes.
