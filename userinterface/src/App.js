import logo from './logo.svg';
import './App.css';
import ItemCard from './components/ItemCard';
import MenuCard from './components/MenuCard';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <header className="App-header">
         
       <h1> TECH CART INNOVATORS</h1>
        <ItemCard  />
      
      </header>

      <Signup/>
    </div>
  );
}

export default App;
