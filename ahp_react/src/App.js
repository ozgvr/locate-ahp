import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Explore from './pages/Explore';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
