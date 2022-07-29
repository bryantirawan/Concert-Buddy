import React, { useState, useEffect, useContext } from 'react';
import './Footer.css';
import { Button } from './Button';
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom';

function Footer() {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>Tickets</h3>
            <Link to='/selectconcerts'>Sell a ticket</Link>
            <Link to='/selectconcerts'>Buy a ticket</Link>
            <Link to='/selectconcerts'>Find a Buddy</Link>
          </div>
          <div class='footer-link-items'>
            <h3>User profile</h3>
            <Link to='/mytickets'>Your Tickets</Link>
            <Link to='/sellertickets'>Tickets you're selling</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>Support</h3>
            <Link to='/'>Contact</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>About us</h3>
            <Link to='/'>About</Link>
            <Link to='/'>Jobs</Link>
            <Link to='/'>Press</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              Concert Buddy
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>Concert Buddy © 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
