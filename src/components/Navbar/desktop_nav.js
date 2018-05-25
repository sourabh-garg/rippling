import React from 'react';

import './navbar.scss';

import {Link} from 'react-router';

class Navbar extends React.Component{

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }


  render () {

    return (
      <div className="container nav_abs">
        <div className="container navbar ">

          <div className="flex flex_center max-1200">

            <Link  to="/" className="logo_width">
              <img src="https://cdn.rippling.com/c0357213b8da5e037cedd0277df300ba.svg" alt=""/>
            </Link>

            <div className="navLinks">

              <Link className="navLinks_active" to="/" >Book Tickets</Link>
              <Link to="account" >My Account</Link>

              <Link to="contact" >Contact us</Link>
              <Link to="about_us" >About us</Link>

            </div>

          </div>


        </div>

      </div>


    );
  }

}



export default Navbar;


