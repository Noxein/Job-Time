import { SetStateAction } from "react"

export type DayType = {
    id: string,
    day: string,
    starthour: string,
    endhour: string,
    workplace: string,
    liters?: string,
    counterreading?: string,
}

export type contextUserType = {
    name: string,
    surename: string,
    email: string,
}

export type isOpenType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
    sideNavRef: React.MutableRefObject<HTMLElement | null>,
}