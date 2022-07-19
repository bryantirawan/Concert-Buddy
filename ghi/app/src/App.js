import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import ConcertDetail from './concertdetail';
import Concerts from './selectconcert';
import axios from 'axios';
import Navbar from './components/Navbar'
import Home from './components/pages/Home';



function App() {
  axios.get('http://localhost:8080/api/selectconcerts/')

  return (
    <>
    <BrowserRouter>
    <Navbar />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<MainPage />} />
          <Route path="/selectconcerts/" element={<Concerts />} /> 
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} /> 

=======
          <Route path="/" element={<Home />} />
          <Route path="/selectconcerts/" element={<Concerts />} />
>>>>>>> main
        </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;
