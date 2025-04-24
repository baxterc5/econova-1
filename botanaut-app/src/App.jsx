import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './theme.css';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import Planet from './pages/Planet';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {!isLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<ECOSWAP />} />
        <Route path="/planet" element={<Planet />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}