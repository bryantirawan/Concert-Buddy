import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import { Button } from './Button';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Link to='/'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          FIND A BUDDY
        </Button>
        </Link>
        <Link to='/selectconcerts/'><Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          FIND A CONCERT <i className='btns' />
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
