import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './componentes/home';
import SandBox from './componentes/SandBox';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewerDetails from './componentes/Migration/GenericComponentes/ViewerDetails';
import { useContext } from 'react';
import { Test_context } from './Context/test-context';


import MainPanel from './componentes/Migration/mainPanel';
// La ubicación la pide MainMenu (localize) y la recuerda servicios/ubicacionAproximada.js



function App() {
  const { SingleRSSMap } = useContext(Test_context);
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Routes>
        <Route path='/' element={<div className="container">
          <Home />
        </div>} />
        <Route path='/sandBox' element={<div className="container">
          <SandBox />
        </div>} />
        {/* El fondo lo pone mainPanel; su tamaño y posición están en index.css */}
        <Route path='/NewVersion' element={<MainPanel />} />
        <Route path='/viewerDetails' element={<ViewerDetails rss={SingleRSSMap} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
