# Manual de operação

## Iniciar o ambiente

1. Instale o projeto conforme o [manual de instalação](manual-instalacao.md).
2. Execute `npm start` na raiz.
3. Confirme que o Vite e o json-server iniciaram sem mensagens de erro.
4. Abra a URL do Vite no navegador.

## Fluxo recomendado para demonstração

1. No **Painel**, selecione um dos veículos iniciais.
2. Consulte os cards de manutenção e identifique um item próximo ou vencido.
3. Abra **Garagem** e atualize o odômetro com uma quilometragem maior.
4. Abra **Serviço**, escolha o item e informe tipo, data, quilometragem, valor
   e oficina.
5. Confirme o registro e consulte **Custos** e o histórico.
6. Troque o veículo no seletor e confirme que seus dados não foram misturados.

## Operação dos dados

- A API persiste alterações em `mock/db.json`.
- A seed não deve ser editada para registrar uso diário.
- Use `npm run reset` somente quando precisar recomeçar a demonstração.
- Não execute dois mocks na mesma porta.
- Se a API cair, reinicie `npm start`; a interface exibirá uma ação de nova
  tentativa.

## Estados e falhas

- **Carregando:** aguarde a primeira consulta.
- **Dados indisponíveis:** verifique o json-server e tente novamente.
- **Nenhum veículo/item/serviço:** cadastre ou use a seed restaurada.
- **Falha ao salvar:** leia a mensagem do formulário e confira o histórico
  antes de repetir uma operação.
- **Demonstração:** indica que o Pages está usando dados em memória, sem
  persistência.

## Conferência antes da entrega

```powershell
npm test
npm run build
git --no-pager status
git --no-pager log --oneline --decorate -20
```

O diretório `frontend/dist` é gerado pelo build e não precisa ser commitado.

