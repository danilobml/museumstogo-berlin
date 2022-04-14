import "./List.css";
import Delete from "./Delete";
import Edit from "./Edit";

const List = ({ handleComplete, museums, deleteMuseum }) => {
  return (
    <div className="container">
      {museums.find((m) => m.completed === false) ? <h5>Museums to Go:</h5> : ""}
      <ul>
        {museums.map((museum, index) =>
          museum ? (
            !museum.completed ? (
              <li key={index} className="list-item">
                {/* call handleComplete with parameters when checkbox changes */}
                <input type="checkbox" onChange={() => handleComplete(museum.name)} checked={museum.completed}></input>
                {museum.name}
                <Edit />
                <Delete deleteMuseum={deleteMuseum} name={museum.name} />
              </li>
            ) : (
              ""
            )
          ) : (
            ""
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
              <Edit />
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
