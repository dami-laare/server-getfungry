import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({classes, imgSrc}) => {
  return (
    <nav id='main-nav' className={`row ps-4 pt-4 ${classes ? classes : ''} `}>
        <Link to='/'>
            <img src={`${imgSrc}`} alt='Fungry logo'/>
        </Link>
    </nav>
  )
}

export default Header