const InputForm = ({ onInput, onAddNew, berlinList }) => {
  return (
    <form className="input-form" onSubmit={onAddNew}>
      <label>Choose from a list of museums in Berlin or Type it:</label>
      <br />
      <input list="berlin-museums" name="berlin-list" id="berlin-list" onChange={onInput}></input>
      <datalist id="berlin-museums" name="berlin">
        {berlinList.map((museum, index) => (
          <option key={index} value={museum}>
            {museum}
          </option>
        ))}
      </datalist>
      <br />
      <input type="submit" value="Add"></input>
      <br />
    </form>
  );
};

export default InputForm;
