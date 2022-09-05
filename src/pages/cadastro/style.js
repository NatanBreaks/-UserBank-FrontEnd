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
  flex-direction: column;
  padding-bottom: 3%;
  h2{
    margin-right: 0.1%;
    padding: 1% 1% 1% 3%;
    font-family: Roboto;
    font-size: 1.5rem;
    letter-spacing: -0.39px;
    color: var(--black);
    -webkit-box-shadow: 2px 1px 19px 1px rgba(217,217,217,0.74); 
    box-shadow: 2px 1px 19px 1px rgba(217,217,217,0.74);
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


