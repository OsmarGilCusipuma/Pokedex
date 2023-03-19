import React, { useState,useEffect } from 'react'

function Modal( {id,estado,fn, children} ) {

    const [poke,setPoke] = useState({
        peso: 0
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
        const data = { peso:res.weight}
        setPoke({
            peso: data.peso
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
                    <p>Peso: {poke.peso}</p>
                    <button className='bg-amber-400 rounded-md cursor-pointer' type='button' onClick={()=>fn(id)}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default Modal