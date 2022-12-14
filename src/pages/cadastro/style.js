import styled from "styled-components"
import { TextField, Box, Button } from "@mui/material";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-self: center;
  width: 80vw;
  div{
    display: flex;
    margin: 1px;
    div{
      display: flex;
      flex-direction: column;
      button{
        margin-top: 3.5vh;;
         padding: 0% 100% 0% 100%;
      }
    }
  }
`


export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--black);
  -webkit-box-shadow: 2px 0px 19px 1px rgba(217,217,217,0.74); 
  box-shadow: 2px 0px 19px 1px rgba(217,217,217,0.74);
  width: 96vw;
  margin-bottom: 30px;
  h2{
    width: 80vw;
    padding: 0% 1% 1% 2%;
    font-family: Roboto;
    font-size: 1.5rem;
    letter-spacing: -0.39px;
  } 
  Button{
    width: 15vw;
    height: 1%;
    font-size: 0.5rem;
  }
`
export const EditImage = styled.div`
align-self: center;
div{
    img{
    width:100px ;
    height:100px; 
    margin-left: 5px;
    }
}

`
export const Img1 = styled.img`
  width:20px;
  height:20px;
  margin-left: 10px;
`
export const Img2 = styled.img`
  width:20px;
  height:20px;
  margin-left: 48px;
`



