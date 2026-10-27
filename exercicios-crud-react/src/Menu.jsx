import { useState } from 'react'
import Exercicio1 from './exercicios/Exercicio1.jsx'
import Exercicio2 from './exercicios/Exercicio2.jsx'
import Exercicio3 from './exercicios/Exercicio3.jsx'
import Exercicio4 from './exercicios/Exercicio4.jsx'
import Exercicio5 from './exercicios/Exercicio5/App.jsx'

const exercicios = [
  { titulo: 'Exercício 1', componente: Exercicio1 },
  { titulo: 'Exercício 2', componente: Exercicio2 },
  { titulo: 'Exercício 3', componente: Exercicio3 },
  { titulo: 'Exercício 4', componente: Exercicio4 },
  { titulo: 'Exercício 5', componente: Exercicio5 },
]

function Menu() {
  const [atual, setAtual] = useState(0)
  const Atual = exercicios[atual].componente

  return (
    <div>
      <nav>
        {exercicios.map((e, i) => (
          <button key={e.titulo} onClick={() => setAtual(i)} disabled={i === atual}>
            {e.titulo}
          </button>
        ))}
      </nav>
      <hr />
      {/* Ao trocar de exercício, o componente anterior é desmontado
          (isso dispara o abort() no Exercício 5) */}
      <Atual key={atual} />
    </div>
  )
}

export default Menu
