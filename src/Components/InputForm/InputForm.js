import "./InputForm.css";
import Suggest from "../Suggest/Suggest";
import Filter from "./Filter/Filter";

const InputForm = ({ onInput, onAddNew, berlinList, handleSuggest, handleFilter }) => {
  const berlinListNames = berlinList.map((museum) => museum.name).sort();
  return (
    <>
      <form className="input-form" onSubmit={onAddNew}>
        <label>Choose from the list, or type a museum here:</label>
        <br />
        <input list="berlin-museums" name="berlin-list" id="berlin-list" onInput={onInput}></input>
        <datalist id="berlin-museums" name="berlin">
          {berlinListNames.map((museum, index) => {
            return (
              <option key={index} value={museum}>
                {museum}
              </option>
            );
          })}
        </datalist>
        <input type="submit" className="addbutton" value="Add"></input>
        <Filter handleFilter={handleFilter} />
        <br />
        <label>Or let us suggest a museum for you:</label>
        <Suggest handleSuggest={handleSuggest} />
      </form>
    </>
  );
};

export default InputForm;
