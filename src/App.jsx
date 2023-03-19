import { useState,useEffect } from 'react'
import Modal from './components/Modal'

function App() {

  const [list, setList] = useState([])
  const [page,setPage] = useState(1)
  const [modal,setModal] = useState(false)
  const [id,setId] = useState(1)
  const paginator = ["1","2","3","4","5"]

  useEffect(()=>{
    getURLs()
  },[page])

  const colorType = (type)=>{
    let color = ''

    switch(type){
      case 'grass': color='bg-lime-500'
        break;
      case 'poison': color='bg-violet-600'
        break;
      case 'flying': color='bg-blue-200'
        break;
      case 'bug': color='bg-green-600'
        break;
      case 'fire': color='bg-red-600'
        break;
      case 'water': color='bg-blue-600'
        break;
      case 'ground': color='bg-amber-800'
        break
      default: color='bg-slate-400'
        break;
    }

    return color
  }

  /*
  
    Para trabajar useEffect con [url] al hacer clicl en las paginas, el onClick deberia cambiar la url

  */

  async function getURLs(){
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${((page-1)*20)}`
    const response = await fetch(url).then(pre=>pre.json()).then(data=>data.results)
    const pokemonData = await Promise.all(response.map( async poki=>{
      const data = await fetch(poki.url).then(pre=>pre.json())
      return {
        name: data.name,
        sprite: data.sprites.front_default,
        id: data.id,
        types: data.types
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
      <div className='grid lg:grid-cols-4 grid-cols-2'>
        {
          list.map((li,idx)=>(
            <div className='mx-auto flex flex-col justify-center' key={idx}>
              <img src={li.sprite}></img>
              <button type='button' className='bg-amber-400 rounded-md cursor-pointer' onClick={()=>clickModal(li.id)}>Open</button>
              <div>
                {
                  li.types.map((ty,idx)=>(
                    <h2 className={`${colorType(ty.type.name)} rounded-full text-center text-white uppercase font-bold`} key={idx}>{ty.type.name}</h2>
                  ))
                }
              </div>
              <h1 className='uppercase font-bold'>{li.name}</h1>
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
