import "./FilterModal.css";

const FilterModal = ({ berlinList, newArray, closeFilter, handleGetFilter, setFilterType, setFilterLocation, showFilterList, setFilteredMuseum, filter }) => {
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
      <div className="filter-container">
        <button className="filter-close" onClick={closeFilter}>
          Close
        </button>
        <br />
        <p>Filter by:</p>
        <form onSubmit={handleGetFilter}>
          <label htmlFor="museums-filter-type">Type:</label>
          <br />
          <select id="museums-filter-type" name="museumType" onInput={(event) => setFilterType(event.target.value)}>
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
          <label htmlFor="museums-filter-loc">Location:</label>
          <br />
          <select id="museums-filter-loc" name="museumLocation" onInput={(event) => setFilterLocation(event.target.value)}>
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
          <input type="submit" className="get-filter" value="Filter" />
        </form>
        {showFilterList ? (
          <div>
            <form className="filter-form" onSubmit={(event) => filter(event)}>
              <label>Select a museum:</label>
              <br />
              <select id="filtered-museums" name="berlin" onInput={(event) => setFilteredMuseum(event.target.value)}>
                <option defaultValue="disabled" value="">
                  Filtered results:
                </option>
                {newArray.map((museum, index) => {
                  return (
                    <option key={index} value={museum.name}>
                      {museum.name}
                    </option>
                  );
                })}
              </select>
              <input type="submit" id="add-filter" value="Add" />
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FilterModal;
