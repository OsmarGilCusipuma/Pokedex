import React from 'react'

function Modal( {id,estado,fn, children} ) {

    const classnameModalBG = estado ? 'fixed z-[1] inset-0 bg-opacity-50 bg-gray-900' : 'hidden'
    const classnameModal = estado ? 'fixed z-[7] top-1/2 left-1/2 bg-white rounded-[20px] -translate-x-1/2 -translate-y-1/2 border-4 w-[300px] h-[100px] text-center' : 'hidden'

    return (
        <div>
            <div className={classnameModalBG} onClick={()=>fn(id)}>
            </div>
            <div className={classnameModal}>
                    <h1 className='font-bold'>MODAL</h1>
                    <button type='button' onClick={()=>fn(id)}>Cerrar</button>
                    <div>
                    <p>{id}</p>
                    </div>
            </div>
        </div>
    )
}

export default Modal