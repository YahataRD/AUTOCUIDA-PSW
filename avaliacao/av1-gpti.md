# Correção da AV1 — GPTI — AutoCUIDA

Repositório: https://github.com/YahataRD/AUTOCUIDA-PSW

Artefatos: `docs/GPTI/01-bussiness-case.md`, `docs/GPTI/02-termo-de-abertura.md`, `docs/GPTI/03-plano-do-projeto.md`, `docs/GPTI/04-dicionario-da-eap.md`.

A nota é do grupo de GPTI e vale para cada aluno do grupo. Nesta etapa, a ausência de commit não zera ninguém. O nome na atividade do cronograma é o contrato da etapa seguinte: se a responsabilização não for cumprida, a nota daquela pessoa pode ir a zero. A especificação de referência é `docs/prototipagem.md` e `docs/refinamento-prototipagem.md`. O exemplo da matrícula entra como molde.

| Aluno | Nota |
| --- | ---: |
| Patrick Cruz Azevedo | 73 |
| Hugo Lima de Almeida Antunes Aguiar | 73 |
| Ronald Teixeira de Assis | 73 |
| Rodrigo Americo Nascimento D'Icarahy | 73 |
| Thiago Souza da Silva | 73 |

## Parte comum — 73/100

| Parte | Nota |
| --- | ---: |
| Business case | 9/10 |
| Termo de abertura | 13/15 |
| Escopo e EAP | 12/15 |
| Cronograma com nomes | 8/25 |
| Custo, partes e riscos | 14/15 |
| Dicionário da EAP | 13/15 |
| Um projeto só | 4/5 |

### Business case — 9/10

O caso segue o molde das seções de problema, alternativas e ordem de grandeza, sobre o AutoCUIDA. A alternativa A é continuar no papel, a B é Drivvo ou Mobills, a C é o protótipo, com recomendação da C. VPL e TIR ficam de fora porque não há receita, e a economia de 30% está marcada como hipótese de implantação futura. O esforço de 83,8 h, a contingência de 16,2 h e o desembolso de R$ 0,00 são os mesmos do plano.

Desconto:

- 1 ponto. A seção 5 deixa API e banco fora do escopo e descreve dados em memória. A prototipagem realiza veículo, item e serviço na API local do json-server, e o refinamento registra que essa API persiste entre sessões.

### Termo de abertura — 13/15

O termo nomeia o patrocinador, o gerente Patrick Cruz Azevedo e as duas equipes. Os objetivos cobrem veículo, plano de manutenção, odômetro, serviço, alerta e custos. O dentro e o fora repetem autenticação, notificação e oficina, que a prototipagem também deixa de fora. Há marcos, premissas e a tabela de aprovação.

Descontos:

- 1 ponto. A seção 3 põe API e banco fora e diz que as informações ficam no estado do front-end. É a mesma fronteira da seção 5 do business case, contra o json-server da especificação.
- 1 ponto. A seção 8 escreve o orçamento como 83,8 horas por pessoa. O business case e o plano usam 83,8 horas no total da linha de base.

### Escopo e EAP — 12/15

Os requisitos separam necessidade e solução. Veículo, item, serviço, alerta e custos estão na matriz, com os casos UC01–UC16 da prototipagem. A regra dos alertas é a da especificação: o maior desgaste entre km e tempo, Em dia abaixo de 80%, Próximo de 80% a menos de 100%, Vencido a partir de 100%. A EAP é de entregas, com gestão e produto, e o código de cada folha volta no dicionário. Perfil de gestor de frota permanece pendente, e a prototipagem limita a AV1 ao proprietário, sem login.

Desconto:

- 3 pontos. REQ-14 e o pacote 2.2 descrevem carga de JSON local, sem API. A especificação liga item e serviço ao veículo pela API do json-server.

### Cronograma com nomes — 8/25

A seção 7 tem duração, predecessora, caminho crítico e folga. O caminho 2.1/2.2 → 4.1/5.1 → 6.1/5.2 → 7.1 → 7.2 → 7.3 → 7.4 está desenhado, e 3.1 e 1.1 têm um dia de folga. Essa rede sustenta os 8 pontos.

Desconto:

- 17 pontos. As atividades por pacote não têm responsável, predecessora nem horas da pessoa. Não há a lista de gestão no molde de G01 em diante, nem a alocação semanal em que cada célula é um aluno, uma tarefa e as horas. A seção 11 e a RAM dão nome ao pacote. Isso não substitui o nome na atividade. Para a etapa seguinte, o que se consegue cobrar é o dono do pacote no dicionário, não uma tarefa de uma semana.

### Custo, partes e riscos — 14/15

O orçamento separa 67,6 h de trabalho, 16,2 h de contingência e 7,0 h de reserva de gestão, com a reserva fora da linha de base. As partes têm poder, interesse, impacto e estratégia. A cadência está na tabela de comunicação. Os riscos R1 a R7 têm causa no plano, probabilidade, impacto e resposta. R8 é oportunidade. A contingência de cada risco soma as 16,2 h.

Desconto:

- 1 ponto. O status diário da gerência está atribuído a D1–D3 em bloco. A tabela de siglas existe, e a mensagem do dia não tem um nome.

### Dicionário da EAP — 13/15

Cada folha da EAP tem aceite observável e um A. Os nomes são os da seção 11. Placa única, odômetro que só avança, remoção de item com histórico preservado e a régua 79,9% / 80% / 99,9% / 100% repetem a prototipagem. O exemplo de custos, R$ 100 e R$ 50 no mesmo mês, é observável.

Descontos:

- 1 ponto. O aceite de 2.2 observa a carga do JSON local. A especificação observa o registro que continua depois de reiniciar a API.
- 1 ponto. O aceite de 1.1 pede os quatro artefatos em `docs/av1/`. Eles estão em `docs/GPTI/`.

### Um projeto só — 4/5

Caso, termo, plano e dicionário tratam do AutoCUIDA, com os mesmos códigos e as mesmas exclusões de autenticação, notificação e oficina. Os cinco nomes de GPTI e os três de PSW são os mesmos nos quatro arquivos.

Desconto:

- 1 ponto. O termo mede 83,8 horas por pessoa. Os outros três documentos medem 83,8 horas no total.

## O que esta nota deixa para a etapa seguinte

A responsabilização que existe hoje é por pacote, no dicionário e na RAM.

| Pacote | Presta contas |
| --- | --- |
| 1.1, 1.2, 7.3, 7.4 | Patrick Cruz Azevedo |
| 4.1, 5.2, 6.1 | Gabriel Felipe Martins da Silva |
| 2.2, 3.1 | Rafael Duarte Yahata |
| 2.1, 5.1 | Rafael Voigt Villas Boas |
| 7.1, 7.2 | Hugo Lima de Almeida Antunes Aguiar |

Ronald Teixeira de Assis, Rodrigo Americo Nascimento D'Icarahy e Thiago Souza da Silva executam gestão em 1.1 e 1.2 e não prestam contas de um pacote. Sem a semana e a tarefa no nome de cada um, a etapa seguinte não tem, no cronograma, o que cobrar deles além dessa execução genérica.
