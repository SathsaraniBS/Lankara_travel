import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);

    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    window.addEventListener('resize', showButton);

    useEffect(() => {
        showButton();
    }, []);


  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="./images/logo.png" alt="logo" />
            
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about us" className="nav-links" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact us" className="nav-links" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
                <Link to="/planning a trip" className="nav-links" onClick={closeMobileMenu}>
                    Planning a Trip
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/article" className="nav-links" onClick={closeMobileMenu}>
                    Article
                </Link>
            </li>
            <li>
                <Link to="/community and reviews" className="nav-links" onClick={closeMobileMenu}>
                Community and Reviews</Link>
            </li>

            <li>
                <Link to="/sign in" className="nav-links-mobile" onClick={closeMobileMenu}>
                Sign in</Link>
            </li> 
          </ul>

          {button && <Button buttonStyle="btn--outline">SIGN IN</Button>}
          {button && <Button buttonStyle="btn--outline">Register</Button>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
