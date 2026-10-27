import { useState } from 'react'

// Formulário com estado único (um objeto) para os dois campos.
function FormUsuario({ modo, inicial, salvando, erro, onSalvar, onCancelar }) {
  const [dados, setDados] = useState({
    name: inicial?.name ?? '',
    email: inicial?.email ?? '',
  })

  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSalvar(dados)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{modo === 'novo' ? 'Novo usuário' : 'Editar usuário'}</h3>
      <input name="name" value={dados.name} onChange={handleChange} placeholder="Nome" required />{' '}
      <input name="email" type="email" value={dados.email} onChange={handleChange} placeholder="Email" required />{' '}
      <button type="submit" disabled={salvando}>
        {salvando ? 'Salvando...' : 'Salvar'}
      </button>{' '}
      <button type="button" onClick={onCancelar} disabled={salvando}>
        Cancelar
      </button>
      {erro && <p>Erro: {erro}</p>}
    </form>
  )
}

export default FormUsuario
