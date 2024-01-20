import React from "react";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import * as Components from '../components';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from "../config/firebase";
import { doc,setDoc } from "firebase/firestore";
import { StyleSheetManager } from 'styled-components';


export const useAuthentication = () => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    return { currentUser};
  };
export const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSignUp, setIsSignUp] = useState(true); 
    const [displayName, setdisplayname] = useState('');

    

    const handleAuthAction = async (event) => {
        event.preventDefault();

        try {
            if (isSignUp) {
                const usercred=await createUserWithEmailAndPassword(auth, email, password);
                console.log("User created successfully!");
                const user=usercred.user;
                console.log(user.uid);
                await setDoc(doc(db, 'users', user.uid), {
                    displayName,
                    email,
                  });
                  console.log('After setDoc');


                navigate('/routes/home');

            } else {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("User signed in successfully!");
                navigate('/routes/home');
            }
            setError(null);
        } catch (error) {
            console.error("Authentication error:", error.message);
            if (isSignUp && error.code === 'auth/email-already-in-use') {
                setError('User already exists. Please use a different email address.');
            } 
            else if (isSignUp && error.code === 'auth/invalid-email') {
                setError('Invalid username. Please try again.');
            }else if (!isSignUp && error.code === 'auth/invalid-email') {
                setError('Invalid username. Please try again.');
            }else if (!isSignUp && error.code === 'auth/invalid-credential') {
                setError('Wrong password. Please try again.');
            } else {
                setError(error.message);
            }
        }
    };

    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log('User logged out successfully!');
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
      };
    
    const isLoggedIn = location.pathname == '/' && auth.currentUser;
    const [signinIn, toggle] = React.useState(false);
     return(
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'signinIn'}>
        <Components.body>
         <Components.Container>{isLoggedIn ? (
          <div>
            <p>You are logged in!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
             <Components.SignUpContainer signinIn={signinIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' onChange={(e) => setdisplayname(e.target.value)}/>
                     <Components.Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                     <Components.Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                     <Components.Button onClick={handleAuthAction}>Sign Up{isSignUp==true}</Components.Button>
                     {error && <Components.ErrorMessage>{error}</Components.ErrorMessage>}

                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signinIn}>
                  <Components.Form>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                      <Components.Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button onClick={handleAuthAction}>Sigin In</Components.Button>
                      {error && <Components.ErrorMessage>{error}</Components.ErrorMessage>}

                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signinIn}>
                
                 <Components.Overlay signinIn={signinIn}>

                 <Components.LeftOverlayPanel signinIn={signinIn}>

                     <Components.GhostButton onClick={() => {toggle(true); setIsSignUp(false);}}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signinIn}>
                           <Components.GhostButton onClick={() => {toggle(false); setIsSignUp(true);}}>
                               Sign Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer></>)}

         </Components.Container>
         </Components.body>
         </StyleSheetManager>

     )
}
    
export default Auth;
