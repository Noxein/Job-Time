import React from 'react'

export const DisplayDaysMobile = () => {
  return (
    <div className='flex lg:hidden mt-6 overflow-x-auto whitespace-nowrap'>
        <FirstIndex/>
        <OneIndex isOdd={true}/>
        <OneIndex />
        <OneIndex isOdd={true}/>
        <OneIndex />
        <OneIndex isOdd={true}/>
    </div>
  )
}

export const OneIndex = ({isOdd = false}:{isOdd?:boolean}) => {
    return(
        <div className={`flex flex-col ${isOdd?'skeletonGradientSecondary ':'skeletonGradientPrimary'}`}>
            <OneCell />
            <OneCell />
            <OneCell />
            <OneCell />
            <OneCell />
            <OneCell />
            <OneCell />
            <OneCell />
        </div>
    )
}
export const FirstIndex = ({isOdd= false}:{isOdd?:boolean}) => {
    return(
        <div className={`flex flex-col ${isOdd?'skeletonGradientSecondary ':'skeletonGradientPrimary'}`}>
        <OneCell px='px-8'/>
        <OneCell px='px-8'/>
        <OneCell px='px-8'/>
        <OneCell px='px-8'/>
        <OneCell px='px-8'/>
        <OneCell px='px-8'/>
        <OneCell px='px-8'/>
        <OneCell px='px-8'/>
    </div>
    )
}
const OneCell = ({px='px-16'}:{px?:string}) => {
    return (
        <div className={`pt-7 pb-7 border-2 ${px}`}>

        </div>
    )
}