import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import List from "./Components/List/List";
import InputForm from "./Components/InputForm/InputForm";
import ClearAll from "./Components/ClearAll";
import ClearCompleted from "./Components/ClearCompleted";
import ClearTogo from "./Components/ClearTogo";
import berlinList from "./data/berlinMuseums.json";
import InfoModal from "./Components/InfoModal";
import SuggestModal from "./Components/SuggestModal";

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
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestType, setSuggestType] = useState("");
  const [suggestLocation, setSuggestLocation] = useState("");

  useEffect(() => {
    const toStorage = JSON.stringify(museums);
    localStorage.setItem("MUSEUMSTOGO_WBS", toStorage);
  }, [museums]);

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
      const currentMuseum = museums.find((m) => m.name === userInput.name);
      if (!currentMuseum) {
        setMuseums([...museums, newMuseum]);
      } else if (currentMuseum.completed) {
        alert("You've already visited this museum! If you'd like to revisit it, please uncheck the box next to it on the 'Museums already visited' section.");
      } else {
        alert("You've already chosen this museum in your to go list!");
      }
      setUserInput({
        name: "",
        completed: "",
      });
      event.target.reset();
    }
  };

  const handleComplete = (name) => {
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

  const handleSuggest = () => {
    setShowSuggest(true);
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

  const handleSuggestClose = () => {
    setShowSuggest(false);
  };

  const handleGetSuggestion = (event) => {
    event.preventDefault();
    let newArray = [];
    if (suggestType && suggestLocation) {
      newArray = berlinList.filter((museum) => {
        return museum.type === suggestType && museum.borough === suggestLocation;
      });
    } else if (suggestType) {
      newArray = berlinList.filter((museum) => museum.type === suggestType);
    } else if (suggestLocation) {
      newArray = berlinList.filter((museum) => museum.borough === suggestLocation);
    } else {
      newArray = berlinList;
    }
    if (newArray.length > 0) {
      const random = newArray[Math.floor(Math.random() * newArray.length)];
      const currentMuseum = museums.find((m) => m.name === random.name);
      if (!currentMuseum) {
        const newMuseum = {
          name: random.name,
          completed: false,
        };
        setMuseums([...museums, newMuseum]);
      } else {
        alert("Oops, we suggested a musum that you've already chosen or visited. Try again.");
      }
      setShowSuggest(false);
    } else {
      alert("There's no museum of that type at that location.");
    }
    setSuggestType("");
    setSuggestLocation("");
    event.target.reset();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Museums to Go</h1>
        <h3>Berlin</h3>
        {/* props */}
        <InputForm onInput={handleUserInput} onAddNew={handleAddNewMuseum} berlinList={berlinList} handleSuggest={handleSuggest} />
        <List museums={museums} editing={editing} editMuseum={handleEdit} submitEdit={handleSubmitEdit} deleteMuseum={handleDeleteMuseum} handleComplete={handleComplete} onEditText={handleEditText} editText={editText} clickInfo={handleClickInfo} setShowInfo={setShowInfo} />
        {showInfo ? <InfoModal closeInfo={handleInfoClose} info={info} /> : ""}
        {showSuggest ? <SuggestModal closeSuggest={handleSuggestClose} berlinList={berlinList} handleGetSuggestion={handleGetSuggestion} setSuggestType={setSuggestType} setSuggestLocation={setSuggestLocation} /> : ""}
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
