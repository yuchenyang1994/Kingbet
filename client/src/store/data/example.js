import React, { useReducer } from 'react';

import reducer, { initState } from './reducer';

//  const { state: lists, dispatch: listsDispatch } = React.useContext(StoreLists.Context);
//  handleDelete = item => () => {
//    listsDispatch({
//      type: 'DELETE',
//      payload: item
//    });
//  };

const initState = []; // 默认 todolist 是空数组

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
    case 'ADD':
      return [...state, payload.data];
    case 'MODIFY':
      return state.map(
        item => (item.id === payload.id ? payload.data : item)
        )
    case 'DELETE':
      return state.map(
        item => (item.id === payload.id ? null : item)
      ).filter(n => n);
    default:
      return state;
  }
};

export default { Context, Provider, reducer };