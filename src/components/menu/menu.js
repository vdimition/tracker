import React from 'react';
import { NavLink } from "react-router-dom";

const Menu = () => (
  <div>
    <NavLink to={'/'}>Home</NavLink>
    <NavLink to={'/users'}>Users</NavLink>
    <NavLink to={'/projects'}>Projects</NavLink>
    <NavLink to={'/tracker'}>Tracker</NavLink>
  </div>
);

export default Menu;
