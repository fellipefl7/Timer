import {Timer, Scroll} from 'phosphor-react'
import { HeaderContainer } from "./styles";
import logo from '../../assets/vite.svg'
import { NavLink } from 'react-router-dom';


export function Header(){
  return(
    <HeaderContainer>
      <img src={logo} alt="Logo" />
      <nav>
        <NavLink to="/" title='Timer'>
          <Timer size={24}/>
        </NavLink>
        <NavLink to="/history" title='History'>
          <Scroll size={24}/>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}