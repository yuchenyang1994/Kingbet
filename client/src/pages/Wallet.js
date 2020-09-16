import React, { useEffect } from "react";
import AccountStore from "../store/data/account";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AccountCard from "../components/AccountCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import LinkIcon from "@material-ui/icons/Link";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slider from "@material-ui/core/Slider";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  rootUnlock: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  accountCard: {
    paddingTop: "2vh",
  },
  unlockContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
  },
  settingList: {
    marginTop: "1vh",
  },
}));

function GasPriceDialog(props) {
  const gasPriceMark = [
    { value: 143, label: "慢" },
    { value: 146, label: "一般" },
    { value: 152, label: "快" },
    { value: 165, label: "最快" },
  ];

  function labelFormat(value) {
    return gasPriceMark.findIndex((gas) => gas.value === value) + 1;
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>设置矿工手续费</DialogTitle>
      <DialogContent>
        <DialogContentText>
          矿工手续费是您交易的手续费，您的每笔交易需要给矿工计算打包支付相应的费用，手续费越高，您交易结算的速度越快，相反，则越慢
        </DialogContentText>
        <div style={{ width:300 }}>
          <Slider
            defaultValue={props.price}
            value={props.price}
            aria-labelledby="discrete-slider-custom"
            valueLabelDisplay="auto"
            step={null}
            marks={gasPriceMark}
            min={143}
            max={165}
            onChange={props.onPriceChange}
          />
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Wallet(props) {
  const classes = useStyle();
  const { state: accountState, dispatch: AccountDispatch } = React.useContext(
    AccountStore.Context
  );
  const web3 = React.$web3;
  const [openGasPrice, setOpenGasPrice] = React.useState(false);
  const network = [
    {
      name: "Rinkeby",
      http: "https://rinkeby.infura.io/v3/df9efaebc06e47feb9dd23f7c933b031",
    },
  ];

  useEffect(() => {
    let fetch_balance = async () => {
      if (accountState.unLock) {
        let balance = await web3.eth.getBalance(accountState.address);
        AccountDispatch({
          type: "Balance",
          payload: {
            balance: balance,
          },
        });
      }
    };
    let localGasPrice = window.localStorage.getItem("gasPrice");
    if (localGasPrice) {
      AccountDispatch({
        type: "gasPrice",
        payload: {
          gasPrice: Number(localGasPrice),
        },
      });
    }
    fetch_balance();
  }, []);

  function unLockDialog() {
    return (
      <Card>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            未解锁账户
          </Typography>
          <Typography variant="body1" component="p">
            检测到您的钱包账户还没有解锁
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            size="small"
            onClick={() => {
              props.history.push("/Greeting");
            }}
          >
            解锁
          </Button>
        </CardActions>
      </Card>
    );
  }

  function getWallet() {
    if (accountState.unLock) {
      return (
        <Box className={classes.accountCard}>
          <AccountCard
            balance={accountState.balance}
            address={accountState.address}
            onRefresh={async () => {
              let balance = await web3.eth.getBalance(accountState.address);
              AccountDispatch({
                type: "Balance",
                payload: {
                  balance: String(balance),
                },
              });
            }}
            onDelete={() => {
              window.localStorage.removeItem("keystore");
              props.history.push("/Greeting");
            }}
          ></AccountCard>
          <Paper className={classes.settingList}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="转账" />
              </ListItem>
              <ListItem button onClick={()=> {
                setOpenGasPrice(true);
              }}>
                <ListItemIcon>
                  <LocalGasStationIcon />
                </ListItemIcon>
                <ListItemText primary="设置矿工手续费" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText primary="设置以太坊网络" />
              </ListItem>
            </List>
          </Paper>
          <GasPriceDialog
            open={openGasPrice}
            price={accountState.gasPrice}
            onPriceChange={(event, newValue) => {
              AccountDispatch({
                type: "gasPrice",
                payload: {
                  gasPrice: newValue,
                },
              });
              window.localStorage.setItem("gasPrice", newValue);
            }}
            handleClose={() => {
              setOpenGasPrice(false)
            }}
          />
        </Box>
      );
    } else {
      return unLockDialog();
    }
  }
  return (
    <div className={accountState.unLock ? classes.rootUnlock : classes.root}>
      {getWallet()}
    </div>
  );
}
