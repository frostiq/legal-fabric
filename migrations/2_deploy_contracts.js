const LegalFabric = artifacts.require("./LegalFabric.sol");
const LegalInstantiator = artifacts.require("./LegalInstantiator.sol");

module.exports = function(deployer) {
  return deployer.deploy(LegalInstantiator)
    .then(() => LegalInstantiator.deployed())
    .then((instantiator) => 
      deployer.deploy(LegalFabric, 0, '0x0', instantiator.address)
      .then(() => instantiator.setBuilder(LegalFabric.address))
    )
};
