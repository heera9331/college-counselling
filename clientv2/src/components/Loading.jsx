const Loading = ({ message }) => {
  return (
    <div className="d-flex text-primary justify-content-center m-auto">
      <div
        className="spinner-border mt-4"
        role="status"
        style={{ height: "300px", width: "300px" }}
      >
        <span className="visually-hidden">
          {message ? message : "Loading..."}
        </span>
      </div>
    </div>
  );
};

export default Loading;
