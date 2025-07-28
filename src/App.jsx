import './App.css'
import Herosection from './components/Herosection';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThingsToDo from './components/ThingsToDo';
import DestinationGuide from './components/DestinationGuide';
import Services from './components/services';
import LoginRegister from './components/LoginRegister/LoginRegister';


function App() {

  return (
      <>
      <Router>
        <LoginRegister />
          <Navbar />
          <Herosection />
          <ThingsToDo />
          <DestinationGuide />
          <Services />
          
          
          <Routes>
            <Route path="/" exact />
          </Routes>

      </Router>
      </>
      
  );
}

export default App
