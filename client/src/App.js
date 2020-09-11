import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { renderRoutes } from "react-router-config";
import { Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh"
  },
  content: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    flex: 1
  }
}));


export default function App({route, history}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" className={classes.content}>
        <Switch>
          {renderRoutes(route.routes)}
        </Switch>
      </Container>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 0) {
            history.push("/")
          }
          if (newValue === 1) {
            history.push("/wallet")
          }
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="竞猜" icon={<SportsEsportsIcon />} />
        <BottomNavigationAction label="钱包" icon={<AccountBalanceWalletIcon />} />
      </BottomNavigation>
    </Box>
  );
}
