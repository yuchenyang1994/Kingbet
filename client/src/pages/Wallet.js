import React, { useEffect } from "react";
import AccountStore from '../store/data/account';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import AccountCard from "../components/AccountCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import LinkIcon from '@material-ui/icons/Link';
import Paper from "@material-ui/core/Paper";


const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  },
  rootUnlock: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  accountCard: {
    paddingTop: "2vh"
  },
  unlockContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 14
  },
  settingList: {
    marginTop: "1vh"
  }
}));


export default function Wallet(props) {
  const classes = useStyle();
  const { state: accountState ,dispatch: AccountDispatch } = React.useContext(AccountStore.Context);
  const web3 = React.$web3;

  useEffect(()=> {
    let fetch_balance = async () => {
      if (accountState.unLock) {
        let balance = await web3.eth.getBalance(accountState.address);
        console.log(balance);
        AccountDispatch({
          type: "Balance",
          payload: {
            balance: balance
          }
        })
      }
    }
    fetch_balance();
  }, []);

  function unLockDialog() {
    return (
      <Card>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            未解锁账户
          </Typography>
          <Typography variant="body1" component="p">
            检测到您的钱包账户还没有解锁
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" size="small" onClick={()=> {
            props.history.push("/Greeting")
          }}>解锁</Button>
        </CardActions>
      </Card>

    )
}

  function getWallet() {
    if (accountState.unLock) {
      return (
        <Box className={classes.accountCard}>
          <AccountCard
            balance={accountState.balance}
            address={accountState.address}
            onRefresh={ async ()=> {
              let balance = await web3.eth.getBalance(accountState.address);
              AccountDispatch({
                type: "Balance",
                payload: {
                  balance: String(balance)
                }
              });
            }}
            onDelete={()=> {
              window.localStorage.removeItem("keystore");
              props.history.push("/Greeting");
            }}
          >
          </AccountCard>
          <Paper className={classes.settingList}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="转账" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LocalGasStationIcon />
                </ListItemIcon>
                <ListItemText primary="查看Gas价格" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText primary="设置以太坊网络" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      )
    } else {
      return unLockDialog();
    }
    
  }
  return (
    <div className={accountState.unLock?classes.rootUnlock:classes.root}>
      {getWallet()}
    </div>
  );
}
