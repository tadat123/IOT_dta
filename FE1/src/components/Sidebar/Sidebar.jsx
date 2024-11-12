// src/components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import css from './Sidebar.module.css';
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";
import { FaUser, FaWind, FaFan, FaBars, FaHistory, FaDatabase } from 'react-icons/fa'; // Import FaHistory and FaDatabase
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${css.container} ${expanded ? css.expanded : ''}`}>
      <img src="./ptit.png" alt="logo" className={css.logo} />

      <button className={css.expandButton} onClick={toggleSidebar}>
        <FaBars size={30} />
      </button>

      <div className={css.menu}>
        <NavLink to="dashboard" className={css.item} title="Dashboard">
          <MdSpaceDashboard size={30} />
          {expanded && <span className={css.itemText}>Dashboard</span>}
        </NavLink>
        <NavLink to="history" className={css.item} title="On/Off History"> {/* Update the route path */}
          <FaHistory size={30} /> {/* Change icon to FaHistory */}
          {expanded && <span className={css.itemText}>On/Off History</span>}
        </NavLink>
        <NavLink to="datasensor" className={css.item} title="Data Sensor"> {/* Update the route path */}
          <FaDatabase size={30} /> {/* Change icon to FaDatabase */}
          {expanded && <span className={css.itemText}>Data Sensor</span>}
        </NavLink>
        <NavLink to="profile" className={css.item} title="Profile">
          <FaUser size={30} />
          {expanded && <span className={css.itemText}>Profile</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;