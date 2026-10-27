export const URL_USUARIOS = 'https://jsonplaceholder.typicode.com/users'

export const HEADERS_JSON = { 'Content-Type': 'application/json' }

// O fetch NÃO lança erro quando o servidor responde 404 ou 500.
// Esta função confere response.ok e lança o erro manualmente,
// para que o try/catch funcione nesses casos também.
export async function requisicao(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes)
  if (!resposta.ok) {
    throw new Error(`Falha na requisição (status ${resposta.status})`)
  }
  return resposta.json()
}

// Identificador único de cada item da lista.
// Itens criados com POST ganham "chave" própria, porque a API de teste
// devolve sempre o mesmo id (11) para qualquer usuário novo.
export const idItem = (usuario) => usuario.chave ?? usuario.id
