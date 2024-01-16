import logo from './logo.svg';
import './App.css';
import ItemCard from './components/ItemCard';
import Admin from './Admin/Admin';
import Signup from './components/Signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './components/Signin';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Signin/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Admin' element={<Admin/>}></Route>
       </Routes>
    </BrowserRouter>

    
    </div>
  );
}

export default App;
