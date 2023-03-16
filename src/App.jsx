import { useState,useEffect } from 'react'
import Modal from './components/Modal'

function App() {

  const [list, setList] = useState([])
  const [page,setPage] = useState()
  const [modal,setModal] = useState(false)
  const [id,setId] = useState(1)
  const paginator = ["1","2","3","4","5"]

  useEffect(()=>{
    getURLs()
  },[page])

  async function getURLs(){
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${((page-1)*20)}`
    const response = await fetch(url).then(pre=>pre.json()).then(data=>data.results)
    const pokemonData = await Promise.all(response.map( async poki=>{
      const data = await fetch(poki.url).then(pre=>pre.json())
      return {
        name: data.name,
        sprite: data.sprites.front_default,
        id: data.id
      }
    }))
    setList(pokemonData)
  }

  function clickModal(idPokemon){
    setId(idPokemon)
    setModal(!modal)
  }

  return (
    <div className="App">
      <div className='grid grid-cols-4'>
        {
          list.map((li,idx)=>(
            <div className='mx-auto' key={idx}>
              <p>{li.name}</p>
              <img src={li.sprite}></img>
              <button type='button' className='border border-red-600' onClick={()=>clickModal(li.id)}>Open</button>
            </div>
          ))
        }
        <Modal
          id={id}
          estado={modal}
          fn={clickModal}
        ></Modal>
      </div>
      <div className='fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-30 p-4 lg:p-0'>
        <div className='container mx-auto'>
          <div className='flex justify-around w-full max-w-[500px] mx-auto h-[60px] bg-lime-300 items-center rounded-full'>
            {
              paginator.map((pag,idx)=>(
                <p key={idx} onClick={e=>setPage(+e.target.textContent)} className='hover:font-bold cursor-pointer'>{pag}</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
