import { useEffect, useRef, useState } from 'react'
import { URL_USUARIOS, HEADERS_JSON, requisicao, idItem } from '../../api.js'
import ListaUsuarios from './ListaUsuarios.jsx'
import FormUsuario from './FormUsuario.jsx'

function App() {
  const [usuarios, setUsuarios] = useState([])

  // loading/erro separados por operação
  const [carregando, setCarregando] = useState(true)
  const [erroLista, setErroLista] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [erroForm, setErroForm] = useState(null)
  const [excluindoId, setExcluindoId] = useState(null)
  const [erroExclusao, setErroExclusao] = useState(null)

  // null | { modo: 'novo' } | { modo: 'editar', usuario }
  const [formAberto, setFormAberto] = useState(null)

  // Um AbortController por montagem do componente.
  // Ao desmontar (trocar de página), o cleanup cancela tudo que estiver em andamento.
  const controllerRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    controllerRef.current = controller

    async function carregar() {
      try {
        const dados = await requisicao(URL_USUARIOS, { signal: controller.signal })
        setUsuarios(dados)
      } catch (e) {
        if (e.name === 'AbortError') return
        setErroLista(e.message)
      } finally {
        if (!controller.signal.aborted) setCarregando(false)
      }
    }
    carregar()

    return () => controller.abort()
  }, [])

  function abrirNovo() {
    setErroForm(null)
    setFormAberto({ modo: 'novo' })
  }

  function abrirEdicao(usuario) {
    setErroForm(null)
    setFormAberto({ modo: 'editar', usuario })
  }

  async function salvarUsuario(dados) {
    const signal = controllerRef.current.signal
    const editando = formAberto.modo === 'editar'
    setSalvando(true)
    setErroForm(null)

    try {
      if (editando) {
        const { chave, ...original } = formAberto.usuario // não envia "chave" à API
        const resposta = await requisicao(`${URL_USUARIOS}/${original.id}`, {
          method: 'PUT',
          headers: HEADERS_JSON,
          body: JSON.stringify({ ...original, ...dados }),
          signal,
        })
        setUsuarios((atual) =>
          atual.map((u) =>
            idItem(u) === idItem(formAberto.usuario) ? { ...resposta, chave } : u
          )
        )
      } else {
        const resposta = await requisicao(URL_USUARIOS, {
          method: 'POST',
          headers: HEADERS_JSON,
          body: JSON.stringify(dados),
          signal,
        })
        setUsuarios((atual) => [...atual, { ...resposta, chave: crypto.randomUUID() }])
      }
      setFormAberto(null)
    } catch (e) {
      if (e.name === 'AbortError') return
      setErroForm(e.message)
    } finally {
      if (!signal.aborted) setSalvando(false)
    }
  }

  async function excluirUsuario(usuario) {
    const signal = controllerRef.current.signal
    setExcluindoId(idItem(usuario))
    setErroExclusao(null)

    try {
      await requisicao(`${URL_USUARIOS}/${usuario.id}`, { method: 'DELETE', signal })
      setUsuarios((atual) => atual.filter((u) => idItem(u) !== idItem(usuario)))
      console.log(`Usuário ${usuario.id} excluído`)
    } catch (e) {
      if (e.name === 'AbortError') return
      setErroExclusao(e.message)
    } finally {
      if (!signal.aborted) setExcluindoId(null)
    }
  }

  return (
    <div>
      <button onClick={abrirNovo}>Novo</button>

      {formAberto && (
        <FormUsuario
          key={formAberto.usuario ? idItem(formAberto.usuario) : 'novo'}
          modo={formAberto.modo}
          inicial={formAberto.usuario}
          salvando={salvando}
          erro={erroForm}
          onSalvar={salvarUsuario}
          onCancelar={() => setFormAberto(null)}
        />
      )}

      <ListaUsuarios
        usuarios={usuarios}
        carregando={carregando}
        erro={erroLista}
        excluindoId={excluindoId}
        erroExclusao={erroExclusao}
        onEditar={abrirEdicao}
        onExcluir={excluirUsuario}
      />
    </div>
  )
}

export default App
