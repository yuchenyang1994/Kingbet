import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MessageStore from "../store/data/message";
import AccountStore from "../store/data/account";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
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
  small: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

export default function Greeting(props) {
  const classes = useStyle();
  const [password, setPassword] = React.useState("");
  const web3 = React.$web3;
  const { dispatch: messageDispatch } = React.useContext(
    MessageStore.Context
  );
  const { dispatch: AccountDispatch } = React.useContext(AccountStore.Context);

  function keystoreUpload() {
    return (
      <div style={{ marginTop: "2vh" }}>
        <input
          accept="text/*"
          className={classes.upload}
          id="keystore-button-file"
          onChange={(event) => {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
              try {
                let keystore_string = e.target.result;
                let keystore = JSON.parse(keystore_string);
                let account = web3.eth.accounts.decrypt(keystore, password);
                web3.eth.defaultAccount = account.address;
                window.localStorage.setItem("keystore", keystore_string);
                messageDispatch({
                  type: "Show",
                  payload: {
                    message: "解锁成功",
                    type: "success",
                  },
                });
                AccountDispatch({
                  type: "Unlock",
                  payload: {
                    privateKey: account.privateKey,
                    address: account.address,
                  },
                });
                props.history.push("/wallet");
              } catch (error) {
                console.log(error)
                messageDispatch({
                  type: "Show",
                  payload: {
                    message: "不能正确解锁，检查keystore和密码重试",
                    type: "error",
                  },
                });
              }
            };
          }}
          type="file"
        />
        <label htmlFor="keystore-button-file">
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
      </div>
    );
  }

  function normalUnlock() {
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ width: "100%", marginTop: "2vh" }}
        onClick={() => {
          let keystore_string = window.localStorage.getItem("keystore") 
          let keystore = JSON.parse(keystore_string);
          try {
            let account = web3.eth.accounts.decrypt(keystore, password);
            web3.eth.defaultAccount = account.address;
            messageDispatch({
              type: "Show",
              payload: {
                message: "解锁成功",
                type: "success",
              },
            });
            AccountDispatch({
              type: "Unlock",
              payload: {
                privateKey: account.privateKey,
                address: account.address,
              },
            });
            props.history.push("/wallet")
          } catch (error) {
            messageDispatch({
                type: "Show",
                payload: {
                  message: "不能正确解锁，检查keystore和密码重试",
                  type: "error",
                },
            });
          }

        }}
      >
        解锁
      </Button>
    );
  }

  function getunLockForm() {
    if (window.localStorage.getItem("keystore")) {
      return normalUnlock()
    } else {
      return keystoreUpload()
    }
  }

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
          <div style={{ textAlign: "center" }}>
            <img src="logo250.png" className={classes.small}></img>
          </div>
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
          {getunLockForm()}
          <div style={{ textAlign: "right" }}>
            <Button
              color="primary"
              onClick={() => {
                props.history.push("/CreateAccount");
              }}
            >
              新建账户
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
