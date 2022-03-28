import logo from './assets/lendlord.png'
import './App.css';
import MainPage from './pages/main-page/mainPage';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={'200px'} alt={'logo'} />
      </header>
      <MainPage/>
    </div>
  );
}

export default App;
