import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import ConcertDetail from './concertdetail';
import Concerts from './selectconcert';
import axios from 'axios';



function App() {
  axios.get('http://localhost:8080/api/selectconcerts/')

  return (
    <BrowserRouter>
        <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/selectconcerts/" element={<Concerts />} /> 
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} /> 

        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
