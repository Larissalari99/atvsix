import { useEffect, useState } from 'react'
import { URL_USUARIOS, HEADERS_JSON } from '../api.js'

function Exercicio3() {
  const [usuarios, setUsuarios] = useState([])
  const [editando, setEditando] = useState(null) // usuário em edição
  const [form, setForm] = useState({ name: '', email: '' })

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
      console.log(`Usuário ${id} excluído`)
    }
  }

  function abrirEdicao(usuario) {
    setEditando(usuario)
    setForm({ name: usuario.name, email: usuario.email })
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()
    const resposta = await fetch(`${URL_USUARIOS}/${editando.id}`, {
      method: 'PUT',
      headers: HEADERS_JSON,
      body: JSON.stringify({ ...editando, ...form }),
    })
    // Usa a resposta do PUT (não o estado do form) para atualizar a lista
    const atualizado = await resposta.json()
    setUsuarios((atual) =>
      atual.map((u) => (u.id === atualizado.id ? atualizado : u))
    )
    setEditando(null)
  }

  return (
    <div>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}{' '}
            <button onClick={() => abrirEdicao(u)}>Editar</button>{' '}
            <button onClick={() => excluirUsuario(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      {editando && (
        <form onSubmit={salvar}>
          <h3>Editando usuário {editando.id}</h3>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" />{' '}
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />{' '}
          <button type="submit">Salvar</button>{' '}
          <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
        </form>
      )}
    </div>
  )
}

export default Exercicio3
