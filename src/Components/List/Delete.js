import deleteIcon from "./delete.svg";

const Delete = ({ deleteMuseum, name }) => {
  return (
    <span>
      <img src={deleteIcon} alt="delete icon" className="icon" onClick={() => deleteMuseum(name)} />
    </span>
  );
};

export default Delete;
