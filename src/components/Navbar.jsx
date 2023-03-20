import React from 'react'

function Navbar({fn}) {

    const numberOfPages = 5

    const paginator = []

    for(let i=0;i<numberOfPages;i++){
        paginator.push(i+1)
    }

    return (
    <div>
        <div className='fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-30 p-4 lg:p-0'>
            <div className='container mx-auto'>
                <div className='flex justify-around w-full max-w-[500px] mx-auto h-[60px] bg-lime-300 items-center rounded-full'>
                    {
                        paginator.map((pag,idx)=>(
                            <p key={idx} onClick={e=>fn(+e.target.textContent)} className='hover:font-bold cursor-pointer'>{pag}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Navbar