
import './App.css';
import { Navbar } from "./componenets/navbar/navbar";
import AllRoutes from './Allroutes'
function App() {
  return (
    <div className="App">
      <header className="App-header">
            <Navbar />
            <div className="main">
             
                  <AllRoutes />
             
            </div>
         
      </header>
    </div>
  );
}

export default App;
