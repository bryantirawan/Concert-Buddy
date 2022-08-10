import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h3>Tickets</h3>
            <Link to='/selectconcerts'>Sell a ticket</Link>
            <Link to='/selectconcerts'>Buy a ticket</Link>
            <Link to='/selectconcerts' reloadDocument>Find a Buddy</Link>
          </div>
          <div className='footer-link-items'>
            <h3>User profile</h3>
            <Link to='/mytickets'>Your Tickets</Link>
            <Link to='/sellertickets'>Tickets you're selling</Link>
            <Link to='/userconcerts'>Concerts you're going to</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h3>Creators</h3>
            <a target="_blank" href="https://www.linkedin.com/in/bryantirawan/">Bryant Irawan</a>
            <a target="_blank" href="https://www.linkedin.com/in/ericadippold/">Erica Dippold</a>
            <a target="_blank" href="https://www.linkedin.com/in/benperlman/">Ben Perlman</a>
            <a target="_blank" href="https://www.linkedin.com/in/justinshpang/">Justin Pang</a>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h3>About us</h3>
            <Link to='/'>About</Link>
            <Link to='/'>Jobs</Link>
            <Link to='/'>Press</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              Concert Buddy
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>Concert Buddy © 2022</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
