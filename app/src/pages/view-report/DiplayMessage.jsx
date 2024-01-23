const DisplayMessage = ({ chat }) => {
  // console.log(chat);
  return (
    <div className="container">
      <p className="text-center">
        <span className="bg-white">
          {new Date(chat.timestamp).toLocaleString()}
        </span>
      </p>
      <p className="text-end">{chat.teacher}</p>
      <p>{chat.msg}</p>
    </div>
  );
};

export default DisplayMessage;
