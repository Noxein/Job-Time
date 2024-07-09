import React from 'react'
import { getDays } from '../lib/actions'
import { DispalyDays } from './DispalyDays'

export const FetchTableData = async () => {
    const days = await getDays()
  return (
    <DispalyDays showDownloadBtn={true} days={days}/>
  )
}
