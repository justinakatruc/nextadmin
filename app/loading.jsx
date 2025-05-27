const Loading = () => {
  return (
    <div className="loading-container">
        <div className="loading-spinner">
            <div className="loading-bubble"></div>
        </div>
        <p className="loading-message">Loading...</p>
    </div>
  );
};

export default Loading;