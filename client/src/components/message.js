import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MessageStore from "../store/data/message"; 


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Snackbars(props) {
    const { state: message, dispatch: messageDispatch} = React.useContext(MessageStore.Context);
    return (
      <Snackbar 
          open={message.open} 
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000} 
          onClose={() => messageDispatch(
          {type: "Close"}
      )}>
        <Alert onClose={()=> {messageDispatch({type: "Close"})}} severity={message.type}>
            { message.message }
        </Alert>
      </Snackbar>
    )
}