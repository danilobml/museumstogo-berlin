//IMPORTED IN INPUTFORM.JS => App.js

const Recommend = ({ handleRecommend }) => {
  return (
    //onClick activates props handleRecommend => InputForm.js => App.js => handleRecommend ()
    <button className="recommend" onClick={handleRecommend}>
      Suggest?
    </button>
  );
};

export default Recommend;
