import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  greeting: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  upload: {
    display: "none",
  },
}));

export default function Greeting(props) {
  const classes = useStyle();
  const [password, setPassword] = React.useState("");
  const web3 = React.$web3;
  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          title="解锁账户"
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                props.history.push("/wallet");
              }}
            >
              <CloseIcon />
            </IconButton>
          }
        ></CardHeader>
        <CardContent className={classes.greeting}>
          <TextField
            id="outlined-password-input"
            label="密码"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            accept="text/*"
            className={classes.upload}
            id="keystore-button-file"
            onChange={(event) => {
              let file = event.target.files[0];
              let reader = new FileReader();
              reader.readAsText(file);
              reader.onload = e => {
                try {
                  let keystore = JSON.parse(e.target.result); 
                  let account = web3.eth.accounts.decrypt(keystore, password);
                } catch (error) {
                }
                props.history.push("/wallet")
              }
            }}
            type="file"
          />
          <label htmlFor="keystore-button-file" style={{ marginTop: "2vh" }}>
            <Button
              component="span"
              variant="contained"
              color="primary"
              size="large"
              style={{ width: "100%" }}
            >
              上传keystore解锁
            </Button>
          </label>
          <div style={{ textAlign: "right" }}>
            <Button color="primary">新建账户</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
