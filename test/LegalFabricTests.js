const utils = require("./utils.js")

const LegalFabric = artifacts.require("./LegalFabric.sol");
const LegalInstantiator = artifacts.require("./LegalInstantiator.sol");

contract('LegalFabric', function(accounts) {
  
  it("should create new contracts", async function() {
    const legalFabric = await LegalFabric.deployed();
    const deadline = utils.now() + 1000000
    console.log('deadline: ' + new Date(deadline))
    const newContract = await legalFabric.create(deadline, 0, 0, ['0x0', '0x0', '0x0'], '0x0', '', '');
    
    const instance = newContract.logs[0].args.instance;
    console.log('instance: ' + instance)
    assert(typeof instance !== 'undefined' && instance !== '0x0000000000000000000000000000000000000000');
  });

});
