import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'
import MainPage from './MainPage';
import Nav from './Nav';
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import Userconcerts from './userconcerts';
import ConcertDetail from './concertdetail';
import Concerts from './components/selectconcert';
import axios from 'axios';
import Navbar from './components/Navbar'
import Home from './components/pages/Home';
import SellTicketForm from './components/pages/SellTicket';
import SearchToSellTickets from './components/pages/SearchSellTickets';


function App() {
  return (
    <>
    <BrowserRouter>

      <AuthProvider>
        <Nav />
      <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} /> 
              <Route path="/userconcerts/" element={
              <PrivateRoute>
                <Userconcerts />
              </PrivateRoute>
              }
            />
            <Route path="/selectconcerts/" element={<Concerts />} /> 
            <Route path="/login/" element={<LoginPage />} /> 
          </Routes>
      </div>
      
    <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selectconcerts/" element={<Concerts />} />
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
          <Route path="/selltickets" element={<SearchToSellTickets />} />
          <Route path="/tickets" element={<SellTicketForm />} />
        </Routes>
        </AuthProvider>
    </BrowserRouter>
    </>
  );
}


export default App;
