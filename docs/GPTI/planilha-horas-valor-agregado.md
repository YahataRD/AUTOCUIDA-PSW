# Planilha de Horas e Valor Agregado — AutoCUIDA

*Pessoas identificadas pelas siglas do Plano do Projeto §11 (GP, G2–G5, D1–D3). Responsável: G3 (cronograma e finanças). Data de status: 30/11/2026. Unidade: hora-pessoa; R$ 10,00 por hora é só referência de dimensionamento (desembolso R$ 0,00). Regra de crédito 0/100, com verificação por pessoa diferente de quem executou. A versão editável (.xlsx) acompanha este relatório.*

## 1. Valor agregado final

| Medida | Entrega 1 | Marco 2 | Projeto |
| --- | --: | --: | --: |
| BAC (h) | 67,6 | 29,5 | 97,1 |
| VP (h) | 67,6 | 29,5 | 97,1 |
| VA (h) | 67,6 | 29,5 | 97,1 |
| CR (h) | 74,5 | 25,0 | 99,5 |
| VPr = VA − VP (h) | 0,0 | 0,0 | 0,0 |
| VC = VA − CR (h) | −6,9 | +4,5 | −2,4 |
| IDP = VA ÷ VP | 1,00 | 1,00 | 1,00 |
| IDC = VA ÷ CR | 0,91 | 1,18 | 0,98 |
| BAC (R$ referência) | R$ 676,00 | R$ 295,00 | R$ 971,00 |
| CR (R$ referência) | R$ 745,00 | R$ 250,00 | R$ 995,00 |

O CR não inclui as 8,5 h pré-baseline (23 a 25/09: protótipo e documentação), que ficam em linha própria. Com elas, o consumo total é de **108,0 h**. Pacotes verificados: Entrega 1, 13 de 13; Marco 2, 5 de 5 (verificados por G2 em 23/11; aceite formal do professor previsto para 30/11).

## 2. Valor agregado por pacote

| Pacote | Fim planejado | BAC = VP (h) | VA (h) | CR (h) |
| --- | --- | --: | --: | --: |
| 1.1 Planejamento da AV1 | 04/10 | 14,3 | 14,3 | 15,5 |
| 1.2 Monitoramento | 06/10 | 8,3 | 8,3 | 10,5 |
| 2.1 Kit visual e painel | 30/09 | 7,0 | 7,0 | 4,5 |
| 2.2 Dados e URLs | 30/09 | 5,0 | 5,0 | 9,5 |
| 3.1 Veículos e odômetro | 01/10 | 5,0 | 5,0 | 5,0 |
| 4.1 Itens e regras | 01/10 | 5,0 | 5,0 | 3,0 |
| 5.1 Serviços | 01/10 | 5,0 | 5,0 | 4,5 |
| 5.2 Custos | 02/10 | 2,5 | 2,5 | 2,0 |
| 6.1 Alertas | 02/10 | 3,5 | 3,5 | 5,0 |
| 7.1 Responsividade | 03/10 | 4,5 | 4,5 | 6,0 |
| 7.2 Roteiro de aceite | 04/10 | 3,5 | 3,5 | 2,0 |
| 7.3 Correções e ensaio | 05/10 | 2,5 | 2,5 | 5,5 |
| 7.4 Conferência e entrega | 06/10 | 1,5 | 1,5 | 1,5 |
| **Entrega 1** | | **67,6** | **67,6** | **74,5** |
| M2.1 Base e veículos | 30/11 | 8,5 | 8,5 | 8,5 |
| M2.2 Itens, serviços e alertas | 30/11 | 8,0 | 8,0 | 1,0 |
| M2.3 JWT | 30/11 | 4,0 | 4,0 | 4,0 |
| M2.4 Carga inicial | 30/11 | 3,0 | 3,0 | 2,5 |
| M2.5 Integração e aceite | 30/11 | 6,0 | 6,0 | 9,0 |
| **Marco 2** | | **29,5** | **29,5** | **25,0** |
| **Projeto** | | **97,1** | **97,1** | **99,5** |

Os pacotes 3.1, 4.1, 5.1 e 5.2 aparecem separados porque o `horas-dev.md` de 23/11 dividiu as horas do commit `0d6897a` por pacote.

