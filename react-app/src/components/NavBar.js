import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/layout.css'

const NavBar = ({ authenticated, setAuthenticated }) => {

  const renderUserAuth = (authenticated) => {
    if(authenticated){
      return (
        <>
          <li>
            <NavLink to="/upload" exact={true} activeClassName="active">
              Upload
            </NavLink>
          </li>
          <li>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </li>
        </>
      )
    }else{
      return (
        <>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </>
      )
    }
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        {renderUserAuth(authenticated)}
      </ul>
    </nav>
  );
}

export default NavBar;