import styled from "styled-components";
import { colorPrimary } from "../config";


const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ececec;
  background: white;
  padding: 0.5rem 1.5rem;
  transition: 0.2s;
  cursor: pointer;
  font-size: 13px;
  border-radius: 999px;
  height: 48px;
  min-width: 80px;
  outline: none;
  color: #333;
  text-transform: uppercase;
  font-weight: 700;
  ${props => props.alignRight && "margin-left: auto;"}
  :hover{
    background: ${colorPrimary};
    color: white;  
  }
  :active{
    transition-duration: 0.05s;
    filter: brightness(90%);
    transform: translateY(1px);
  }
`;

export default Button;