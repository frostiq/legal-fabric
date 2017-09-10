const utils = require("./utils.js")

const LegalFabric = artifacts.require("./LegalFabric.sol");
const LegalInstantiator = artifacts.require("./LegalInstantiator.sol");

contract('LegalFabric', function(accounts) {
  
  it("should create new contracts", async function() {
    const legalFabric = await LegalFabric.deployed();
    
    const deadline = utils.now() + 1000000
    const reward = 0
    const deposit = 0
    const oracles = ['0x0', '0x0', '0x0']
    const title = 'title'
    const description = 'description'
    const clientAddress = '0x0'

    const newContract = await legalFabric.create(
      deadline, 
      reward, 
      deposit, 
      oracles, 
      title, 
      description,
      clientAddress);
    
    const instance = newContract.logs[0].args.instance;
    console.log('instance: ' + instance)
    assert(typeof instance !== 'undefined' && instance !== '0x0000000000000000000000000000000000000000');
  });

});