## 3. Previsão e orçamento

| Premissa | ENT (h) | EPT (h) | VAC (h) |
| --- | --: | --: | --: |
| 1. O IDC atual se mantém | 99,5 | 0,0 | −2,4 |
| 2. Desvio pontual; o restante segue o orçamento | 99,5 | 0,0 | −2,4 |
| 3. CR + ETC (ETC de 1,0 h em 1.2) | 100,5 | 1,0 | −3,4 |
| 3b. Igual à 3, com as horas pré-baseline | 109,0 | 1,0 | −11,9 |

| Balanço (h) | Valor |
| --- | --: |
| BAC aprovado (Entrega 1 + Marco 2) | 97,1 |
| BAC + contingência (16,2 h) | 113,3 |
| Orçamento autorizado (+ reserva de gerenciamento de 7,0 h) | 120,3 |
| Horas consumidas, com pré-baseline | 108,0 |
| Horas por fazer (ETC) | 1,0 |
| Projeção total (ENT) | 109,0 |
| Desvio sobre o BAC (ENT − BAC) | +11,9 |
| Folga sobre BAC + contingência | +4,3 |
| Folga sobre o orçamento autorizado | +11,3 |

**Uso da contingência.** Pelo CR oficial (sem pré-baseline), o excedente sobre o BAC é de 2,4 h e o saldo da contingência é de 13,8 h. Contando as 8,5 h pré-baseline, o excedente é de 10,9 h e o saldo é de 5,3 h; esse excedente passa da tolerância de 8,4 h do Plano §2 e iria ao patrocinador. O IDPT é "orçamento esgotado": o CR já superou o BAC.

## 4. Sensibilidade

| Cenário | VA (h) | CR (h) | IDP | IDC |
| --- | --: | --: | --: | --: |
| Oficial | 97,1 | 99,5 | 1,00 | 0,98 |
| 10,0 h de correção da Entrega 1 não apontadas entram no CR | 97,1 | 109,5 | 1,00 | 0,89 |
| Horas pré-baseline entram no CR | 97,1 | 108,0 | 1,00 | 0,90 |
| 69,2 h informadas pela GPTI em 25/11 entram por cima, em 1.2 (não adotado) | 97,1 | 168,7 | 1,00 | 0,58 |
| 69,2 h informadas em 25/11 substituem as 26,0 h do SR3 (não adotado) | 97,1 | 142,7 | 1,00 | 0,68 |
| D2, commit de 05/10, em 16 h (piso da faixa informada) | 97,1 | 97,5 | 1,00 | 1,00 |
| D2, commit de 05/10, em 22 h (teto da faixa do horas-dev.md) | 97,1 | 103,5 | 1,00 | 0,94 |
| Verificação de G2 não reconhecida (Marco 2 com VA 0) | 67,6 | 99,5 | 0,70 | 0,68 |

## 5. Horas por pessoa

| Pessoa | Entrega 1 (h) | Marco 2 (h) | Pré-baseline (h) | Total (h) | Planejado E1 (h) | Desvio E1 (h) |
| --- | --: | --: | --: | --: | --: | --: |
| D1 | 27,5 | 8,5 | 8,5 | 44,5 | 15,0 | +12,5 |
| D2 | 19,0 | 9,0 | 0,0 | 28,0 | 15,0 | +4,0 |
| D3 | 2,0 | 7,5 | 0,0 | 9,5 | 15,0 | −13,0 |
| GP | 6,0 | 0,0 | 0,0 | 6,0 | 4,5 | +1,5 |
| G2 | 5,0 | 0,0 | 0,0 | 5,0 | 4,5 | +0,5 |
| G3 | 7,5 | 0,0 | 0,0 | 7,5 | 4,5 | +3,0 |
| G4 | 3,0 | 0,0 | 0,0 | 3,0 | 4,5 | −1,5 |
| G5 | 4,5 | 0,0 | 0,0 | 4,5 | 4,5 | 0,0 |
| **Total** | **74,5** | **25,0** | **8,5** | **108,0** | **67,6** | **+6,9** |

