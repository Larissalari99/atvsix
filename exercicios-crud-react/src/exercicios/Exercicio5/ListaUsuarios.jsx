import { idItem } from '../../api.js'

function ListaUsuarios({
  usuarios,
  carregando,
  erro,
  excluindoId,
  erroExclusao,
  onEditar,
  onExcluir,
}) {
  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>

  return (
    <div>
      {erroExclusao && <p>Erro ao excluir: {erroExclusao}</p>}
      <ul>
        {usuarios.map((u) => (
          <li key={idItem(u)}>
            {u.name} - {u.email}{' '}
            <button onClick={() => onEditar(u)}>Editar</button>{' '}
            <button onClick={() => onExcluir(u)} disabled={excluindoId === idItem(u)}>
              {excluindoId === idItem(u) ? 'Excluindo...' : 'Excluir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaUsuarios
