import React from 'react'

export const LoadingLogo = () => {
  return (
    <>
        <Div1></Div1>
        <Div2></Div2>
        <Div1></Div1>
        <Div2></Div2>
        <Div1></Div1>
    </>
  )
}

const Div1 = () => {
    return <div className="bg-blue-400 min-h-2 min-w-2 LoadingDiv1"></div>
}

const Div2 = () => {
    return <div className="bg-blue-400 min-h-2 min-w-2 LoadingDiv2"></div>
}