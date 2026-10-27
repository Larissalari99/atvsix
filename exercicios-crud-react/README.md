# Exercícios CRUD com fetch (React + Vite)

Exercícios de DELETE, PUT e POST usando `fetch` com `async/await`.
API usada: https://jsonplaceholder.typicode.com/users (não precisa de chave).

## Como rodar

```bash
npm install
npm run dev
```

Use os botões no topo para trocar de exercício.

## Exercícios

| # | Arquivo | O que faz |
|---|---------|-----------|
| 1 | `Exercicio1.jsx` | `excluirUsuario(id)` com DELETE + `filter` |
| 2 | `Exercicio2.jsx` | Igual ao 1, com `console.log("Usuário X excluído")` |
| 3 | `Exercicio3.jsx` | Botão Editar, formulário e PUT com `map` usando a resposta |
| 4 | `Exercicio4.jsx` | `try/catch` e rollback. Marque "Forçar erro" para testar |
| 5 | `Exercicio5/` | CRUD completo (POST/PUT/DELETE) com `AbortController` |

## Observações

- A JSONPlaceholder é uma API de teste: ela responde como se tivesse salvo, mas **nada é gravado de verdade**. Ao recarregar a página, a lista volta ao original.
- Por isso, um usuário criado com POST (sempre volta com id 11) não existe de verdade no servidor. Editar esse usuário pode retornar erro 500, e o tratamento de erro do programa mostra a mensagem.
- O `fetch` não lança erro em respostas 404/500. A função `requisicao` em `src/api.js` confere `response.ok` e lança o erro, para o `try/catch` funcionar.
- Para ver o `AbortController` no Exercício 5: abra o DevTools (Network), clique em "Exercício 5" e troque de exercício rapidamente. Requisições em andamento aparecem como `(canceled)`.
