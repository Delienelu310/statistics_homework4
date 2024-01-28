import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Exercise1 from './presentations/Exercise1.jsx';

function App() {

  return (

    <div className="App">
      <Exercise1 nValues={[100,1000,10000]}/>
    </div>
  );
}

export default App;
