# Integração com json-server e TanStack Query — 04/10/2026

## Contrato atual

- API padrão: http://127.0.0.1:3001, configurável por VITE_API_URL.
- GET /vehicles, /maintenanceItems e /serviceRecords carregam a base validada.
- POST /vehicles cadastra; PATCH /vehicles/:id atualiza odômetro.
- Serviço valida dados recentes, incrementa odômetro se necessário e faz POST /serviceRecords.
- useAutoCuida retorna comandos assíncronos; as telas aguardam a resposta.
- TanStack Query centraliza cache, cancelamento, mutações e invalidação após sucesso ou erro.
- Respostas confirmadas atualizam o cache; falha na reconsulta exibe aviso sem apagar dados.
- Nenhuma gravação tem repetição automática. Falha de API nunca ativa o demo.
- VITE_DATA_MODE=demo mantém a prévia do Pages em memória, com aviso visível.
- mock/seed.json é a fonte inicial; npm start cria db.json somente quando ausente.
- npm run reset, com o mock parado, descarta a base local e restaura a seed.

## Verificações

Validação concluída: 25 testes de frontend e 6 testes HTTP aprovados.
Builds de API e demo aprovados. Reinício preservou db.json e reset restaurou a seed.
O build demo foi aberto no navegador com mock desligado e exibiu o aviso de sessão.
Para repetir os testes automatizados: executar npm test em frontend/ e mock/.
A suíte HTTP usa json-server real em porta livre e arquivos temporários isolados.
Cobre persistência em arquivo, leitura em nova sessão, validação contra dados
atuais, isolamento entre veículos, retroativos, custos e falhas de PATCH/POST.
Também cobre perda de resposta após gravação, sem repetição do POST.
A suíte de frontend cobre cancelamento, falhas HTTP/rede/JSON, sincronização de
cache e recuperação após falha de reconsulta, além das regras existentes.

Navegador local: cadastro de veículo com seleção automática; odômetro preservado
após recarregar; serviço confirmado; histórico e custos preservados após recarregar.
Com mock desligado, o formulário exibiu erro e manteve valor/oficina preenchidos.

## Limites

json-server 0.17.4 foi fixado para evitar mudanças da linha beta.
O mock não tem transações: o odômetro pode ser salvo e o serviço falhar depois.
A mensagem informa essa situação e orienta conferir o histórico antes de repetir.
Validações no cliente não garantem exclusividade entre vários clientes simultâneos.
React Hook Form, Zod, framework responsivo e funcionalidades restantes são etapas seguintes.
Nenhum documento de GPTI foi alterado.
