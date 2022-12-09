const BotMessage = ({ lastMessage, message }) => {
  
    return (
      <div className="message-row">
          <div
            className="message-avatar"
            style={{ backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/2040/2040946.png)` }}
          />
            <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: '4px' }}>
              {message}
            </div>
      </div>
    );
  };
  
  export default BotMessage;