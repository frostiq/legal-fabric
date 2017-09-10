const initialState = { 
  showForm: false, 
  contracts: [], 
  oracles: [
    {
      address: '0x870c79ef01233d5e2449a6ea7e764babae0ac7ed',
      name: 'Alex'
    },
    {
      address: '0x06720a5aadcdf7abfdbffaa016d82d839fe6ee96',
      name: 'Anton'
    },
    {
      address: '0x0f070d123125bceb6ac31372c053b183d12f849e',
      name: 'Artem'
    },
    {
      address: '0x21cc3e16a1d481aa02033eb9cd36c6792ae4b66d',
      name: 'Arthur'
    },
    {
      address: '0xf981bf5785f7769c45025931e2669576822534cf',
      name: 'Aphrodite'
    },
    {
      address: '0x2dd076045c69a3fb486f6013fb9daeb238e62b6d',
      name: 'Abdula'
    },
  ] 
};
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
        account: action.payload,
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
