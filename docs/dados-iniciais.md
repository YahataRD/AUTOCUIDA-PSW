# Dados iniciais para o json-server

A fonte versionada é [mock/seed.json](../mock/seed.json), fornecida sem alteração nesta entrega. mock/prepare-db.js cria mock/db.json somente quando ele não existe. Reiniciar o servidor preserva a cópia de trabalho; npm run reset a substitui pela seed.

## Conteúdo

| Coleção | Quantidade | Conteúdo |
| --- | ---: | --- |
| vehicles | 2 | Golf TSI 1.4, BRA-2E24, 48.250 km; Onix 1.0, ABC-1D23, 22.000 km |
| maintenanceItems | 5 | Quatro itens do Golf e óleo do Onix; todos ativos |
| serviceRecords | 4 | Quatro serviços do Golf; Onix sem serviços |

IDs e vínculos são strings. vehicleId liga itens/serviços ao veículo e maintenanceItemId liga serviço ao item. initialReference guarda data e km iniciais. active:false mantém o objeto para histórico, retirando-o da seleção ativa. Valores monetários são números em reais; datas usam YYYY-MM-DD. A coleção de alertas não existe: eles são calculados pelo frontend.

## Operação

~~~bash
npm ci
npm start
~~~

Executar na raiz do repositório. A API responde em http://127.0.0.1:3001/vehicles, /maintenanceItems e /serviceRecords. O frontend usa essa URL por padrão. Se estiver usando uma cópia externa do JSON com json-server 0.17.4, preserve essas três coleções e a porta/configuração da API.

Para começar de novo, pare os serviços, copie mock/db.json para um backup se necessário e execute npm run reset. Não use reset para salvar operações diárias. Não entregue db.json como fonte oficial: a seed é estável, enquanto db.json contém mudanças locais.

## Valores para conferir a demonstração

Com a seed sem alterações, Golf tem **R$ 2.200,00** em 4 serviços: R$ 950,00 preventivos e R$ 1.250,00 corretivos. Em **06/10/2026**, o período móvel do gráfico é maio–outubro/2026, com R$ 120,00 e média de R$ 20,00; o total geral inclui serviços fora dessa janela. Onix tem R$ 0,00 e nenhum serviço.

Os alertas mudam conforme a data e o odômetro. Não alterar a seed para esconder as pendências de calendário. Para um roteiro determinístico em 06/10/2026, consulte o [manual de operação](manual-operacao.md).
