import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import List from "./Components/List/List";
import InputForm from "./Components/InputForm/InputForm";
import ClearAll from "./Components/InputForm/ClearButtons/ClearAll";
import ClearCompleted from "./Components/InputForm/ClearButtons/ClearCompleted";
import ClearTogo from "./Components/InputForm/ClearButtons/ClearTogo";
import berlinList from "./data/berlinMuseums.json";
import InfoModal from "./Components/List/Info/InfoModal";
import SuggestModal from "./Components/Suggest/SuggestModal";
import FilterModal from "./Components/InputForm/Filter/FilterModal";

function App() {
  const [userInput, setUserInput] = useState({});
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState({});
  const [showSuggest, setShowSuggest] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [suggestType, setSuggestType] = useState("");
  const [suggestLocation, setSuggestLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [showFilterList, setShowFilterList] = useState(false);
  const [filteredMuseum, setFilteredMuseum] = useState("");
  const [newArray, setNewArray] = useState([]);

  const [museums, setMuseums] = useState(() => {
    const stored = localStorage.getItem("MUSEUMSTOGO_WBS");
    return stored ? JSON.parse(stored) : [];
  });

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

  const suggest = (arrSuggest) => {
    const museumRegister = museums.map((museum) => museum.name);
    let newMuseum = {};
    if (arrSuggest.length > 0) {
      const random = arrSuggest[Math.floor(Math.random() * arrSuggest.length)];
      const currentMuseum = museums.find((m) => m.name === random.name);
      if (!currentMuseum) {
        newMuseum = {
          name: random.name,
          completed: false,
        };
      } else {
        newMuseum = {
          name: "",
          completed: "",
        };
      }
      if (newMuseum.name) {
        setMuseums([...museums, newMuseum]);
      } else if (!arrSuggest.every((museum) => museumRegister.includes(museum.name))) {
        suggest(arrSuggest);
      } else {
        alert("You've already got all museums that fit your preferences on your list!");
        return;
      }
    } else {
      alert("There's no museum of that type at that location.");
    }
  };

  const handleGetSuggestion = (event) => {
    event.preventDefault();
    let arrSuggest = [];
    if (suggestType && suggestLocation) {
      arrSuggest = berlinList.filter((museum) => {
        return museum.type === suggestType && museum.borough === suggestLocation;
      });
    } else if (suggestType) {
      arrSuggest = berlinList.filter((museum) => museum.type === suggestType);
    } else if (suggestLocation) {
      arrSuggest = berlinList.filter((museum) => museum.borough === suggestLocation);
    } else {
      arrSuggest = berlinList;
    }
    suggest(arrSuggest);
    setShowSuggest(false);
    setSuggestType("");
    setSuggestLocation("");
    event.target.reset();
  };

  const handleSuggestClose = () => {
    setShowSuggest(false);
  };

  const handleFilterOpen = () => {
    setShowFilter(true);
  };

  const handleGetFilter = (event) => {
    event.preventDefault();
    if (filterType && filterLocation) {
      setNewArray(
        berlinList.filter((museum) => {
          return museum.type === filterType && museum.borough === filterLocation;
        })
      );
    } else if (filterType) {
      setNewArray(berlinList.filter((museum) => museum.type === filterType));
    } else if (filterLocation) {
      setNewArray(berlinList.filter((museum) => museum.borough === filterLocation));
    } else {
      setNewArray(berlinList);
    }
    setShowFilterList(true);
    event.target.reset();
  };

  const filter = (event) => {
    event.preventDefault();
    let newMuseum = {};
    const currentMuseum = museums.find((m) => m.name === filteredMuseum);
    if (!currentMuseum) {
      newMuseum = {
        name: filteredMuseum,
        completed: false,
      };
    } else {
      newMuseum = {
        name: "",
        completed: "",
      };
      if (currentMuseum.completed) {
        alert("You've already visited this museum! If you'd like to revisit it, please uncheck the box next to it on the 'Museums already visited' section.");
      } else {
        alert("You've already chosen this museum in your to go list!");
      }
    }
    if (newMuseum.name) {
      setMuseums([...museums, newMuseum]);
      setFilteredMuseum("");
    }
    setShowFilter(false);
    setShowFilterList(false);
    setFilterType("");
    setFilterLocation("");
    setNewArray([]);
  };

  const handleFilterClose = () => {
    setFilteredMuseum("");
    setShowFilter(false);
    setShowFilterList(false);
    setFilterType("");
    setFilterLocation("");
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Museums to Go</h1>
        <h3>Berlin</h3>
        <InputForm onInput={handleUserInput} onAddNew={handleAddNewMuseum} berlinList={berlinList} handleSuggest={handleSuggest} handleFilter={handleFilterOpen} showFilter={showFilter} />
        <List museums={museums} editing={editing} editMuseum={handleEdit} submitEdit={handleSubmitEdit} deleteMuseum={handleDeleteMuseum} handleComplete={handleComplete} onEditText={handleEditText} editText={editText} clickInfo={handleClickInfo} setShowInfo={setShowInfo} />
        {showInfo ? <InfoModal closeInfo={handleInfoClose} info={info} /> : ""}
        {showSuggest ? <SuggestModal berlinList={berlinList} closeSuggest={handleSuggestClose} handleGetSuggestion={handleGetSuggestion} setSuggestType={setSuggestType} setSuggestLocation={setSuggestLocation} /> : ""}
        {showFilter ? <FilterModal berlinList={berlinList} newArray={newArray} closeFilter={handleFilterClose} handleGetFilter={handleGetFilter} setFilterType={setFilterType} setFilterLocation={setFilterLocation} showFilterList={showFilterList} filter={filter} setFilteredMuseum={setFilteredMuseum} /> : ""}
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
