# Testes unitários do back-end de reservas

## Escopo

O projeto originalmente era somente uma landing page: o formulário preparava uma mensagem para WhatsApp e não existia back-end. Para tornar este desafio aplicável, foi acrescentada uma API Node.js independente em `POST /api/reservas`; em desenvolvimento, o Vite encaminha as chamadas `/api` para a API. A API valida e registra reservas em memória durante a execução do servidor; os dados são perdidos quando o processo reinicia e não devem ser tratados como armazenamento de produção.

As regras de negócio ficam isoladas em `server/reservations.cjs`. Os testes usam `node:test`, o runner nativo do Node.js, e não dependem de serviços externos nem de banco de dados.

## Casos planejados

| Caso | Funcionalidade | Cenário e entrada | Resultado esperado |
| --- | --- | --- | --- |
| CT01 | Validação | Nome/e-mail/mensagem válidos, com espaços e e-mail em maiúsculas | Aceitar, remover espaços externos e normalizar e-mail para minúsculas |
| CT02 | Campo obrigatório | Nome vazio ou só com espaços | Rejeitar com erro no campo nome |
| CT03 | E-mail | E-mail ausente ou em formato inválido | Rejeitar com mensagem correspondente ao tipo de erro |
| CT04 | Limite do nome | Nome com 101 caracteres | Rejeitar; limite é 100 caracteres |
| CT05 | Limite da mensagem | Mensagem com 1001 caracteres | Rejeitar; limite é 1000 caracteres |
| CT06 | Formato de entrada | Valor `null` em vez de objeto | Rejeitar como entrada inválida |
| CT07 | Criação de reserva | Dados válidos e relógio/ID controlados pelo teste | Retornar ID, estado `received` e data previsível |
| CT08 | API de reservas | `POST` com reserva válida | Responder HTTP 201 e retornar dados normalizados |
| CT09 | API de reservas | `POST` com nome vazio e e-mail inválido | Responder HTTP 422 e listar erros de validação |
| CT10 | API de reservas | `POST` com JSON malformado | Responder HTTP 400 |
| CT11 | API de reservas | `GET` no endpoint de criação | Responder HTTP 405 e informar `Allow: POST` |

## Execução

```bash
npm test
```

Resultado da última execução: 11 testes passaram, 0 falharam. Para iniciar interface e API localmente, use `npm run dev`; o formulário envia os dados ao endpoint e só apresenta confirmação depois de receber HTTP 201. A confirmação também oferece um link para concluir o contato via WhatsApp.

## Análise e reflexão

1. Os testes garantem a validação e normalização dos dados antes de criar uma reserva, além dos códigos e formatos de resposta da API.
2. Um teste inicial mostrou que e-mail ausente e e-mail malformado têm mensagens diferentes. A implementação estava coerente; o cenário foi refinado para verificar as duas regras.
3. Foram verificadas as regras de obrigatoriedade de nome/e-mail, formato de e-mail, limites de tamanho, normalização dos campos, estado inicial da reserva e métodos/formato aceitos pelo endpoint.
4. Em uma próxima etapa, devem receber testes a persistência real em banco, prevenção de reservas duplicadas, disponibilidade de horários, regras de cancelamento e integração com o provedor de WhatsApp. Essas funções ainda não existem neste MVP.

## Evidência

A execução de `npm test` concluiu com 11 testes aprovados e 0 falhas. Também foi verificado manualmente o endpoint integrado: reserva válida respondeu HTTP 201 e dados inválidos responderam HTTP 422. Para gerar uma captura de tela de entrega, execute `npm test` em um terminal visível e capture a listagem dos 11 casos e o resumo `pass 11 / fail 0`.