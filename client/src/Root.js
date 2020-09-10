import React from 'react';
import Box from '@material-ui/core/Box';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from "./route";

export default function Root() {
  return (
    <Box maxWidth="sm">
      <BrowserRouter>
        <Switch>{renderRoutes(routes)}</Switch>
        
      </BrowserRouter>
    </Box>
  );
}

