import "./App.css";
import { useState } from "react";
import List from "./Components/List/List";
import InputForm from "./Components/InputForm/InputForm";
import berlinList from "./data/berlinMuseums";

// function based component

function App() {
  const [museums, setMuseums] = useState([]);
  const [userInput, setUserInput] = useState({});

  const handleUserInput = (event) => {
    setUserInput({ name: event.target.value, completed: false });
  };

  const handleAddNewMuseum = (event) => {
    event.preventDefault();
    if (userInput.name) {
      const newMuseum = {
        name: userInput.name,
        completed: false,
      };
      setMuseums([...museums, newMuseum]);
      setUserInput({
        name: "",
        completed: "",
      });
      event.target.reset();
    }
  };

  const handleComplete = (name) => {
    console.log("hey");
    const modMuseums = [...museums].map((museum) => {
      if (museum.name === name) {
        museum.completed = !museum.completed;
      }
      return museum;
    });
    setMuseums(modMuseums);
  };

  const handleDeleteMuseum = (name) => {
    const newMuseums = [...museums].filter((museum) => {
      return museum.name !== name;
    });
    setMuseums(newMuseums);
  };

  return (
    <div className="App">
      <div className="list-container">
        <h1>Museums to Go</h1>
        <InputForm onInput={handleUserInput} onAddNew={handleAddNewMuseum} berlinList={berlinList} />
        <List museums={museums} deleteMuseum={handleDeleteMuseum} handleComplete={handleComplete} />
      </div>
    </div>
  );
}

export default App;
