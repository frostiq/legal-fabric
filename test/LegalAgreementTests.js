const BigNumber = require('big-number')
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const utils = require("./utils.js")

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
  const UNKNOWN = accounts[6]

  const State = { Prepairing : 0, Implementing : 1, Fulfilled : 2, Failed : 3, Canceled : 4 }

  let legalAgreement
  let deadline

  let redeploy = async function() {
    deadline = utils.now() + 100000
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
    assert(state.equals(State.Prepairing), "state check")

    await legalAgreement.setCustomer({from : CUSTOMER, value : REWARD})
    const res = await legalAgreement.customer()
    assert.equal(res, CUSTOMER)
  })

  it("should set implementer correctly", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing), "state check")

    await legalAgreement.setImplementer({from : IMPLEMENTER, value : DEPOSIT})
    const res = await legalAgreement.implementer()
    assert.equal(res, IMPLEMENTER)
  })

  it("should not allow set implementer second time", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing), "state check")

    const promise = legalAgreement.setImplementer({from : IMPLEMENTER, value : DEPOSIT})
    return promise.should.be.rejected;
  })

  it("should not allow set customer second time", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing), "state check")

    const promise = legalAgreement.setCustomer({from : CUSTOMER, value : REWARD})
    return promise.should.be.rejected;
  })

  it("should allow cancel deposot for implementer", async function() {
    await redeploy()
    await legalAgreement.setImplementer({from : IMPLEMENTER, value : DEPOSIT})

    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing), "state check")

    const balanceBefore = await web3.eth.getBalance(legalAgreement.address)
    await legalAgreement.cancel({from : IMPLEMENTER})
    const balanceAfter = await web3.eth.getBalance(legalAgreement.address)
    assert(balanceBefore.minus(balanceAfter).equals(DEPOSIT))
  })

  it("should not allow cancel deposot for implementer second time", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing), "state check")

    return legalAgreement.cancel({from : IMPLEMENTER}).should.be.rejected
  })

  it("should allow cancel reward for customer", async function() {
    await redeploy()
    await legalAgreement.setCustomer({from : CUSTOMER, value : REWARD})

    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing), "state check")

    const balanceBefore = await web3.eth.getBalance(legalAgreement.address)
    await legalAgreement.cancel({from : CUSTOMER})
    const balanceAfter = await web3.eth.getBalance(legalAgreement.address)
    assert(balanceBefore.minus(balanceAfter).equals(REWARD))
  })

  it("should not allow cancel reward for customer second time", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Prepairing), "state check")

    return legalAgreement.cancel({from : CUSTOMER}).should.be.rejected
  })

  it("should not allow to approve agreement to non-oracles", async function() {
    await redeploy()
    await legalAgreement.setCustomer({from : CUSTOMER, value : REWARD})
    await legalAgreement.setImplementer({from : IMPLEMENTER, value : DEPOSIT})

    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing), "state check")
    
    return legalAgreement.approve("justification", {from : UNKNOWN}).should.be.rejected
  })

  it("should allow to approve agreement to oracles", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing), "state check")

    await legalAgreement.approve("justification1", {from : ORACLES[0]})
    await legalAgreement.approve("justification2", {from : ORACLES[1]})

    const res = await legalAgreement.isApproved()

    assert.isTrue(res, "legalAgreement.isApproved")
  })

  it("should allow positively finalize agreement after deadline, if approved", async function() {
    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing), "state check")

    await utils.increaseTime(deadline - utils.now() + 10)
    
    const balanceBefore = await web3.eth.getBalance(IMPLEMENTER)
    await legalAgreement.finalize()
    const balanceAfter = await web3.eth.getBalance(IMPLEMENTER)

    assert(balanceAfter.minus(balanceBefore).equals(REWARD + DEPOSIT))
  })

  it("should allow negatively finalize agreement after deadline, if not approved", async function() {
    await redeploy()
    await legalAgreement.setCustomer({from : CUSTOMER, value : REWARD})
    await legalAgreement.setImplementer({from : IMPLEMENTER, value : DEPOSIT})

    const state = await legalAgreement.getState()
    assert(state.equals(State.Implementing), "state check")
    
    await legalAgreement.approve("justification2", {from : ORACLES[1]})

    const res = await legalAgreement.isApproved()
    assert.isFalse(res, "legalAgreement.isApproved")

    await utils.increaseTime(deadline - utils.now() + 10)
    
    const balanceBefore = await web3.eth.getBalance(CUSTOMER)
    await legalAgreement.finalize()
    const balanceAfter = await web3.eth.getBalance(CUSTOMER)

    assert(balanceAfter.minus(balanceBefore).equals(REWARD + DEPOSIT))

  })
  

  // x reward & deposit
  // x set customer & implementer 2nd time
  // x cancel deposit & reward
  // x cancel deposit & reward 2nd time
  // x approve not by oracle
  // x finalize failed
  // x finalize fulfilled
})