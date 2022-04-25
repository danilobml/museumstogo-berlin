import "./SuggestModal.css";

const SuggestModal = ({ berlinList, closeSuggest, handleGetSuggestion, setSuggestType, setSuggestLocation }) => {
  const types = berlinList.map((museum) => {
    return museum.type;
  });
  const typeList = [...new Set(types)].sort();
  const boroughs = berlinList.map((museum) => {
    return museum.borough;
  });
  const boroughList = [...new Set(boroughs)].sort();

  return (
    <>
      <div className="overlay"></div>
      <div className="suggest-container">
        <button className="suggest-close" onClick={closeSuggest}>
          Close
        </button>
        <br />
        <form onSubmit={handleGetSuggestion}>
          <label htmlFor="museums-suggest-type">What kind of museum are you looking for?</label>
          <br />
          <select id="museums-suggest-type" name="museumType" onInput={(event) => setSuggestType(event.target.value)}>
            <option defaultValue="disabled" vaue="">
              All
            </option>
            {typeList.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <br />
          <label htmlFor="museums-suggest-loc">Are you looking for a particular location?</label>
          <br />
          <select id="museums-suggest-loc" name="museumLocation" onInput={(event) => setSuggestLocation(event.target.value)}>
            <option defaultValue="disabled" value="">
              All
            </option>
            {boroughList.map((borough, index) => {
              return (
                <option key={index} value={borough}>
                  {borough}
                </option>
              );
            })}
          </select>
          <br />
          <input type="submit" className="get-suggestion" value="Get a Suggestion" />
        </form>
      </div>
    </>
  );
};

export default SuggestModal;
