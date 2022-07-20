import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'
import MainPage from './MainPage';
import Nav from './Nav';
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import Concerts from './selectconcert';
import Userconcerts from './userconcerts';




function App() {
  return (
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
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
