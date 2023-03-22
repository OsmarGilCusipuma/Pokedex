import { useState,useEffect } from 'react'
import Modal from './Modal'
import Navbar from './Navbar'
import colorType from '../helpers'


function Pokelist() {

  const [list, setList] = useState([])
  const [page,setPage] = useState(1)
  const [modal,setModal] = useState(false)
  const [id,setId] = useState(1)

  useEffect( ()=>{

    const controller = new AbortController()

    const fetchData = async ()=>{
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${((page-1)*20)}`

        const response = await fetch(url, {signal: controller.signal})
        const prev = await response.json()
        const data = prev.results
  
        const pokemonData = await Promise.all(data.map( async poki=>{
          const data = await fetch(poki.url).then(pre=>pre.json())
          return {
            name: data.name,
            sprite: data.sprites.front_default,
            id: data.id,
            types: data.types
          }
        }))
        setList(pokemonData)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()

    return ()=>{
      controller.abort()
    }
  },[page])

  //To work with url inside useEffect -> By clicking each page, onClick should change status url

  function handlePage(pag){
    setPage(pag)
  }
  
  function clickModal(idPokemon){
    setId(idPokemon)
    setModal(!modal)
  }
  return (
    <div className="Pokelist min-h-screen">
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
        {
          list.map((li,idx)=>(
            <div className={`${colorType(li.types[0].type.name)} text-white uppercase font-bold rounded-xl m-3 flex flex-row-reverse justify-center items-center`} key={idx}>
              <div className='flex-1'>
                <img className='mx-auto h-[100px] lg:h-[200px]' src={li.sprite}></img>
              </div>
              <div className='flex-1 w-full'>
                <h1 className='uppercase font-bold text-center text-sm lg:text-xl p-2'>{li.name}</h1>
                <div className='flex justify-center'>
                  <button type='button' className='bg-amber-400 rounded-md cursor-pointer px-2 lg:px-5 text-sm lg:text-base hover:brightness-[.80] transition-all' onClick={()=>clickModal(li.id)}>Ver más</button>
                </div>
              </div>
            </div>
          ))
        }
        <Modal
          id={id}
          estado={modal}
          fn={clickModal}
        ></Modal>
      </div>
        <Navbar 
        fn={handlePage}
        ></Navbar>
    </div>
  )
}

export default Pokelist
