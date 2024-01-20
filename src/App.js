import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './routes/auth'; 
import Home from './routes/home';
import Profile from './routes/profile';
import NavBar from './routes/NavBar';
import AddTrain from './firestore/addtrain';
import UploadDataButton from './routes/updatetrains';
import AboutUs from './routes/aboutus';
import BookList from './routes/booklist';
import Payment from './routes/payment';


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/routes/home" element={<Home />} />
        <Route path="/routes/profile" element={<Profile />} />
        <Route path="/firestore/addtrain" element={<AddTrain />} />
        <Route path="/routes/updatetrains" element={<UploadDataButton />} />
        <Route path="/routes/aboutus" element={<AboutUs />} />
        <Route path="/routes/booklist" element={<BookList />} />
        <Route path="/routes/payment" element={<Payment />} />





      </Routes>

  );
};

export default App;