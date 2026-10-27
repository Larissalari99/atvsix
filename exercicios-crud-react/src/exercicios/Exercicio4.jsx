import { useEffect, useState } from 'react'
import { URL_USUARIOS, HEADERS_JSON, requisicao } from '../api.js'

function Exercicio4() {
  const [usuarios, setUsuarios] = useState([])
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [erro, setErro] = useState(null)
  const [forcarErro, setForcarErro] = useState(false)

  // Com "forçar erro" marcado, as requisições vão para uma URL inexistente (404)
  const base = forcarErro ? `${URL_USUARIOS}-inexistente` : URL_USUARIOS

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const dados = await requisicao(URL_USUARIOS)
        setUsuarios(dados)
      } catch (e) {
        setErro(e.message)
      }
    }
    carregarUsuarios()
  }, [])

  async function excluirUsuario(id) {
    const anterior = usuarios // guarda a lista para o rollback
    setErro(null)
    setUsuarios((atual) => atual.filter((u) => u.id !== id)) // remove já
    try {
      await requisicao(`${base}/${id}`, { method: 'DELETE' })
      console.log(`Usuário ${id} excluído`)
    } catch (e) {
      setUsuarios(anterior) // rollback
      setErro(e.message)
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
    const anterior = usuarios
    const editado = { ...editando, ...form }
    setErro(null)
    setUsuarios((atual) => atual.map((u) => (u.id === editado.id ? editado : u)))
    setEditando(null)
    try {
      const atualizado = await requisicao(`${base}/${editado.id}`, {
        method: 'PUT',
        headers: HEADERS_JSON,
        body: JSON.stringify(editado),
      })
      setUsuarios((atual) =>
        atual.map((u) => (u.id === atualizado.id ? atualizado : u))
      )
    } catch (e) {
      setUsuarios(anterior) // rollback
      setErro(e.message)
    }
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={forcarErro}
          onChange={(e) => setForcarErro(e.target.checked)}
        />{' '}
        Forçar erro (URL inexistente)
      </label>

      {erro && <p>Erro: {erro}</p>}

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

export default Exercicio4
