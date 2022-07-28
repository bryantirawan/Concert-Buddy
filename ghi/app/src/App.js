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
import SearchToSellTickets from './components/pages/UselessSearchSellTickets';
import Fellowusersgoingtoconcert from './components/fellowusersgoingtoconcert';
import TicketCheckout from './components/pages/TicketCheckout';
import SignupPage from './pages/Signup';
import SellerTicketList from './components/pages/SellerPersonalTickets';
import BuyerConcerts from './components/pages/BuyerPersonalTickets';

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
          <Route path="/fellowusers/:concert_id" element={<Fellowusersgoingtoconcert />} />
          <Route path="/selectconcerts/" element={<Concerts />} />
          <Route path="/login/" element={<LoginPage />} />
          <Route path="/sign-up/" element={<SignupPage />} />

          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
          <Route path="/tickets/:concert_id" element={<SellTicketForm />} />
          <Route path="/selltickets" element={<SearchToSellTickets />} />
          <Route path="/checkout/:ticket_id" element={<TicketCheckout />} />
          <Route path="/sellertickets" element={<SellerTicketList />} />
          <Route path="/myconcerts" element={<BuyerConcerts />} />
        </Routes>
        </div>
        </AuthProvider>
    </BrowserRouter>
    </>
  );
}


export default App;
