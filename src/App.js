import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Exercise1 from './presentations/Exercise1.jsx';
import Exercise2 from './presentations/Exercise2.jsx';

function App() {

  return (

    <div className="App">
      {/* <Exercise1 nValues={[100,1000,10000]}/> */}
      <Exercise2 nValues={[5, 10, 15, 20, 25, 30, 100]} repeats={100000}/>
      {/* <Exercise2 nValues={[40]} repeats={100000}/> */}
    </div>
  );
}

export default App;
