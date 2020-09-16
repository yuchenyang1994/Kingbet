import React, { useReducer } from 'react';

const initState = {
    unLock: false,
    privateKey: "",
    address: "",
    balance: 0,
    gasPrice: 146
}; // 默认 todolist 是空数组

const Context = React.createContext();

const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Unlock':
        return {
            unLock: true,
            privateKey: payload.privateKey,
            address: payload.address,
            balance: 0,
            gasPrice: state.gasPrice
        };
    case "Balance":
        return {
            unLock: state.unLock,
            privateKey: state.privateKey,
            address: state.address,
            balance: payload.balance,
            gasPrice: state.gasPrice
        };
    case "gasPrice":
        return {
            unLock: state.unLock,
            privateKey: state.privateKey,
            address: state.address,
            balance: state.balance,
            gasPrice: payload.gasPrice
        }
    default:
      return state;
  }
};

export default { Context, Provider, reducer }