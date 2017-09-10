const BigNumber = require('big-number')
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")

const LegalAgreement = artifacts.require("./LegalAgreement.sol")

chai.use(chaiAsPromised);
chai.should();
const assert = chai.assert;

contract('LegalAgreement', function(accounts) {

  const CUSTOMER = accounts[1]
  const IMPLEMENTER = accounts[2]
  const REWARD = 100
  const DEPOSIT = 50
  const ORACLES = [accounts[3], accounts[4], accounts[5]]

  const State = { Prepairing : 0, Implementing : 1, Fulfilled : 2, Failed : 3, Canceled : 4 }

  let legalAgreement
  let deadline

  let redeploy = async function() {
    const now = web3.eth.getBlock(web3.eth.blockNumber).timestamp;
    deadline = now + 100000
    legalAgreement = await LegalAgreement.new(deadline, REWARD, DEPOSIT, ORACLES)
  }

  before(function(){
    return redeploy()
  })

  it("should set deadline correctly", async function() {
    const res = await legalAgreement.deadline()
    assert(res.equals(deadline))
  })

  it("should set customer correctly", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing))

    await legalAgreement.setCustomer({from : CUSTOMER, value : REWARD})
    const res = await legalAgreement.customer()
    assert.equal(res, CUSTOMER)
  })

  it("should set implementer correctly", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing))

    await legalAgreement.setImplementer({from : IMPLEMENTER, value : DEPOSIT})
    const res = await legalAgreement.implementer()
    assert.equal(res, IMPLEMENTER)
  })

  it("should not allow set implementer second time", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing))

    const promise = legalAgreement.setImplementer({from : IMPLEMENTER, value : DEPOSIT})
    return promise.should.be.rejected;
  })

  it("should not allow set customer second time", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing))

    const promise = legalAgreement.setCustomer({from : CUSTOMER, value : REWARD})
    return promise.should.be.rejected;
  })

  it("should allow cancel reward", async function() {
    await redeploy()

    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing))

    const balanceBefore = await web3.eth.getBalance(CUSTOMER)
    await legalAgreement.cancel({from : CUSTOMER})
    const balanceAfter = await web3.eth.getBalance(CUSTOMER)
    console.log(balanceBefore)
    console.log(balanceAfter)
    assert(balanceAfter.minus(balanceBefore).equals(REWARD))
  })

  

  // reward & deposit
  // set customer & implementer 2nd time
  // cancel deposit & reward
  // cancel deposit & reward 2nd time
  // approve not by oracle
  // finalize failed
  // finalize fulfilled
})