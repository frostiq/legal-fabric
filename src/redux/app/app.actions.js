import * as web3Api from './../web3.api'

export const initWeb3 = () => (dispatch) => {
    web3Api.init().then(({account, contractsWatcher}) => {
        dispatch({type: 'initWeb3', payload: account})

        contractsWatcher((contracts) => {
            dispatch({type: 'contractsUpdated', payload: contracts})
        })
    } ) 
}    

export const setAgreementImplementer = (params) => (dispatch) => {
    web3Api.setAgreementImplementer(params).then(() => {
        dispatch({ type: 'setAgreementImplementer' })
    })
}

export const setAgreementCustomer = (params) => (dispatch) => {
    web3Api.setAgreementCustomer(params).then(() => {
        dispatch({ type: 'setAgreementCustomer' })
    })
}

export const cancelAgreement = (params) => (dispatch) => {
    web3Api.cancelAgreement(params).then(() => {
        dispatch({ type: 'cancelAgreement' })
    })
}

export const finalizeAgreement = (params) => (dispatch) => {
    web3Api.finalizeAgreement(params).then(() => {
        dispatch({ type: 'finalizeAgreement' })
    })
}

export const approveAgreement = (params) => (dispatch) => {
    web3Api.approveAgreement(params).then(() => {
        dispatch({ type: 'agreementApproved' })
    })
}

export const createAgreement = (params) => (dispatch) => 
 web3Api.createAgreement(params).then(() => dispatch({type: 'agreementCreated'}))

export const getAccounts = () => (dispatch) => 
 web3Api.getAccounts().then((payload) => dispatch({type: 'getAccounts', payload}))  

export const toggleForm = () => ({type: 'toggleForm'})

