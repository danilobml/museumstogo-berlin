import "./InputForm.css";
import Suggest from "./Suggest";

const InputForm = ({ onInput, onAddNew, berlinList, handleSuggest }) => {
  return (
    <>
      <form className="input-form" onSubmit={onAddNew}>
        <label>Choose from the list, or type a museum here:</label>
        <br />
        <input list="berlin-museums" name="berlin-list" id="berlin-list" onInput={onInput}></input>
        <datalist id="berlin-museums" name="berlin">
          {berlinList.map((museum, index) => {
            return (
              <option key={index} value={museum.name}>
                {museum.name}
              </option>
            );
          })}
        </datalist>
        <input type="submit" className="addbutton" value="Add"></input>
        <br />
        <label>Or let us suggest a museum for you:</label>
        <Suggest handleSuggest={handleSuggest} />
      </form>
    </>
  );
};

export default InputForm;
