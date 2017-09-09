const initialState = { showForm: false };
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

    default:
      return state;
  }
};
