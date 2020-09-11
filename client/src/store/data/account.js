import React, { useReducer } from 'react';

const initState = {
    unLock: false,
    privateKey: "",
    address: "",
    balance: 0
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
            balance: 0
        };
    case "Balance":
        return {
            unLock: state.unLock,
            privateKey: state.privateKey,
            address: state.address,
            balance: payload.balance
        };
    default:
      return state;
  }
};

export default { Context, Provider, reducer }