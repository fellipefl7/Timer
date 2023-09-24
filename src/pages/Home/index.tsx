import { Play } from "phosphor-react";
import { HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownBtt, TaskInput, MinutesAmountInput } from "./styles";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCylceFormSchema = zod.object({
  task: zod.string().min(1,'Inform a task'),
  minutesAmount: zod
  .number()
  .min(5, 'Your cycle must have 5 minutes at least')
  .max(60, 'Your cycle must have 60 minutes at most')
})
// interface NewCycleFormData{
//   task: string
//   minutesAmount: number
// }
type NewCycleFormData = zod.infer<typeof newCylceFormSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}
export function Home(){
const [cycles, setCycles] = useState<Cycle[]>([])
const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
const [secsPassed, setSecsPassed] = useState(0)
const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
  resolver: zodResolver(newCylceFormSchema),
  defaultValues:{
    task: '',
    minutesAmount: 0,
  }
})
const task = watch('task')
const isSubmitDisabled = !task

function createNewCycle(data:NewCycleFormData){
  const newCycle:Cycle={
    id: String(new Date().getTime()),
    task: data.task,
    minutesAmount: data.minutesAmount
  }
  setCycles(state => [...state, newCycle])
  setActiveCycleId(newCycle.id)
  reset()
}
const activeCycle = cycles.find((cycle)=> cycle.id === activeCycleId)

const totalSecs = activeCycle ? activeCycle.minutesAmount * 60 : 0
const currSecs = activeCycle ? totalSecs - secsPassed : 0

const minsAmount = Math.floor(totalSecs / 60)
const secsAmount = currSecs %60 

const mins = String(minsAmount).padStart(2,'0')
const secs = String(secsAmount).padStart(2,'0')

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <FormContainer>
          
          <label htmlFor="task">Task Title:</label>
          <TaskInput 
            type="text" 
            id="task" 
            placeholder="Name your project" 
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Project 1"/>
            <option value="Project 2"/>
            <option value="Project 3"/>
            <option value="Project 4"/>
          </datalist>

          <label htmlFor="minutesAmount">For:</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={5}
            min={5}  
            max={60}
            {...register('minutesAmount',{valueAsNumber: true})}
          />
          <span>minutes.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{mins[0]}</span>
          <span>{mins[1]}</span>
          <Separator>:</Separator>
          <span>{secs[0]}</span>
          <span>{secs[1]}</span>
        </CountdownContainer>
          <StartCountdownBtt disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Start
          </StartCountdownBtt>
  </form>
  </HomeContainer>
  )
}