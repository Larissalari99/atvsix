import { useEffect, useState } from 'react'
import { URL_USUARIOS } from '../api.js'

function Exercicio1() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    async function carregarUsuarios() {
      const resposta = await fetch(URL_USUARIOS)
      const dados = await resposta.json()
      setUsuarios(dados)
    }
    carregarUsuarios()
  }, [])

  async function excluirUsuario(id) {
    const resposta = await fetch(`${URL_USUARIOS}/${id}`, { method: 'DELETE' })
    if (resposta.ok) {
      setUsuarios((atual) => atual.filter((u) => u.id !== id))
    }
  }

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>
          {u.name} - {u.email}{' '}
          <button onClick={() => excluirUsuario(u.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  )
}

export default Exercicio1
