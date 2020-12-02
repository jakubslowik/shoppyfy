import styled from "styled-components";
import { colorPrimary } from "../config";

const Input = styled.input`
  position: relative;
  padding: 0.5rem 1.5rem;
  border: 2px solid #ececec;
  background: white;
  margin: 0;
  border-radius: 999px;
  outline:none;
  height: 48px;
  width: 500px;
  max-width: 100%;
  transition: 0.2s;
  :hover{
    background: #fafafa;
  }
  :focus{
    background: ${colorPrimary};
    color: white;
  }
`;

export default Input;