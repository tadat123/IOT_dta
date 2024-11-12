// src/pages/Profile/Profile.jsx
import React from 'react';
import css from './Profile.module.css';

const Profile = () => {
  const handleViewApiDoc = () => {
    window.open('https://www.facebook.com/TaTienDat.0.0', '_blank');
  };

  const handleDownloadProfile = () => {
    const element = document.createElement('a');
    const file = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'profile.html';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={css.container}>
      <div className={css.profileCard}>
        <img src="/dat.jpg" alt="Profile" className={css.profileImage} />
        <div className={css.details}>
          <h2>Tạ Tiến Đạt</h2>
          <p>ID: B21DCCN219</p>
          <p>Phone: 0333 265 466</p>
          <p>Email: dattatienfw@gmail.com</p>
          <p>
            GitHub: <a href="https://github.com/tadat123" target="_blank" rel="noopener noreferrer">https://github.com/dattatienfw</a>
          </p>
          <button className={css.button} onClick={handleViewApiDoc}>View API Documentation</button>
          <button className={css.button} onClick={handleDownloadProfile}>Download Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;