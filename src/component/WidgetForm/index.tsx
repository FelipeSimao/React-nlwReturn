import { useState } from 'react'

import bugImageIrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import ThoughtImageUrl from '../../assets/thought.svg'

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentSteps'

import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageIrl,
            alt: 'imagem de uma lagarta'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'imagem de uma lampada acesa'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: ThoughtImageUrl,
            alt: 'imagem de um balao de pensamento'
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null >(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback(){
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return(
        <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto' >

            { feedbackSent ? (
                <FeedbackSuccessStep  onFeedbackRestartRequested={handleRestartFeedback}/>
            ): (

                <>
                 {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
                <FeedbackContentStep 
                feedbackType={feedbackType} 
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={()=> setFeedbackSent(true)}
                />
            )}
                </>
            )}
            
            <footer className='text-xs text-neutral-400' >
                Feito com ♥ por <a  className='underline underline-offset-2' href="https://simao.epizy.com">felipe Simao</a>
            </footer>
        </div>
    )
}