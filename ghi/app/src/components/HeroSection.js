import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import '../App.css';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  let {user} = useContext(AuthContext)
  const [city, setCity] = useState('');

  let navigate = useNavigate()

  const handleImGoingSubmit = async (e) => {
    e.preventDefault();
    navigate(`/selectconcerts/${city}`)
    }

  const handleKeypress = e => {
    //it triggers enter button by pressing the enter key
  if (e.keyCode === 13) {
    handleImGoingSubmit();
  }
};

  return (
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
      <h1 align="center">ADVENTURE AWAITS</h1>
      {user ? (<p align="center">Hello {user.username}, what are you waiting for?</p>):(<p align="center">What are you waiting for?</p>)}

      <div className='hero-btns'>
        <form onSubmit={handleImGoingSubmit}>
          <input className="form-control" type="text" placeholder="Search concerts by city..." value={city} required onChange={(e) => setCity(e.target.value)} onKeyPress={handleKeypress}/>
        </form>
      </div>
    </div>
  );
}

export default HeroSection;
