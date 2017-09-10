import * as web3Api from './../web3.api'

export const initWeb3 = () => (dispatch) => {
    web3Api.init().then(({account, contractsWatcher}) => {
        dispatch({type: 'initWeb3', payload: account})

        contractsWatcher((contracts) => {
            dispatch({type: 'contractsUpdated', payload: contracts})
        })
    } ) 
}
    

export const createAgreement = (params) => (dispatch) => 
 web3Api.createAgreement(params).then(() => dispatch({type: 'agreementCreated'}))

export const getAccounts = () => (dispatch) => 
 web3Api.getAccounts().then((payload) => dispatch({type: 'getAccounts', payload}))  

export const toggleForm = () => ({type: 'toggleForm'})

