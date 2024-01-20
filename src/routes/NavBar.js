
import React, {useState,useEffect} from 'react';
import { useAuthentication } from './auth';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import Auth from './auth';
import * as Components from '../components';
import { db } from '../config/firebase';
import { collection, getDocs, where, query, doc, getDoc } from 'firebase/firestore';
import styled, {StyleSheetManager} from 'styled-components';

const Menu =styled.div`
  top: 0;

`



const MenuBar = styled.div`
  position: sticky;
  top: 0;
  margin: auto;
  margin:50px;
  z-index: 1000; /* Adjust the z-index as needed */
  border-radius: 25px;
  height: fit-content;
  display: flex;
  justify-content: center; /* Center the content horizontally */
  background-color: rgba(0, 0, 0, .4);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  width: 80%; /* Make the navigation bar full width */

  @media (max-width: 768px) {
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
    align-items: flex-end;
  }
`;


const MenuItem = styled(Link)`
  text-decoration: none;
  list-style: none;
  display: flex;
  align-items: center;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  padding: 12px 16px;
  margin: 0 8px;
  position: relative;
  cursor: pointer;
  white-space: nowrap;

  &::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: .2s;
    border-radius: 25px;
  }

  &:hover {
    &::before {
      background: linear-gradient(to bottom, #e8edec, #d2d1d3);
      box-shadow: 0px 3px 20px 0px black;
      transform: scale(1.2);
    }
    color: black;
  }
`;

const ToggleButton = styled.button`

  background: none;
  border: none;
  color: black;
  font-size: 2rem;
  align:right;
  cursor: pointer;
  @media (min-width: 769px) {
    display: none;
  }
`;

  




const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setIsLoggedIn(!!user);
      });

      return () => {
          unsubscribe();
      };
  }, []);

  useEffect(() => {
      const fetchPhotoUrl = async () => {
          if (currentUser) {
              try {
                  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                  const userData = userDoc.data();
                  if (userData && userData.photoURL) {
                      setProfilePictureUrl(userData.photoURL);
                  }
              } catch (error) {
                  console.error('Error fetching photoURL:', error.message);
              }
          }
      };

      fetchPhotoUrl();
  }, [currentUser]);
  if (location.pathname === '/') {
    return null;
  }

  const renderProfileOrLoginButton = () => {
    if (isLoggedIn) {
      return (
        <MenuItem to="/routes/profile">
          <Components.ProfileButton>
          <Components.ProfileImage
            src={profilePictureUrl? profilePictureUrl:'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106'}
            alt="Profile"
          /></Components.ProfileButton>
        </MenuItem>
      );
    } else {
      return <MenuItem to="/">Login</MenuItem>;
    }
  };
  
  const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
  };

  return (
      <>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isOpen'}>

      <ToggleButton onClick={toggleMenu}>☰</ToggleButton>
      <MenuBar className="menu-bar" isOpen={isMenuOpen}>
      <MenuItem to="/routes/home">Home</MenuItem>
      <MenuItem to="/routes/aboutus">AboutUs</MenuItem>
      <MenuItem to="/routes/booklist">BookList</MenuItem>

      {renderProfileOrLoginButton()}
      </MenuBar>
      </StyleSheetManager>
      </>
  );
};

export default NavBar;
