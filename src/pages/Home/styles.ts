import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
export const BaseCountdownBtt = styled.button`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${(props)=> props.theme['gray-100']};

  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }

`




export const StartCountdownBtt = styled(BaseCountdownBtt)`
  background: ${(props)=> props.theme['green-500']};

  &:not(:disabled):hover{
    background: ${(props)=> props.theme['green-700']};
  }
`
export const StopCountdownBtt = styled(BaseCountdownBtt)`
  background: ${(props)=> props.theme['red-500']};

  &:not(:disabled):hover{
    background: ${(props)=> props.theme['red-700']};
  }
`