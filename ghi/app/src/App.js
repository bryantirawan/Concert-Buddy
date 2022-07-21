import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import Userconcerts from './userconcerts';
import ConcertDetail from './concertdetail';
import Concerts from './components/selectconcert';
import Navbar from './components/Navbar'
import Home from './components/pages/Home';
import SellTicketForm from './components/pages/SellTicket';
import SearchToSellTickets from './components/pages/SearchSellTickets';


function App() {
  return (
    <>
    <BrowserRouter>

      <AuthProvider>
        <Navbar />
      <div className="container">
          <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/userconcerts/" element={
            <PrivateRoute>
              <Userconcerts />
            </PrivateRoute>
            }
          />
          <Route path="/selectconcerts/" element={<Concerts />} /> 
          <Route path="/login/" element={<LoginPage />} /> 
          <Route path="/selectconcerts/" element={<Concerts />} />
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
          <Route path="/tickets/:concert_id" element={<SellTicketForm />} />
          <Route path="/selltickets" element={<SearchToSellTickets />} />
        </Routes>
        </div>
        </AuthProvider>
    </BrowserRouter>
    </>
  );
}


export default App;
