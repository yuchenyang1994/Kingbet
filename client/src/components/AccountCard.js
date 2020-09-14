import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, CardActions, Box, IconButton } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';


const useStyle = makeStyles((theme) => ({
  balance: {
    textAlign: "center"
  },
  action: {
    marginLeft: "auto"
  }
}));

export default function AccountCard(props) {
  const classes = useStyle();
  const web3 = React.$web3;

  let splitAddress = (address) => {
    return `${address.substring(0,4)}...${address.substr(-7)}`
  }

  return (
    <Card>
      <CardHeader
        title={
          <Typography cariant="h5">
            我的钱包
          </Typography>
        }
      >
      </CardHeader>
      <CardContent>
        <Box className={classes.balance}>
          <img src="/ETH.svg" style={{height: "3rem", width:"3rem"}}></img>
            <Typography variant="h4">
              {web3.utils.fromWei(String(props.balance), "ether") }
            </Typography>
            <Tooltip title={props.address} placement="bottom" disableFocusListener style={{marginTop: "1vh"}}>
              <Chip color="primary" size="small" label={splitAddress(props.address)} icon={<AccountCircleIcon/>} />
            </Tooltip>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton className={classes.action} aria-label="refresh" onClick={ async () => {
          await props.onRefresh();
        } } color="primary">
          <RefreshIcon/>
        </IconButton>
        <IconButton className={classes.action} aria-label="delete" onClick={props.onDelete} color="primary">
          <DeleteIcon/>
        </IconButton>
      </CardActions>

    </Card>
  );
};