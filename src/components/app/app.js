import React, { Component } from 'react'
import LegalFabric from 'build/contracts/LegalFabric.json'
import getWeb3 from 'src/utils/getWeb3'

import List from './../list'
import PlusButton from './../plus-button'
import Form from './../form';

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const {web3} = this.state;

    const contract = require('truffle-contract')
    const legalFabricContract = contract(LegalFabric)

    legalFabricContract.setProvider(this.state.web3.currentProvider)
        
    const legalFabric = await legalFabricContract.deployed() 
    const now = web3.eth.getBlock(web3.eth.blockNumber).timestamp;
    
    const [account] = await new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, accounts) => {
          if (err) {
            return reject(err)
          }
          resolve(accounts);
      });
    })
    
    const newContract = await legalFabric.create(now + 100, 0, 0, ['0x0', '0x0', '0x0'], '0x0', {from: account});

    console.log(newContract);
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">StartUp</a>
        </nav>

        <main className="container">
          <PlusButton />
          <Form />
          <List items={[{_id: 1, name: 'Contract_A'}, {_id: 2, name: 'Contract_B'}]}/>
        </main>
      </div>
    );
  }
}

export default App