D1 responde por 56,7% do CR de desenvolvimento da Entrega 1 e por 54,3% das horas da PSW. Desvio negativo não é economia: indica pacote sem verificação ou hora não registrada.

## 6. Registro de horas (planilha única)

| Data | Pessoa | Pacote | Horas | Evidência | Situação |
| --- | --- | --- | --: | --- | --- |
| 23/09/2026 | D1 | PRE | 6,00 | `b59f1ab` | commit |
| 25/09/2026 | D1 | PRE | 2,50 | `d7e5b6f`, `b75f7c2`, `81e55d3`, `9db6516` | commit |
| 02/10/2026 | D1 | 2.2 | 4,00 | `f48f9a7` | commit |
| 02/10/2026 | D1 | 2.2 | 1,00 | `e65bcd2` | commit |
| 02/10/2026 | D1 | 7.4 | 1,00 | `e87b48a` | commit |
| 02/10/2026 | D1 | 3.1 | 2,50 | `255a20f` | commit |
| 04/10/2026 | D1 | 2.2 | 0,50 | `409ec2e` | commit |
| 04/10/2026 | D1 | 2.2 | 4,00 | `0195f64` | commit |
| 04/10/2026 | D1 | 7.4 | 0,50 | `0711ffd` | commit |
| 04/10/2026 | D1 | 7.1 | 2,50 | `56efc1e` | commit |
| 05/10/2026 | D2 | 2.1 | 1,50 | `0d6897a` | estimada |
| 05/10/2026 | D2 | 3.1 | 2,50 | `0d6897a` | estimada |
| 05/10/2026 | D2 | 4.1 | 3,00 | `0d6897a` | estimada |
| 05/10/2026 | D2 | 5.1 | 4,50 | `0d6897a` | estimada |
| 05/10/2026 | D2 | 5.2 | 2,00 | `0d6897a` | estimada |
| 05/10/2026 | D2 | 6.1 | 1,50 | `0d6897a` | estimada |
| 05/10/2026 | D2 | 7.1 | 1,00 | `0d6897a` | estimada |
| 05/10/2026 | D2 | 7.3 | 2,00 | `0d6897a` | estimada |
| 05/10/2026 | D1 | 2.1 | 3,00 | `ebec85b` | commit |
| 05/10/2026 | D1 | 7.3 | 0,50 | `5c8c674` | commit |
| 06/10/2026 | D1 | 7.3 | 2,00 | `598b1a2` | commit |
| 06/10/2026 | D1 | 7.1 | 2,50 | `8133fd6` | commit |
| 06/10/2026 | D3 | 7.2 | 2,00 | `0c66171` | commit |
| 06/10/2026 | D1 | 6.1 | 1,50 | `d6f0755` | commit |
| 06/10/2026 | D1 | 6.1 | 2,00 | `abe5ea8` | commit |
| 31/10/2026 | D1 | M2.1 | 1,00 | `c86a9b1` | commit |
| 31/10/2026 | D1 | M2.1 | 1,50 | `d3c7d0f` | commit |
| 31/10/2026 | D1 | M2.1 | 1,50 | `cba6a02` | commit |
| 31/10/2026 | D1 | M2.1 | 2,00 | `902f82d` | commit |
| 31/10/2026 | D1 | M2.1 | 1,50 | `47084bc` | commit |
| 31/10/2026 | D1 | M2.1 | 1,00 | `50e654a` | commit |
| 15/11/2026 | D3 | M2.3 | 1,50 | `14946cf` | declarada |
| 15/11/2026 | D3 | M2.5 | 0,50 | `6277490` | declarada |
| 16/11/2026 | D3 | M2.5 | 3,00 | `0f87bf9` | declarada |
| 16/11/2026 | D3 | M2.3 | 2,50 | `4d74ee2` | declarada |
| 23/11/2026 | D2 | M2.2 | 1,00 | PR #12 (24/11) | estimada |
| 23/11/2026 | D2 | M2.4 | 2,50 | PR #12 (24/11) | estimada |
| 23/11/2026 | D2 | M2.5 | 5,50 | PR #12 (24/11) | estimada |
| 23/11/2026 | D2 | 7.3 | 1,00 | PR #12 (24/11) | estimada |
| — | GP | 1.1 | 4,00 | SR2/SR3 | assumida (SR3) |
| — | GP | 1.2 | 2,00 | SR2/SR3 | assumida (SR3) |
| — | G2 | 1.1 | 3,50 | SR2/SR3 | assumida (SR3) |
| — | G2 | 1.2 | 1,50 | SR2/SR3 | assumida (SR3) |
| — | G3 | 1.1 | 4,50 | SR2/SR3 | assumida (SR3) |
| — | G3 | 1.2 | 3,00 | SR2/SR3 | assumida (SR3) |
| — | G4 | 1.1 | 1,50 | SR2/SR3 | assumida (SR3) |
| — | G4 | 1.2 | 1,50 | SR2/SR3 | assumida (SR3) |
| — | G5 | 1.1 | 2,00 | SR2/SR3 | assumida (SR3) |
| — | G5 | 1.2 | 2,50 | SR2/SR3 | assumida (SR3) |
| 16/11/2026 | D1 | M2.5 | — | `0d53733` | **PENDENTE** |
| 23/11/2026 | D1 | a definir | — | CHANGELOG 23/11 | **PENDENTE** |
| 23/11/2026 | D1 | M2.3 | — | CHANGELOG 23/11; PR #12 | **PENDENTE** |
| 23/11/2026 | D1 | M2.5 | — | CHANGELOG 23/11; PR #12 | **PENDENTE** |
| 23/11/2026 | D1 | M2.2 | — | CHANGELOG 23/11; PR #12 | **PENDENTE** |
| | | **Total** | **108,00** | | |

