import React, {createContext, useReducer} from 'react';

export const GlobalContext = createContext();

const initModalState = {
  modal : false,
  type : '',
  status : '',
  message : ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'MODAL_ERROR':
      return {modal : true, type : 'danger', status: action.status, message :action.message};
    case 'MODAL_TUTUP':
      return {modal : false, type : '', status: '', message: ''};
    default:
      return '';
  }
};

export const GlobalProvider = ({children}) => {

  const [modal, dispatch] = useReducer(reducer, initModalState);
  const GlobalVariable = {modal, dispatch};

  return (
    <GlobalContext.Provider value={GlobalVariable}>
      {children}
    </GlobalContext.Provider>
  )
};
