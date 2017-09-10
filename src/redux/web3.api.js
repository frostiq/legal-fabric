import getWeb3 from 'src/utils/getWeb3'
const contract = require('truffle-contract')

import LegalFabric from 'build/contracts/LegalFabric.json'
import LegalAgreement from 'build/contracts/LegalAgreement.json'

let web3 = null
let legalFabric = null
let legalAgreementContract = null
let contracts = []

const promiseInvoke = 
(func, ...params) => new Promise(
  (resolve, reject) =>  func(...params, 
    (err, result) => err ? reject(err) : resolve(result)
  )
)

export const init = () => 
    getWeb3.then(async (results) => {
    web3 = results.web3   

    const legalFabricContract = contract(LegalFabric)
    legalFabricContract.setProvider(web3.currentProvider)

    legalFabric = await legalFabricContract.deployed()

    legalAgreementContract = contract(LegalAgreement)
    legalAgreementContract.setProvider(web3.currentProvider)

    const contractsWatcher = (cb) =>
      legalFabric
      .Builded({}, {fromBlock: 1})
      .watch((err, res) => {
          if (err) {
            console.log(err)
          }
        
        legalAgreementContract.at(res.args.instance)
        .then((agreement) => Promise.all([
          agreement.deadline(),
          agreement.reward(),
          agreement.deposit(),
          agreement.implementer(),
          agreement.customer(),
          Promise.all([
            agreement.oracles(0),
            agreement.oracles(1),
            agreement.oracles(2),
          ]),
          agreement.getState.call()
        ]))
        .then(([deadline, reward, deposit, implementer, customer, oracles, state]) => {
          contracts = contracts.concat({
            _id: res.args.instance,
            name: res.args.instance,
            address: res.args.instance,
            deadline: +('' + deadline),
            reward: '' + web3.fromWei(reward),
            deposit: '' + web3.fromWei(deposit),
            implementer,
            customer,
            oracles,
            state,
          })

          cb(contracts)
        })
      }) 

    const [account] = await promiseInvoke(web3.eth.getAccounts)

    return {
      account,
      contractsWatcher
    }
})

export const getAccounts = async () => {
   return promiseInvoke(web3.eth.getAccounts)
}


export const createAgreement = async (params) => {
    const {
        oracles,
        deadline,  
        reward, 
        deposit 
    } = params

    const [account] = await promiseInvoke(web3.eth.getAccounts)
    
    const newContract = await legalFabric.create(
      deadline, 
      web3.toWei(reward, 'ether'), 
      web3.toWei(deposit, 'ether'), 
      oracles, 
      '0x0', 
      {from: account, gas: 4000000}
    );

      const agreementAddress = newContract.logs[0].args.instance;
      console.log('Contract address: ' + agreementAddress);
      console.log(legalAgreementContract)
      const agreement = await legalAgreementContract.at(agreementAddress)
      const state = await agreement.getState.call()

      console.log('Agreement state: ' + state)
}

export const approveAgreement = async ({item}) => {
  const agreement = await legalAgreementContract.at(item.address)
  await agreement.approve('Great job!');

  const state = await agreement.getState.call()
  console.log('Agreement state: ' + state)
}

export const setAgreementImplementer = async ({item}) => {
  const agreement = await legalAgreementContract.at(item.address)
  const [account] = await promiseInvoke(web3.eth.getAccounts)
  await agreement.setImplementer({from: account, gas: 4000000, value: web3.toWei(item.deposit) });

  console.log('setAgreementImplementer completed')
  const state = await agreement.getState.call()
  console.log('Agreement state: ' + state)
}

export const setAgreementCustomer = async ({item}) => {
  console.log(item.address)
  const agreement = await legalAgreementContract.at(item.address)
  const [account] = await promiseInvoke(web3.eth.getAccounts)
  await agreement.setCustomer({from: account, gas: 4000000, value: web3.toWei(item.reward) })

  console.log('setCustomer completed')
}

export const cancelAgreement = async ({item}) => {
  const agreement = await legalAgreementContract.at(item.address)
  const [account] = await promiseInvoke(web3.eth.getAccounts)
  await agreement.cancel({from: account, gas: 4000000 })
}

export const finalizeAgreement = async ({item}) => {
  const agreement = await legalAgreementContract.at(item.address)
  const [account] = await promiseInvoke(web3.eth.getAccounts)
  await agreement.finalize({from: account, gas: 4000000 })

  console.log('finalizeAgreement completed')
}