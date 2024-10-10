import gif from "../assets/gif/3nRA.gif";

const Loading = () => {
  return (
    <div id="loader">
      <img src={gif} alt="loader" width={100} />
      <p className="text-white text-center">Loading...</p>
    </div>
  );
};

export default Loading;
