const LegalFabric = artifacts.require("./LegalFabric.sol");
const LegalInstantiator = artifacts.require("./LegalInstantiator.sol");

module.exports = function(deployer, network, accounts) {
  let fee, beneficiary

  if(network === 'live'){
    fee = web3.toWei(0.1, 'ether')
    beneficiary = '0xdd21D75DB9ed2fe97775ffA46E8FA1C8072Cd15d'
  }
  else{
    fee = 0
    beneficiary = accounts[0]
  }

  return deployer.deploy(LegalInstantiator)
    .then(() => LegalInstantiator.deployed())
    .then((instantiator) => 
      deployer.deploy(LegalFabric, fee, beneficiary, instantiator.address)
      .then(() => instantiator.setBuilder(LegalFabric.address))
    )
};
