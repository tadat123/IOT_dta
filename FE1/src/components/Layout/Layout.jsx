import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import moment from 'moment';
import css from './Layout.module.css';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className={css.container}>
      <Sidebar />

      {/* making the dashboard as the default route */}
      {pathname === "/" && <Navigate to="/dashboard" />}

      <div className={css.dashboard}>
        {pathname !== "/profile" && (
          <div className={css.topBaseGradients}>
            <div className="gradient-red"></div>
            <div className="gradient-orange"></div>
            <div className="gradient-blue"></div>
          </div>
        )}

        {pathname !== "/profile" && (
          <div className={css.header}>
            <span>{moment().format("dddd, Do MMM YYYY")}</span>

            <div className={css.profile}>
              <img src="./dat.jpg" alt="person image" />
              <div className={css.details}>
                <span>Tạ Tiến Đạt</span>
                <span>dattatienfw@gmail.com</span>
              </div>
            </div>
          </div>
        )}

        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;