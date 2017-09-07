const initialState = { showForm: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'toggleForm': {
      return {
        ...state,
        showForm: !state.showForm,
      }
    }
    default:
      return state;
  }
};
