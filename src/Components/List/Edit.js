//IMPORTED IN LIST.JS => App.js

import editIcon from "./edit.svg";

const Edit = ({ editMuseum, name }) => {
  return (
    <span>
      <img src={editIcon} className="icon" alt="delete icon" onClick={() => editMuseum(name)} />
    </span>
  );
};

export default Edit;
