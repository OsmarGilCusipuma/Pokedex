import React, { useState,useEffect } from 'react'
import colorType from '../helpers'

function Modal( {id,estado,fn} ) {

    const [poke,setPoke] = useState({
        weight: 0,
        name: '',
        height: 0,
        abilities: [],
        types: []
    })

    useEffect(()=>{
        if(estado){
            fetchUrl()
        }
    },[estado])

    const classnameModalBG = estado ? 'fixed z-[1] inset-0 bg-opacity-50 bg-gray-900' : 'hidden'
    const classnameModal = estado ? 'fixed z-[7] top-1/2 left-1/2 bg-white rounded-[20px] -translate-x-1/2 -translate-y-1/2 border-4 w-[300px] h-[300px] text-center' : 'hidden'

    async function fetchUrl(){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
        const req = await fetch(url)
        const res = await req.json()
        const data = { 
            peso:res.weight,
            nombre:res.name,
            altura:res.height,
            habilidades:res.abilities,
            tipos:res.types
        }
        setPoke({
            weight: data.peso,
            name: data.nombre,
            height: data.altura,
            abilities: data.habilidades,
            types: data.tipos
        })
    }
    

    return (
        <div>
            <div className={classnameModalBG} onClick={()=>fn(id)}>
            </div>
            <div className={classnameModal}>
                <h1 className='font-bold'>MODAL</h1>
                <div>
                    <p>ID: {id}</p>
                    <p>Weight: {poke.weight}</p>
                    <p>Height: {poke.height}</p>
                    <div className='text-center'>
                        <h1 className='text-xl uppercase font-bold'>Types</h1>
                        {
                            poke.types.map((po,idx)=>(
                            <h2 className={`${colorType(po.type.name)} rounded-full text-white uppercase font-bold inline-block px-4 py-1 m-1`} key={idx}>{po.type.name}</h2>
                            ))
                        }
                    </div>
                    <div className='text-center'>
                        <h1 className='text-xl uppercase font-bold'>Attacks</h1>
                        {
                            poke.abilities.map((po,idx)=>(
                            <h2 className={`uppercase`} key={idx}>{po.ability.name}</h2>
                            ))
                        }
                    </div>
                    <button className='bg-amber-400 rounded-md cursor-pointer mt-[20px] lg:mt-[50px] px-4 text-sm lg:text-base hover:brightness-[.80] transition-all' type='button' onClick={()=>fn(id)}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default Modal