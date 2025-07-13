import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './componentes/home';
import sandBox from './componentes/SandBox';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div className="container">
          <Home />
        </div>} />
        <Route path='/sandBox' element={<div className="container">
          <sandBox />
        </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
