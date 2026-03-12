import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './componentes/home';
import sandBox from './componentes/SandBox';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewerDetails from './componentes/Migration/GenericComponentes/ViewerDetails';
import { useContext } from 'react';
import { Test_context } from './Context/test-context';


import MainPanel from './componentes/Migration/mainPanel';

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
          <sandBox />
        </div>} />
        <Route path='/NewVersion' element={(
          document.body.style.backgroundImage = `url(${Image})`,
          document.body.style.backgroundSize = "cover",
          document.body.style.backgroundRepeat = "no-repeat",

          document.body.style.backgroundAttachment = "fixed",

          <MainPanel />

        )} />
        <Route path='/viewerDetails' element={<ViewerDetails rss={SingleRSSMap} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
