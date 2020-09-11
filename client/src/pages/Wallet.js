import React from "react";
import AccountStore from '../store/data/account';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import account from "../store/data/account";


const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  },
  unlockContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 14
  }
}));


export default function Wallet(props) {
  const classes = useStyle();
  const { state: accountState ,dispatch: AccountDispatch } = React.useContext(AccountStore.Context);

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

  function getWallet(params) {
    if (accountState.unLock) {
      return <p>Wallet</p>
    } else {
      return unLockDialog();
    }
    
  }
  return (
    <div className={classes.root}>
      {getWallet()}
    </div>
  );
}
