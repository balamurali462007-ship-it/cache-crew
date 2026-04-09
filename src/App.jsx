import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Compare from './pages/Compare';
import MapExplorer from './pages/MapExplorer';
import Stories from './pages/Stories';
import Tools from './pages/Tools';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/map" element={<MapExplorer />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Footer />
      <ChatBot />
    </Router>
  );
}
