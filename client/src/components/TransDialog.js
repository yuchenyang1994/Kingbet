import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";

function TransDialog(props) {
  const web3 = React.$web3;
  const [loading, setLoading] = React.useState(false);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>转账</DialogTitle>
      <DialogContent>
        <TextField label="转账地址" variant="outlined" />
        <TextField
          label="金额"
          variant="outlined"
          startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained">取消</Button>
        <Button variant="contained" color="primary" disabled={loading}>
            {loading? <CircularProgress/>:"转账"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { TransDialog };
