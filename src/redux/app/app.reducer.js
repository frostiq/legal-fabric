const initialState = { showForm: false, contracts: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'toggleForm': {
      return {
        ...state,
        showForm: !state.showForm,
      }
    }

    case 'getAccounts': {
      return {
        ...state,
        accounts: action.payload,
      }
    }

    case 'initWeb3': {
      return {
        ...state,
        accounts: action.payload,
      }
    }

    case 'contractsUpdated': {
      return {
        ...state,
        contracts: action.payload,
      }
    } 

    default:
      return state;
  }
};
