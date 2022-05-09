import html2canvas from 'html2canvas'
import { Camera, Trash } from 'phosphor-react'
import { useState } from 'react'

import { Loading } from './loading'


interface ScreenshortButtonProps {
    screenshort: string | null
    onScreenshortTock: (screenshort: string | null) => void
}

export function ScreenshortButton({
    onScreenshortTock,
    screenshort

}: ScreenshortButtonProps){

    const [isTakeingScreenshort, setIsTakeingScreenshort] = useState(false)

    async function handleTakeScreenshort(){
        setIsTakeingScreenshort(true)

        const canvas = await html2canvas(document.querySelector('html')!)
        const base64Image = canvas.toDataURL('image/png')
        
        onScreenshortTock(base64Image)
        setIsTakeingScreenshort(false)
    }

    if(screenshort){
        return(
            <button
                type='button'
                className='p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zonc-100 transition-colors'
                style={{
                    backgroundImage: `url(${screenshort})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 100
                }}
                onClick={()=> onScreenshortTock(null)}
            >

            <Trash weight='fill'/>

            </button>
        )
    }

    return(
        <>
        <button
            type='button'
            className='p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outiline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-900 transition-colors'
            onClick={handleTakeScreenshort}
        >

            {isTakeingScreenshort ? <Loading /> : <Camera className='w-6 h-6' />}

        </button>
        </>
    )
}