import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Concerts from './selectconcert';
import axios from 'axios';



function App() {
  axios.get('http://localhost:8080/api/selectconcerts/')
    .then(console.log)
  return (
    <h1>hi</h1>
    // <BrowserRouter>
    //   <div className="container">
    //     <Routes>
    //       <Route path="/" element={<MainPage />} />
    //     </Routes>
    //     <Routes>
    //       <Route path="/selectconcerts/" element={<Concerts />} />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}



export default App;
