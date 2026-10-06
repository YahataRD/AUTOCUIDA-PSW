# Manual de operação — AutoCUIDA

Revisão: 06/10/2026. Destinado à pessoa que inicia o ambiente e conduz a avaliação. Para ações nas telas, consulte o [manual do usuário](manual-usuario.md).

## Iniciar e encerrar

1. Instale conforme o [manual de instalação](manual-instalacao.md).
2. Na raiz do repositório, execute npm start (ou npm.cmd start no PowerShell com scripts bloqueados).
3. Confirme logs de Vite e json-server e abra http://localhost:5173/AUTOCUIDA-PSW/ ou a URL impressa pelo Vite.
4. Confira que o modo é API local e que os veículos da seed aparecem. O Pages usa demo em memória e não serve para demonstrar persistência HTTP.
5. Use Ctrl+C no terminal para encerrar os dois processos. Pare a execução de desenvolvimento antes de usar npm run preview.

## Preservar ou restaurar dados

As operações são gravadas em mock/db.json. Para backup, pare o ambiente e copie esse arquivo para um local identificado. Para restaurar o backup, com os processos parados, copie-o de volta para mock/db.json. Mantenha a estrutura das três coleções e confira os vínculos; o frontend rejeita uma base inválida.

Para descartar as alterações e usar os exemplos oficiais, execute npm run reset com os serviços parados. A seed [mock/seed.json](../mock/seed.json) permanece intacta. Não rode duas instâncias na porta 3001.

## Roteiro reproduzível de demonstração

Os valores seguintes usam a seed e a data **06/10/2026**. Em outras datas, use a data real do serviço e considere a janela móvel de seis meses.

1. Abra Custos do Golf: total R$ 2.200,00, quatro serviços, preventivas R$ 950,00 e corretivas R$ 1.250,00. A média da janela maio–outubro é R$ 20,00.
2. Selecione Onix: apenas um item e nenhum serviço/custo. Volte ao Golf para demonstrar isolamento.
3. Na Garagem, atualize o odômetro do Golf de 48.250 para **50.000 km**. O Filtro de Ar chega a 100% por km e fica Vencido. O Óleo também continua vencido.
4. Em Serviço, registre manutenção preventiva do **Filtro de Ar**, data **06/10/2026**, km **50.000**, valor **100,00**, oficina **Oficina de demonstração**.
5. Consulte Custos: total R$ 2.300,00, cinco registros e preventivas R$ 1.050,00. No Painel, o filtro passa a usar o novo serviço como referência; não prometa que todo o veículo ficou sem alertas.
6. Edite o valor desse serviço para 150,00: total R$ 2.350,00. Cancele uma tentativa de exclusão para demonstrar preservação; depois confirme a exclusão do mesmo registro: total volta a R$ 2.200,00 e odômetro permanece 50.000 km.
7. Demonstre cadastro de outro veículo válido, seu estado sem itens, inclusão de item e validação de campo vazio. Use somente dados de demonstração.
8. Mostre a [matriz de pendências](entrega-avaliacao.md), a [verificação](testes/verificacao-final.md) e os [commits reais](historico-contribuicoes.md).

Este roteiro é instrução para apresentação; não é declaração de que todos os passos foram reexecutados manualmente nesta revisão. A evidência efetivamente obtida está no registro de verificação.

## Falhas e recuperação

| Sinal | Procedimento |
| --- | --- |
| Carregando | Aguarde a consulta inicial. |
| Dados indisponíveis | Verifique o mock e a URL da API, reinicie os serviços se necessário e use Tentar novamente. |
| Nenhum veículo/item/serviço | Cadastre o recurso ou restaure a seed se a intenção for reiniciar a demonstração. |
| Campo inválido | Corrija o campo indicado; não apague o JSON para contornar validação. |
| Falha ao salvar | Confira mensagem, odômetro e histórico antes de reenviar. Um PATCH pode ter sido concluído antes de um POST/PUT falhar. |
| Edição de serviço de item removido bloqueada | Registre a limitação P03; não reassocie o serviço a outro item para aparentar correção. |
| Alerta temporal discordante | Apresente P02 como limitação conhecida. |

## Conferência técnica

~~~bash
npm test
npm run build
npm run preview
~~~

O build vai para frontend/dist/; a prévia serve esse build junto ao mock, normalmente na porta 4173. Não versione dist, node_modules ou db.json. Os testes HTTP usam arquivo temporário e não modificam a base de uso. O relatório de 06/10 registra 47 testes aprovados e build aprovado; isso não substitui o aceite completo T01–T23.
