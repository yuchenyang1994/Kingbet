import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import LockIcon from "@material-ui/icons/Lock";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountStore from '../store/data/account';
import Button from "@material-ui/core/Button";
import { saveAs } from 'file-saver';

function getSteps() {
  return ["设置钱包密码", "保存私钥", "保存keystore"];
}

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: "3vh",
    paddingBottom: "2vh",
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
  paperRoot: {
    paddingTop: "1vh",
    paddingBottom: "1vh",
    height: "100%",
  },
  paperContent: {
    display: "flex",
    flexDirection: "column",
    wordWrap: "break-word",
    textAlign: "center",
    padding: "1vh",
    height: "100%",
    justifyContent: "space-between"
  }
}));

function SetPassword(props) {
  const classes = useStyle();
  const { onChangePassWord, onOK, onCancel } = props;

  return (
    <Paper className={classes.paperContent}>
      <Typography>
        设置用来解锁你钱包的密码, 因使用区块链技术，您的密码如果遗失将无法找回。
      </Typography>
      <TextField
        id="outlined-password-input"
        label="密码"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        onChange={(event) => {
          onChangePassWord(event.target.value);
        }}
      />
      <div>
        <Button 
          color="primary"
          onClick={event => {
          onCancel(event);
        }}>取消</Button>
        <Button
          color="primary"
          onClick={(event) => {
            onOK(event);
          }}
        >
          确定
        </Button>
      </div>
    </Paper>
  );
}

function ShowPrivateCode(props) {
  const { privateCode, onOK, onCancel } = props;
  const classes = useStyle();
  return (
    <Paper className={classes.paperContent}>
      <Typography>
        这是你账户私钥，请妥善保存，如果私钥被他人掌握，你的资产将会遗失。
      </Typography>

      <Typography>
        {privateCode}
      </Typography>
      <div>
        <Button 
          color="primary"
          onClick={event => {
          onCancel(event);
        }}>取消</Button>
        <Button
          color="primary"
          onClick={(event) => {
            onOK(event);
          }}
        >
          确定
        </Button>
      </div>
    </Paper>
  )
}

function SaveKeystore(props) {
  const { onSave, onOK, onCancel } = props;
  const classes = useStyle();

  return (
    <Paper className={classes.paperContent}>
      <Typography>
        keystore文件是你账户的凭证，只需要密码就可以解锁账户。如果遗失只能通过私钥重新生成，请妥善保存
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={event => {
          onSave(event)
        }}
        startIcon={<SaveIcon />}
      >
        保存Keystore
      </Button>
      <div>
        <Button 
          color="primary"
          onClick={event => {
          onCancel(event);
        }}>取消</Button>
        <Button
          color="primary"
          onClick={(event) => {
            onOK(event);
          }}
        >
          确定
        </Button>
      </div>
    </Paper>
  )

}



export default function CreatAccount(props) {
  const classes = useStyle();
  const [activeStep, setActiveStep] = React.useState(0);
  const [password, setPassword] = React.useState("");
  const [account, setAccount] = React.useState({});
  const { dispatch: AccountDispatch } = React.useContext(AccountStore.Context);
  const steps = getSteps();
  const web3 = React.$web3;

  function getStepPanel() {
    switch (activeStep) {
      case 0:
        return (
          <SetPassword 
            onChangePassWord={password => setPassword(password)}
            onOK={event => {
              let account = web3.eth.accounts.create(password);
              setAccount(account);
              setActiveStep(1);
            }}
            onCancel={event => {
              props.history.push("/Greeting")
            }}
          />
        )
      case 1:
        return (
          <ShowPrivateCode
            privateCode={account.privateKey}
            onOK={event => {
              setActiveStep(2);
            }}
            onCancel={event => {
              setActiveStep(0);
            }}
          />
        )
      case 2:
        return (
          <SaveKeystore 
            onSave={event => {
              let keystore = web3.eth.accounts.encrypt(account.privateKey, password);
              let keystore_stringify = JSON.stringify(keystore);
              let keystore_file = new File([keystore_stringify], "keystore.json", { type: "text/plain;charset=utf-8" });
              window.localStorage.setItem("keystore", keystore_stringify)
              saveAs(keystore_file);
            }}

            onOK={event => {
              props.history.push("/wallet");
              web3.eth.defaultAccount = account.address;
              AccountDispatch({
                type: "Unlock",
                payload: {
                  privateKey: account.privateKey,
                  address: account.address
                }
              });
            }}
            onCancel={event => {
              setActiveStep(1);
            }}          
          />
        )
      default:
        break;
      }
    }

  return (
    <Box className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.paperRoot}>
        {getStepPanel()}
      </div>
    </Box>
  );
}
