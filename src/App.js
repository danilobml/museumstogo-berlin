import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import List from "./Components/List/List";
import InputForm from "./Components/InputForm/InputForm";
// import berlinList from "./data/berlinMuseums";
import ClearAll from "./Components/ClearAll";
import ClearCompleted from "./Components/ClearCompleted";
import ClearTogo from "./Components/ClearTogo";
import berlinList from "./data/berlinMuseums.json";
import InfoModal from "./Components/InfoModal";

// function based component

function App() {
  const [museums, setMuseums] = useState(() => {
    const stored = localStorage.getItem("MUSEUMSTOGO_WBS");
    return stored ? JSON.parse(stored) : [];
  });
  const [userInput, setUserInput] = useState({});
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const toStorage = JSON.stringify(museums);
    localStorage.setItem("MUSEUMSTOGO_WBS", toStorage);
  }, [museums]);

  //Submitting new info to the list
  // event.target is the input. value is the new information that the user types or choose.
  // event is any time this is changed. the event is listening for onInput

  const handleUserInput = (event) => {
    setUserInput({ name: event.target.value, completed: false });
  };

  //SUBMIT NEW MUSEUM TO LIST.

  //event is submit
  const handleAddNewMuseum = (event) => {
    //always with onSubmit use event.preventDefault()
    event.preventDefault();
    //checks for new user input and creates new museum variable
    if (userInput.name) {
      const newMuseum = {
        name: userInput.name,
        completed: false,
      };
      //find returns true after iterating if the userinput is the same as a museum in the list
      const currentMuseum = museums.find((m) => m.name === userInput.name);
      if (!currentMuseum) {
        //if false, change the state of the museums array
        setMuseums([...museums, newMuseum]);
        //if true send alert
      } else if (currentMuseum.completed) {
        alert("You've already visited this museum! If you'd like to revisit it, please uncheck the box next to it on the 'Museums already visited' section.");
      } else {
        alert("You've already chosen this museum in your to go list!");
      }
      setUserInput({
        name: "",
        completed: "",
      });
      //target in a submit is always the form. reset makes it blank
      event.target.reset();
    }
  };

  //COMPLETE MUSEUM

  const handleComplete = (name) => {
    const modMuseums = [...museums].map((museum) => {
      if (museum.name === name) {
        museum.completed = !museum.completed;
      }
      return museum;
    });
    setMuseums(modMuseums);
  };

  // DELETE MUSEUM - returns new array minus the museum being deleted and sets that to the state. also runs local storage, as with all events which change the museum state.
  const handleDeleteMuseum = (name) => {
    const newMuseums = [...museums].filter((museum) => {
      //filter method syntax. return if (museum name is not the same).
      return museum.name !== name;
    });
    //sets state
    setMuseums(newMuseums);
  };

  // RECOMMEND MUSEUM FUNCTION
  const handleRecommend = () => {
    const random = berlinList[Math.floor(Math.random() * berlinList.length)];
    const currentMuseum = museums.find((m) => m.name === random.name);
    if (!currentMuseum) {
      const newMuseum = {
        name: random.name,
        completed: false,
      };
      setMuseums([...museums, newMuseum]);
    } else {
      alert("We've picked one already listed/visited! Please click on 'Suggest?' again.");
    }
  };

  const handleClearAll = () => {
    setMuseums([]);
  };

  const handleClearCompleted = () => {
    const newMuseums = [...museums].filter((museum) => {
      return !museum.completed;
    });
    setMuseums(newMuseums);
  };

  const handleClearTogo = () => {
    const newMuseums = [...museums].filter((museum) => {
      return museum.completed;
    });
    setMuseums(newMuseums);
  };

  const handleEdit = (museum) => {
    setEditing(museum);
    setEditText(museum);
  };

  const handleEditText = (value) => {
    setEditText(value);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    const modMuseums = [...museums].map((museum) => {
      if (museum.name === editing) {
        museum.name = editText;
      }
      return museum;
    });
    setMuseums(modMuseums);
    setEditText("");
    setEditing("");
  };

  const handleClickInfo = (museum) => {
    const isInList = berlinList.find((item) => item.name === museum);
    if (isInList) {
      setShowInfo(true);
      setInfo(isInList);
    } else {
      alert("This museum is not listed in Berlin. No info available.");
    }
  };

  const handleInfoClose = () => {
    setShowInfo(false);
    setInfo({});
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Museums to Go</h1>
        <h3>Berlin</h3>
        {/* props */}
        <InputForm onInput={handleUserInput} onAddNew={handleAddNewMuseum} berlinList={berlinList} handleRecommend={handleRecommend} />
        <List museums={museums} editing={editing} editMuseum={handleEdit} submitEdit={handleSubmitEdit} deleteMuseum={handleDeleteMuseum} handleComplete={handleComplete} onEditText={handleEditText} editText={editText} clickInfo={handleClickInfo} setShowInfo={setShowInfo} />
        {showInfo ? <InfoModal closeInfo={handleInfoClose} info={info} setShowInfo={setShowInfo} /> : ""}
        <div className="clear-div">
          {museums.find((m) => m.completed === false) ? <ClearTogo handleClearTogo={handleClearTogo} /> : ""}
          {museums.find((m) => m.completed === false) && museums.find((m) => m.completed === true) ? <ClearAll handleClearAll={handleClearAll} /> : ""}
          {museums.find((m) => m.completed === true) ? <ClearCompleted handleClearCompleted={handleClearCompleted} /> : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
