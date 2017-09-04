var LegalFabric = artifacts.require("./LegalFabric.sol");

module.exports = async function(deployer) {
  await deployer.deploy(LegalFabric, 0, '0x0');
};
