import React, { useReducer } from 'react';

const Context = React.createContext();

//  const { state: lists, dispatch: listsDispatch } = React.useContext(StoreLists.Context);
//   const { newList, setNewList } = React.useState('');

//   handleDelete = item => () => {
//     listsDispatch({
//       type: 'DELETE',
//       payload: item
//     });

export const initState = []; // 默认 todolist 是空数组

// 数据处理器
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD':
      return [...state, payload.data];
    case 'MODIFY':
      return state.map(
        item => (item.id === payload.id ? payload.data : item));
    case 'DELETE':
      return state.map(
        item => (item.id === payload.id ? null : item)
      ).filter(n => n);
    default:
      return state;
  }
};


const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default { Context, Provider };