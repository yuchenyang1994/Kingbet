import React, { useReducer } from 'react';

const initState = {
    open: false,
    type: "success"
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
    case 'Show':
        return {
           open: true,
           type: payload.type,
           message: payload.message
        }
    case "Close":
        return {
            open: false,
            type: state.type,
            message: ""
        }
    default:
      return state;
  }
};

export default { Context, Provider, reducer };
