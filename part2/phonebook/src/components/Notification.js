const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.includes("ERROR")) {
    return <div className="errormsg">hello</div>;
  } else {
    return <div className="success">{message}</div>;
  }
};

export default Notification;
