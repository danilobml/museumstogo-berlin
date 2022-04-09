import "./List.css";
import Delete from "./Delete";
import Edit from "./Edit";

const List = ({ handleComplete, museums, deleteMuseum }) => {
  return (
    <div className="container">
      <ul>
        {museums.map((museum, index) =>
          museum ? (
            <li key={index} style={{ textDecoration: museum.completed ? "line-through" : " " }} className="list-item">
              <input type="checkbox" onChange={() => handleComplete(museum.name)} checked={museum.completed}></input>
              {museum.name}
              <Edit />
              <Delete deleteMuseum={deleteMuseum} name={museum.name} />{" "}
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
