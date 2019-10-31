import React from 'react';
import { Link } from 'react-router-dom'


import logoWhite from '../../images/logo_white.png'
import './header.css'

const Header = props => {
    return (
        <div className='main-header'>
            <img src={logoWhite} alt='main-logo' />
            <Link className='trips' to='/trips'>My Trips</Link>
            <Link to='/login'>
              <button>Logout</button>
            </Link>
        </div>
        
    )
}

export default Header;