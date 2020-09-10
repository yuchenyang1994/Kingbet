import "./theme/App.less";
import React from 'react';
import WalletPage from './page/WalletPage';
import Home from './page/Home';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import { Joystick as IconJoystick, Wallet as IconWallet } from 'react-bootstrap-icons';


function App() {
  return (
    <div className="App">
      <div className="Content">
        <BrowserRouter>
          <Switch>
            <Route exact  path="/" component={Home}/>
            <Route path="/wallet" component={WalletPage} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
      <TabBar>
        <TabBar.Item
          title="竞猜"
          key="Bet"
          icon={<IconJoystick/>}
        >
        </TabBar.Item>
        <TabBar.Item
          title="账户"
          key="Wallet"
          icon={<IconWallet/>}
        >
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

export default App;
