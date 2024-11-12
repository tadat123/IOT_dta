// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import History from './pages/History/History';
import Datasensor from './pages/Datasensor/Datasensor';
import Profile from './pages/Profile/Profile'; // Import the Profile component

const App = () => {
  return (
    <div id="dashboard">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="history" element={<History />} />
            <Route path="datasensor" element={<Datasensor />} />
            <Route path="profile" element={<Profile />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App; //sua lai phan nay