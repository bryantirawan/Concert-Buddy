import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import ConcertDetail from './concertdetail';
import Concerts from './components/selectconcert';
import axios from 'axios';
import Navbar from './components/Navbar'
import Home from './components/pages/Home';
import SellTicketForm from './components/pages/SellTicket';
import SearchToSellTickets from './components/pages/SearchSellTickets';


function App() {
  axios.get('http://localhost:8080/api/selectconcerts/')

  return (
    <>
    <BrowserRouter>
    <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selectconcerts/" element={<Concerts />} />
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
<<<<<<< HEAD
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
=======
          <Route path="/selltickets" element={<SearchToSellTickets />} />
          <Route path="/tickets" element={<SellTicketForm />} />
>>>>>>> main
        </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;
