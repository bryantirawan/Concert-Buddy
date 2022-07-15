import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Concerts from './selectconcert';
import axios from 'axios';
import TestFile from './testfile';




function App() {
  axios.get('http://localhost:8080/api/selectconcerts/')
    // .then(console.log)




  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/selectconcerts/" element={<Concerts />} />
          <Route path="/testfile/" element={<TestFile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}



export default App;
