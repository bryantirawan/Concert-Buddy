import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import Userconcerts from './components/buddypages/userconcerts';
import ConcertDetail from './components/buddypages/concertdetail';
import Concerts from './components/buddypages/selectconcert';
import Navbar from './components/Navbar'
import Home from './components/ticketpages/Home';
import SellTicketForm from './components/ticketpages/SellTicket';
import Fellowusersgoingtoconcert from './components/buddypages/fellowusersgoingtoconcert';
import TicketCheckout from './components/ticketpages/TicketCheckout';
import SellerTicketList from './components/ticketpages/SellerPersonalTickets';
import BuyerTickets from './components/ticketpages/BuyerPersonalTickets';
import SignUpForm from './loginpages/SignUpForm';
import SignInForm from './loginpages/SignInForm';

function App() {
  return (
    <>
    <BrowserRouter>

      <AuthProvider>
        <Navbar />

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
          <Route path="/selectconcerts/:location" element={<Concerts />} />
          <Route path="/login/" element={<SignInForm/>} />
          <Route path="/sign-up/" element={<SignUpForm />} />
          <Route path="/concertdetail/:concert_id" element={<ConcertDetail />} />
          <Route path="/tickets/:concert_id" element={<SellTicketForm />} />
          <Route path="/checkout/:ticket_id" element={<TicketCheckout />} />
          <Route path="/sellertickets" element={<SellerTicketList />} />
          <Route path="/mytickets" element={<BuyerTickets />} />
        </Routes>

        </AuthProvider>
    </BrowserRouter>
    </>
  );
}


export default App;
