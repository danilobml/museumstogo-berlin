const Info = ({ clickInfo, name }) => {
  return (
    <>
      <span> - </span>
      <button className="info" onClick={() => clickInfo(name)}>
        info
      </button>
    </>
  );
};

export default Info;
