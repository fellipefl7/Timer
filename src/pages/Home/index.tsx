import { Play } from "phosphor-react";
import { HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownBtt, TaskInput, MinutesAmountInput } from "./styles";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCylceFormSchema = zod.object({
  task: zod.string().min(1,'Input a task'),
  minutesAmount: zod.number().min(5).max(60, 'Your cycle can only have 60 minutes at most')
})

export function Home(){
// const [task, setTask] = useState('')
const {register, handleSubmit, watch, formState} = useForm({
  resolver: zodResolver(newCylceFormSchema),
})
const task = watch('task')
const isSubmitDisabled = !task

function createNewCycle(data:any){
  console.log(data)

}


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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
          <StartCountdownBtt disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Start
          </StartCountdownBtt>
  </form>
  </HomeContainer>
  )
}