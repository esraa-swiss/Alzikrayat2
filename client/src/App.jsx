import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import PhotoDetail from './pages/PhotoDetail';
import LoginRegister from './pages/LoginRegister';
import Upload from './pages/Upload';
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery user={user} />} />
        <Route path="/photos/:id" element={<PhotoDetail user={user} />} />
        <Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />
        <Route path="/upload" element={<Upload user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;