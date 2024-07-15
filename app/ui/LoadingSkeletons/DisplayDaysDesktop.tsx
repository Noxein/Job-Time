import React from 'react'

export const DisplayDaysDesktop = () => {
    return (
    <div className='max-w-7xl mx-auto mt-10'>
        <div>
            <DivGroup initHeight='h-16'/>
            <DivGroup initHeight='h-8' oddColor={true}/>
            <DivGroup initHeight='h-8'/>
            <DivGroup initHeight='h-8' oddColor={true}/>
            <DivGroup initHeight='h-8'/>
            <DivGroup initHeight='h-8' oddColor={true}/>
        </div>
    </div>
    )
}
const DivGroup = ({initHeight,oddColor}:{initHeight:string,oddColor?:boolean}) => {
    return(<div className={`grid grid-cols-[1fr_3fr_repeat(4,4fr)_2fr_2fr_2fr] ${oddColor?'skeletonGradientSecondary ':'skeletonGradientPrimary'}`}>
        <div className={`border-2 ${initHeight}`}></div>
        <div className='border-2'></div>
        <div className='border-2'></div>
        <div className='border-2'></div>
        <div className='border-2'></div>
        <div className='border-2'></div>
        <div className='border-2'></div>
        <div className='border-2'></div>
        <div className='border-2'></div>
        </div>
    )
}