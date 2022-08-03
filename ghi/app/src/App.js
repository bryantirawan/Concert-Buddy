import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'
import LoginPage from './pages/oldLoginPage'
import { AuthProvider } from './context/AuthContext'
import Userconcerts from './userconcerts';
import ConcertDetail from './concertdetail';
import Concerts from './components/selectconcert';
import Navbar from './components/Navbar'
import Home from './components/pages/Home';
import SellTicketForm from './components/pages/SellTicket';
import Fellowusersgoingtoconcert from './components/fellowusersgoingtoconcert';
import TicketCheckout from './components/pages/TicketCheckout';

import SellerTicketList from './components/pages/SellerPersonalTickets';
import BuyerTickets from './components/pages/BuyerPersonalTickets';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';

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
