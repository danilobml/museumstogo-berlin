const InfoModal = ({ setShowInfo, info, closeInfo }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="info-container">
        <button className="info-close" onClick={closeInfo}>
          Close
        </button>
        <br />
        <div>
          <p>
            <b>Museum:</b> {info.name}
          </p>
          <p>
            <b>Type of museum:</b> {info.type}
          </p>
          <p>
            <b>Location:</b> {info.neighborhood}
          </p>
          <p>
            <b>Summary:</b> {info.summary}
          </p>
          <div>
            <p>
              <b>Picture:</b>
              <img className="info-pic" src={info.image} alt={info.name}></img>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoModal;
