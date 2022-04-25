const ClearCompleted = ({ handleClearCompleted }) => {
  return (
    <button className="clear" onClick={handleClearCompleted}>
      Clear Visited
    </button>
  );
};

export default ClearCompleted;
