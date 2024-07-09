export function CountHours(start:string,end:string){
    const endHour = Number(end.slice(0,2))
    const startHour = Number(start.slice(0,2))
    const endMinutes = Number(end.slice(3,5))
    let startMinutes = Number(start.slice(3,5))
    const isWorkingLaterThanMidnight = startHour>endHour

    let totalMinutes:number 
    let totalHours: number = 0
    
    if(startMinutes===0){
        totalMinutes = endMinutes
    }else{
        totalMinutes = endMinutes + 60-startMinutes
    }
    
    let totalMinutesString: string 

    if(totalMinutes>=60){
        totalHours = totalHours + 1
        totalMinutesString = String(totalMinutes-60)
    }else{
        totalMinutesString = String(totalMinutes)
    }

    if(Number(totalMinutesString)<10){
        totalMinutesString = `0${totalMinutes}`
    }
    if(Number(totalMinutesString)>=60){
        totalMinutesString = `0${totalMinutes-60}`
    }

    if(isWorkingLaterThanMidnight){
        if(startMinutes === 0){
            totalHours = totalHours + 24 - startHour + endHour
        }else{
            totalHours = totalHours+  24 - startHour + endHour - 1
        }
    }else{
        if(startMinutes === 0){
            totalHours = totalHours + endHour - startHour
        }else{
            totalHours = totalHours + endHour - startHour - 1
        }
    }

    return `${totalHours}:${totalMinutesString}`
}

import { SetStateAction } from "react"
export const AddOrRemoveIds = (dayid:string,idsToRemove:string[], setIdsToRemove:React.Dispatch<SetStateAction<string[]>>) => {

    if(!setIdsToRemove) return
    const IdAlreadyInArray = idsToRemove.includes(dayid)
    if(IdAlreadyInArray){
        setIdsToRemove(x=>x.filter(singleId=>singleId!==dayid))
        return
    }
    setIdsToRemove(x=>[...x,dayid])
}
export const useBgColorClass = (index:number,dayid:string,idsToRemove: string[]) => {

    const DayIdInRemoveArray = idsToRemove.includes(dayid)
    if((index+1)%2===1&&DayIdInRemoveArray){
        //odd and selected
        return `bg-blue-700`
    }
    if((index+1)%2===1){
        //just odd
        return 'bg-gray-300'
    }
    if(DayIdInRemoveArray){
        //even and selected
        return `bg-blue-500`
    }
    return ''
    
}