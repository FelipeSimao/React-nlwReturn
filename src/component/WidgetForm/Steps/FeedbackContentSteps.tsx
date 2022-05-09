import { ArrowLeft } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from ".."

import { CloseButton } from "../../CloseButton"
import { ScreenshortButton } from './../ScreenshortButton'

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent,
    
}: FeedbackContentStepProps){
    
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    const [screenshort, setScreenshort] = useState<String | nuul>(null)

    const [comment, setComment] = useState('')

function handleSubmitFeedback(event: FormEvent){
    event.preventDefault()

    console.log({
        screenshort,
        comment,
    })

    onFeedbackSent()
}

    return(
        <>

        <header>

            <button onClick={onFeedbackRestartRequested} type='button' className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100' >
                <ArrowLeft weight='bold' className='w-4 h-4'/>
            </button>
            <span className='text-xl leading-6 flex itms-center gap-2 ' >
            <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
                { feedbackTypeInfo.title }
                
            </span>
            <CloseButton />
        </header>

        <form className='my-4 w-full' onSubmit={handleSubmitFeedback} >
            <textarea 
                className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zonc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outiline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
                placeholder='conte com detalhes o que esta ocorrendo...'
                onChange={event => setComment(event.target.value)}
            />
            <footer className='flex gap-2 mt-2' >

                <ScreenshortButton 
                    screenshort={screenshort}
                    onScreenshortTock={setScreenshort}
                />

                <button
                    type='submit'
                    disabled={comment.length === 0}
                    className="p-2 bg-brand-500 rounded-md border-trasnparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outiline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-900 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                >
                    Enviar Feedback
                </button>
            </footer>
        </form>

       </> 
    )
}