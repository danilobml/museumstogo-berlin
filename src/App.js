import './App.css';
import List from './Components/List/List'
import InputForm from './Components/InputForm/InputForm'

const museums = ["Chicken Museum", "Stasi Museum", "Neue Nationalgalerie", "The Museum of eternal longing for an existence unobtainable in one lifetime"]

// function based component

function App() {
  return (
    <div className="App">
      <div className="list-container">
        <h1>Museums to Go</h1>
        {/* creates list containing props from museums array*/}
        <InputForm />
        <List museums={museums} />
    </div>
    </div>
  );
}

export default App;