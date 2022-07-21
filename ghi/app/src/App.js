import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'
import MainPage from './MainPage';
import Nav from './Nav';
import ConcertDetail from './concertdetail';
import Concerts from './components/selectconcert';
import axios from 'axios';
import Navbar from './components/Navbar'
import Home from './components/pages/Home';
import SellTicketForm from './components/pages/SellTicket';
import SearchToSellTickets from './components/pages/SearchSellTickets';
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import Userconcerts from './userconcerts';



function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selectconcerts/" element={<Concerts />} />
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
          <Route path="/selltickets" element={<SearchToSellTickets />} />
          <Route path="/tickets" element={<SellTicketForm/>}/>
          <Route path="/userconcerts/" element={
              <PrivateRoute>
                <Userconcerts />
              </PrivateRoute>
              }
            />
            <Route path="/login/" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}


export default App;
