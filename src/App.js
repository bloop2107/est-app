import logo from './logo.svg';
import './App.css';
import HomeComponent from "./components/HomeComponent";
import {Outlet} from 'react-router-dom'

function App() {
  return (
    <>
      <HomeComponent />
      <Outlet />
    </>
    
  );
}

export default App;
