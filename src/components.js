import {styled,keyframes} from 'styled-components'
import { Link, useLocation } from 'react-router-dom';

export const body =styled.div `
  background: url('https://media.istockphoto.com/id/1310180818/photo/a-train-moving-with-electric-support.jpg?s=612x612&w=0&k=20&c=wVPMx6txFQ58dxT6R5feSU42h8-v9Z41KdVhcJwXS3w=') no-repeat center center fixed;
  background-size: cover;
  margin: 0; /* Remove default margin */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Use the full viewport height */
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%; /* Adjust the width as needed for different screens */
  max-width: 678px;
  min-height: 400px;
  overflow: hidden;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  background-image: url('https://i.ibb.co/Kbwbxyr/Untitled-design-6.png'); /* Replace with the path to your train image */
  background-size: cover;
  background-position: center; 
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  border-radius: 10px; /* Inherit border-radius from Container */
  transform: ${props => (props.signinIn !== true ? 'translateX(-100%)' : 'translateX(0)')};
  
  
`;

export const Overlay = styled.div`
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  border-radius: 10px; /* Inherit border-radius from Container */
  ${props => (props.signinIn !== true ? 'transform: translateX(50%)' : null)};
  
`;




const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: ${({ signinIn }) => (signinIn ? '100%' : '0')};
  height: 100%;
  transition: top 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  animation: ${({ signinIn }) => (signinIn ? slideUp : 'none')} 0.6s ease-in-out;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: ${({ signinIn }) => (signinIn ? '0' : '100%')};
  height: 100%;
  transition: top 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  animation: ${({ signinIn }) => (!signinIn ? slideUp : 'none')} 0.6s ease-in-out;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;



export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
`;

export const Title = styled.h1`
font-weight: bold;
margin: 0;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
border-radius: 10px;
`;
export const ErrorMessage = styled.output`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
border-radius: 10px;
color: red;
font-size: 10px;`;

export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #ff4b2b;
   background-color: #ff4b2b;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const GhostButton = styled(Button)`
  border: 4px solid black;
  background-color: transparent;
  border-color: #ffffff;
  font-size: 14px;
  margin-top: 11rem; /* Adjust the margin-top as needed */


`;

export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 0px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true && 'transform: translateX(0);'}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => props.signinIn !== true && 'transform: translateX(20%);'}
`;


export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;

export const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
`;


export const Component = styled.div`
  width: 300px;
  height: 200px;
  background-color: lightgray;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  
`;
export const Bar = styled.div`
  position: sticky;
  top: 0;
  background-color: #333;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    text-align: left;

    
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  align:right;
  cursor: pointer;
  @media (min-width: 769px) {
    display: none;
  }
`;

export const NavItem = styled(Link)`
  margin: 10px;
  position: relative;
  color: #ffffff;
  font-size: 20px;
  padding: 20px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  @media (max-width: 768px) {
    /* Add any additional styling for mobile view if needed */
  }
`;
export const ProfileButton = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  padding-block: 0px;
  padding-inline: 0px;
  border-width: 0px 
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
  
`;