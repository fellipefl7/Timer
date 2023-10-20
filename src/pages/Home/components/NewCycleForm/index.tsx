import { useForm } from "react-hook-form";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
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

export function NewCycleForm(){

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCylceFormSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,
    }
  })
  return(
    <FormContainer>
          
    <label htmlFor="task">Task Title:</label>
    <TaskInput 
      type="text" 
      id="task" 
      placeholder="Name your project" 
      list="task-suggestions"
      disabled={!!activeCycle}
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
      disabled={!!activeCycle}
      {...register('minutesAmount',{valueAsNumber: true})}
    />
    <span>minutes.</span>
  </FormContainer>
  )
}