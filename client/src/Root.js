import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from "./route";
import Provider from './store/provider';
import getWeb3 from "./components/getWeb3";
import axios from "axios"

export default function Root() {
  useEffect(() => {
    const initWeb3 = async () => {
      React.$web3 = await getWeb3();
    }
    initWeb3();
    React.$axios = axios;
  });
  return (
    <Provider>
      <Box maxWidth="sm">
        <BrowserRouter>
          <Switch>{renderRoutes(routes)}</Switch>
        </BrowserRouter>
      </Box>
    </Provider>
  );
}

