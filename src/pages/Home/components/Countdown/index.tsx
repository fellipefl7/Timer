import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

export function Countdown(){
  const {activeCycle, activeCycleId, markCurrentCycleAsFinished} = useContext(CyclesContext)
  const [secsPassed, setSecsPassed] = useState(0)
  const totalSecs = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currSecs = activeCycle ? totalSecs - secsPassed : 0

  const minsAmount = Math.floor(currSecs / 60)
  const secsAmount = currSecs %60 
  
  const mins = String(minsAmount).padStart(2,'0')
  const secs = String(secsAmount).padStart(2,'0')

  useEffect(()=>{
    if(activeCycle) document.title = `${mins}:${secs}`
  },[mins,secs,activeCycle])
  
  useEffect(()=>{
    let interval:number;
    if(activeCycle){
      interval = setInterval(()=>{
        const diffInSecs:number = differenceInSeconds(
          new Date(),
          activeCycle.startDate
          )
          if(diffInSecs >= totalSecs){
            markCurrentCycleAsFinished()
            setSecsPassed(totalSecs)
            clearInterval(interval)
          }else {
            setSecsPassed(diffInSecs)
          }
      },1000)
    }
    return ()=>{ clearInterval(interval)}
  },[activeCycle, totalSecs, activeCycleId])

  return(
    <CountdownContainer>
          <span>{mins[0]}</span>
          <span>{mins[1]}</span>
          <Separator>:</Separator>
          <span>{secs[0]}</span>
          <span>{secs[1]}</span>
        </CountdownContainer>
  )
}