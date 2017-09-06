const LegalFabric = artifacts.require("./LegalFabric.sol");
const LegalInstantiator = artifacts.require("./LegalInstantiator.sol");

module.exports = async function(deployer) {
  await deployer.deploy(LegalInstantiator).await
  const instantiator = await LegalInstantiator.deployed()
  await deployer.deploy(LegalFabric, 0, '0x0', instantiator.address).await;
  //await instantiator.setBuilder(LegalFabric.address);
};
