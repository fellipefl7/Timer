import { HandPalm, Play } from "phosphor-react";
import {differenceInSeconds} from 'date-fns'
import { HomeContainer, StartCountdownBtt, StopCountdownBtt } from "./styles";
import { createContext, useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";



interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  endDate?: Date
}
interface CycleContextData{
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: ()=> void
}
export const CyclesContext = createContext({} as CycleContextData)

export function Home(){
const [cycles, setCycles] = useState<Cycle[]>([])
const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


const task = watch('task')
const isSubmitDisabled = !task

function markCurrentCycleAsFinished(){
  setCycles(state =>state.map((cycle:Cycle)=>{
    if(cycle.id === activeCycleId){
      return {...cycle, endDate: new Date()}
    } else {
      return cycle
    }
  }))
}

function createNewCycle(data:NewCycleFormData){
  const newCycle:Cycle={
    id: String(new Date().getTime()),
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date()
  }
  setCycles(state => [...state, newCycle])
  setActiveCycleId(newCycle.id)
  setSecsPassed(0)
  reset()
}
const activeCycle = cycles.find((cycle)=> cycle.id === activeCycleId)




function handleStopCycle(){
  setCycles(state =>state.map((cycle:Cycle)=>{
    if(cycle.id === activeCycleId){
      return { ...cycle, stopDate: new Date() }
    } else{
      return cycle
    }
  }))
  setActiveCycleId(null);
}

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <CyclesContext.Provider value={{activeCycle,activeCycleId, markCurrentCycleAsFinished}}>
          <NewCycleForm/>
          <Countdown/>
        </CyclesContext.Provider>
        
        {activeCycle ? <StopCountdownBtt onClick={handleStopCycle} type="button">
            <HandPalm size={24}/>
            Stop
          </StopCountdownBtt>:
          <StartCountdownBtt disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Start
          </StartCountdownBtt>}
          
  </form>
  </HomeContainer>
  )
}