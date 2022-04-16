import "./List.css";
import Delete from "./Delete";
import Edit from "./Edit";
import Info from "./Info";

const List = ({ handleComplete, museums, deleteMuseum, editMuseum, submitEdit, editing, onEditText, editText, clickInfo }) => {
  return (
    //Conditional rendering, only brings header if there are uncompleted museums, otherwise empty string
    <div className="container">
      {museums.find((m) => m.completed === false) ? <h5>Museums to Go:</h5> : ""}

      <ul>
        {museums.map((museum, index) =>
          museum.name !== editing ? (
            !museum.completed ? (
              <li key={index} className="list-item">
                {/* call handleComplete with parameters when checkbox changes */}
                <input type="checkbox" onChange={() => handleComplete(museum.name)} checked={museum.completed}></input>
                {museum.name}
                <Info clickInfo={clickInfo} name={museum.name} />
                <Edit editMuseum={editMuseum} name={museum.name} />
                <Delete deleteMuseum={deleteMuseum} name={museum.name} />
              </li>
            ) : (
              ""
            )
          ) : (
            <form key="index" onSubmit={submitEdit}>
              <input type="text" className="inputEdit" value={editText} onInput={(event) => onEditText(event.target.value)} />
              <input type="submit" className="submitEdit" value="Save" />
            </form>
          )
        )}
      </ul>
      {museums.find((m) => m.completed === true) ? <h5>Museums already visited:</h5> : ""}
      <ul>
        {museums.map((museum, index) =>
          museum.completed ? (
            <li key={index} style={{ textDecoration: "line-through" }} className="list-item">
              <input type="checkbox" onChange={() => handleComplete(museum.name)} checked={museum.completed}></input>
              {museum.name}
              <Delete deleteMuseum={deleteMuseum} name={museum.name} />
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};

export default List;