Horas da PSW reconstituídas por commit e conferidas com os registros de D1 e D3; as de D2 são estimativas retrospectivas (D2 informou 16–18 h para o commit de 05/10, e o `horas-dev.md` cita 16–22 h e adota 18,0 h). As horas da GPTI são as assumidas no SR3, por decisão do grupo.

## 7. Premissas e limitações

- **BAC:** Entrega 1 = 67,6 h (45,0 h de desenvolvimento + 22,6 h de gestão); Marco 2 = 29,5 h (CR-02); projeto = 97,1 h. Contingência (16,2 h) e reserva de gerenciamento (7,0 h) ficam fora do BAC.
- **VP:** o pacote entra quando o fim planejado (cronograma v1.1) é menor ou igual à data de status. Marco 2: aceite previsto para 30/11/2026 (o SR3 adotou 02/11 como premissa interna).
- **CR:** soma das horas do registro por pacote; as horas pré-baseline ficam fora do CR oficial.
- **Horas pendentes (D1):** as horas de 16/11 (commit `0d53733`, ajuste do workflow do Pages) e de 23/11 (M2.2, M2.3, M2.5 e revisão) ainda não foram declaradas. Enquanto estiverem em branco, o CR do Marco 2 está subestimado.
- **Horas estimadas (D2):** 18,0 h do commit de 05/10 (maior valor da faixa informada por D2) e 10,0 h de 23/11, estimadas e não declaradas. A 1,0 h de documentação de 23/11 está registrada no pacote 7.3, como no `horas-dev.md`, embora descreva documentação do Marco 2.
- **Sobreposição possível:** D1 e D2 descrevem trabalho parecido em M2.5 no PR #12; confirmar para não contar duas vezes.
- **Horas da GPTI:** assumidas (26,0 h), não medidas em tempo real. Os integrantes informaram 69,2 h em 25/11, que não entraram no resultado oficial (ver sensibilidade).
- **ISS-08:** as 10,0 h de correção da Entrega 1 (2.1, 2.2, 7.1 a 7.4) não foram apontadas por ninguém.
- **ISS-15:** o GitHub Pages (`e87b48a`, 1,0 h; `0d53733`, a confirmar) é visualização complementar e não altera o escopo local do Termo.

Fontes: Plano do Projeto v1.2 (§7, §8, §11), Dicionário da EAP, Status Reports 2 e 3, `mudancas/horas-dev.md`, `mudancas/CHANGELOG.md` (até 23/11/2026) e mensagens do grupo.