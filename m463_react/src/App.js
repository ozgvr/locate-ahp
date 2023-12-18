import './App.css';
import Landing from './components/Landing';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Explore from './pages/Explore';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/analyze" element={<Dashboard/>}/>
        <Route path="/explore" element={<Explore/>}/>
      </Routes>
  
    </BrowserRouter>
  );
}

export default App;
