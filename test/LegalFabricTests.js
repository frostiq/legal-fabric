const LegalFabric = artifacts.require("./LegalFabric.sol")

contract('LegalFabric', function(accounts) {
  it("should create new contracts", async function() {
    const legalFabric = await LegalFabric.deployed();
    const now = web3.eth.getBlock(web3.eth.blockNumber).timestamp;
    const newContract = await legalFabric.create(now + 100, 0, 0, ['0x0'], 0x0);
    const instance = newContract.logs[0].args.instance;
    
    assert(typeof instance !== 'undefined' && instance !== '0x0');
  });
});
